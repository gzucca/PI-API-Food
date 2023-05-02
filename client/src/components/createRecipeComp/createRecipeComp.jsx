import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDiets,
  createRecipe,
  getAllRecipes,
} from "../../redux/actions/actions.js";
import { Link, useHistory } from "react-router-dom";
import "./createRecipeComp.css";
import createRecipebg from "../../createRecipebg.webp";
import createRecipePreview from "../../createRecipePreview.webp";

function validate(newRecipe) {
  let errors = {};

  if (!newRecipe.name) {
    errors.name = "Name is required";
  } else if (!newRecipe.diets.length) {
    errors.diets = "A diet is required";
  } else if (!newRecipe.summary) {
    errors.summary = "Summary is required";
  } else if (!newRecipe.steps.length) {
    errors.steps = "A step is required";
  }

  if (
    newRecipe.image.length > 0 &&
    /(https?:\/\/.*\.(?:png|jpg))/i.test(newRecipe.image) === false
  ) {
    errors.image = "The URL is not valid";
  }

  if (
    (newRecipe.healthScore.length > 0 &&
      (newRecipe.healthScore < 1 || newRecipe.healthScore > 100)) ||
    Number.isNaN(Number(newRecipe.healthScore))
  ) {
    errors.healthScore = "Please enter a number between 1-100";
  }

  return errors;
}

export default function CreateRecipeComp() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  let history = useHistory();

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    dishTypes: [],
    steps: [],
    diets: [],
  });

  const [newStep, setNewStep] = useState({
    step: "",
    stepNumber: 1,
  });

  const [dishTypes] = useState({
    names: [
      "side dish",
      "lunch",
      "main course",
      "main dish",
      "dinner",
      "morning meal",
      "brunch",
      "breakfast",
      "soup",
      "salad",
      "condiment",
      "dip",
      "sauce",
      "spread",
    ],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllDiets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddDiet = function (e) {
    e.preventDefault();
    let newDiets = newRecipe.diets;
    if (newDiets.includes(e.target.previousSibling.value) === false) {
      newDiets.push(e.target.previousSibling.value);
      setNewRecipe({
        ...newRecipe,
        diets: [...newDiets],
      });
    }
    setErrors(
      validate({
        ...newRecipe,
        diets: [...newDiets],
      })
    );
  };

  const handleAddDish = function (e) {
    e.preventDefault();
    let newDishes = newRecipe.dishTypes;
    if (newDishes.includes(e.target.previousSibling.value) === false) {
      newDishes.push(e.target.previousSibling.value);
      setNewRecipe({
        ...newRecipe,
        dishTypes: [...newDishes],
      });
    }
  };

  const handleChange = function (e) {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...newRecipe,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeStep = function (e) {
    setNewStep({
      ...newStep,
      step: e.target.value,
    });
  };

  const handleAddStep = function (e) {
    e.preventDefault();
    if (newStep.step.length > 0) {
      let newSteps = newRecipe.steps;
      let addStep = `${newStep.stepNumber}: ${newStep.step}`;
      newSteps.push(addStep);
      setNewRecipe({
        ...newRecipe,
        steps: [...newSteps],
      });
      setNewStep({
        step: "",
        stepNumber: newStep.stepNumber + 1,
      });
      setErrors(
        validate({
          ...newRecipe,
          steps: [...newSteps],
        })
      );
    }
  };

  const handleDeleteDiet = function (e) {
    e.preventDefault();
    let dietDelete = String(e.target.previousSibling.innerHTML);
    let oldDiets = newRecipe.diets;
    let newDiets = oldDiets.filter((el) => el !== dietDelete);
    setNewRecipe({
      ...newRecipe,
      diets: newDiets,
    });
    setErrors(
      validate({
        ...newRecipe,
        diets: newDiets,
      })
    );
  };

  const handleDeleteDish = function (e) {
    e.preventDefault();
    let dishDelete = String(e.target.previousSibling.innerHTML);
    let oldDishes = newRecipe.dishTypes;
    let newDishes = oldDishes.filter((el) => el !== dishDelete);
    setNewRecipe({
      ...newRecipe,
      dishTypes: newDishes,
    });
  };

  const handleDeleteSteps = function (e) {
    e.preventDefault();
    setNewRecipe({
      ...newRecipe,
      steps: [],
    });
    setNewStep({
      step: "",
      stepNumber: 1,
    });
    setErrors(
      validate({
        ...newRecipe,
        steps: [],
      })
    );
  };

  const handleSubmitRecipe = async function (e) {
    e.preventDefault();
    if (
      newRecipe.name &&
      newRecipe.summary &&
      newRecipe.diets &&
      newRecipe.steps
    ) {
      await dispatch(createRecipe(newRecipe));
      setNewRecipe({
        name: "",
        summary: "",
        healthScore: "",
        image: "",
        dishTypes: [],
        steps: [],
        diets: [],
      });
      alert("Recipe created!");
      dispatch(getAllRecipes());
      history.push("/home");
    } else {
      alert("Please fill out all required fields");
    }
  };

  return (
    <div className="createRecipe-wrap">
      <img className="createRecipebg" alt="" src={createRecipebg} />

      <div className="createRecipe">
        <Link to="/home">
          <button className="createRecipeBackButton">Back</button>
        </Link>

        <h1 className="title">Create Recipe</h1>

        {!newRecipe.steps.length ? (
          <button type="submit" className="submitButton" disabled>
            SUBMIT
          </button>
        ) : (
          <button
            type="submit"
            className="submitButton"
            disabled={Object.keys(errors).length}
            onClick={(e) => handleSubmitRecipe(e)}
          >
            SUBMIT
          </button>
        )}

        <div className="container">
          <form className="parent">
            <div className="name">
              <label>Name*: </label>
            </div>
            <div className="nameInput">
              <input
                type="text"
                value={newRecipe.name}
                name="name"
                maxLength="60"
                required
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="image">
              <label>Image: </label>
            </div>
            <div className="imageInput">
              <input
                type="url"
                value={newRecipe.image}
                placeholder="URL"
                name="image"
                onChange={handleChange}
              />
              {errors.image && <p className="error">{errors.image}</p>}
            </div>

            <div className="healthScore">
              <label>HealthScore: </label>
            </div>
            <div className="healthScoreInput">
              <input
                type="text"
                value={newRecipe.healthScore}
                name="healthScore"
                placeholder="1-100"
                onChange={handleChange}
              />
              {errors.healthScore && (
                <p className="error">{errors.healthScore}</p>
              )}
            </div>

            <div className="diets">
              <label>Diets*: </label>
            </div>
            <div className="dietsInput">
              <select>
                {diets.length &&
                  diets.map((diet) => (
                    <option key={diet.id} value={diet.name}>
                      {diet.name}
                    </option>
                  ))}
              </select>
              <button type="submit" onClick={(e) => handleAddDiet(e)}>
                ADD
              </button>
              {errors.diets && <p className="error">{errors.diets}</p>}
            </div>

            <div className="dishTypes">
              <label>Dish types: </label>
            </div>
            <div className="dishTypesInput">
              <select>
                {dishTypes.names.map((dishType) => (
                  <option
                    key={
                      dishType.charAt(1) +
                      dishType.charAt(3) +
                      dishType.charAt(5)
                    }
                    value={dishType}
                  >
                    {dishType}
                  </option>
                ))}
              </select>
              <button type="submit" onClick={(e) => handleAddDish(e)}>
                ADD
              </button>
            </div>

            <div className="summary">
              <label>Summary*: </label>
            </div>
            <div className="summaryInput">
              <textarea
                name="summary"
                value={newRecipe.summary}
                maxLength="255"
                required
                onChange={handleChange}
              />
              {errors.summary && <p className="error">{errors.summary}</p>}
            </div>

            <div className="steps">
              <label>Steps*: </label>
            </div>
            <div className="stepsInput">
              <textarea
                type="text"
                value={newStep.step}
                name="step"
                maxLength="255"
                required
                onChange={handleChangeStep}
              />
              <button type="submit" onClick={(e) => handleAddStep(e)}>
                ADD STEP
              </button>
              <button type="submit" onClick={(e) => handleDeleteSteps(e)}>
                DELETE STEPS
              </button>
              {errors.steps && <p className="error">{errors.steps}</p>}
            </div>

            <div className="divider"></div>

            <div className="previewName">
              <h1>{newRecipe.name ? newRecipe.name : "Título"}</h1>
            </div>

            <div className="previewImage">
              <img
                alt="preview"
                src={
                  newRecipe.image
                    ? /(https?:\/\/.*\.(?:png|jpg))/i.test(newRecipe.image) ===
                      true
                      ? newRecipe.image
                      : createRecipePreview
                    : createRecipePreview
                }
              ></img>
            </div>

            <div className="previewDiets">
              <h3> Diets added: </h3>
              <div className="previewDietsList">
                {newRecipe.diets.map((diet) => (
                  <div key={diet.charAt(0) + diet.charAt(3) + diet.charAt(2)}>
                    <p value={diet} key={diet}>
                      {diet}
                    </p>
                    <button type="submit" onClick={(e) => handleDeleteDiet(e)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="previewDish">
              <h3> Dish types added: </h3>
              <div className="previewDishTypesList">
                {newRecipe.dishTypes.map((dishType) => (
                  <div
                    key={
                      dishType.charAt(0) +
                      dishType.charAt(3) +
                      dishType.charAt(2)
                    }
                  >
                    <p value={dishType} key={dishType}>
                      {dishType}
                    </p>
                    <button type="submit" onClick={(e) => handleDeleteDish(e)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="previewSummary">
              <h3>Summary</h3>
              <p>{newRecipe.summary}</p>
            </div>

            <div className="previewSteps">
              <h3> Instructions: </h3>
              {newRecipe.steps.map((step) => (
                <p required key={step}>
                  {step}
                </p>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
