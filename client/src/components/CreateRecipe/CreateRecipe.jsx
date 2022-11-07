import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllDiets, createRecipe } from "../../redux/actions/actions";
import { Link, useHistory } from 'react-router-dom';
import './createRecipe.css';
import createRecipebg from '../../createRecipebg.png'


function validate(newRecipe) {
    let errors = {}

    if (!newRecipe.name) {
        errors.name = "Name is required"
    } 
    else if (!newRecipe.summary) {
        errors.summary = "Summary is required"
    } 
    else if (!newRecipe.diets.length) {
        errors.diets = "A diet is required"
    } 
    else if (!newRecipe.steps.length) {
        errors.steps = "A step is required"
    } 

    if (newRecipe.image.length > 0 && (/(https?:\/\/.*\.(?:png|jpg))/i.test(newRecipe.image) === false)) {
        errors.image = "The URL is not valid"
    } 

    if (((newRecipe.healthScore.length > 0) && (newRecipe.healthScore < 1 || newRecipe.healthScore > 100)) || Number.isNaN(Number(newRecipe.healthScore)) ) {
        errors.healthScore = "Please enter a number between 1-100"
    } 

    return errors
};

const CreateRecipe = () => {

    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    let history = useHistory()
    
    const [newRecipe, setNewRecipe] = useState ({
        name: '',
        summary: '',
        healthScore: '',
        image: '',
        dishTypes: [],
        steps: [],
        diets: [],
    })
    
    const [newStep, setNewStep] = useState ({
        step: '',
        stepNumber: 1,
    })

    const [dishTypes] = useState ({
        names: ['side dish', 'lunch', 'main course', 'main dish', 'dinner', 'morning meal', 'brunch', 'breakfast', 'soup', 'salad', 'condiment', 'dip', 'sauce', 'spread'],
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllDiets());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const handleAddDiet = function (e) {
        e.preventDefault();
        let newDiets = newRecipe.diets
        if (newDiets.includes(e.target.previousSibling.value) === false){
        newDiets.push(e.target.previousSibling.value)
        setNewRecipe({
            ...newRecipe,
            diets: [...newDiets],
        })}
        setErrors(validate({
            ...newRecipe,
            diets : [...newDiets]
        }))

    }

    const handleAddDish = function (e) {
        e.preventDefault();
        let newDishes = newRecipe.dishTypes
        if (newDishes.includes(e.target.previousSibling.value) === false){
            newDishes.push(e.target.previousSibling.value)
        setNewRecipe({
            ...newRecipe,
            dishTypes: [...newDishes],
        })}

    }
    

    
    const handleChange = function (e) {
        setNewRecipe({
            ...newRecipe,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...newRecipe,
            [e.target.name] : e.target.value
        }))
    }

    
    const handleChangeStep = function (e) {
        setNewStep({
            ...newStep,
            step : e.target.value
        })

    }
    
    const handleAddStep = function (e) {
        e.preventDefault();
        if (newStep.step.length > 0) {
        let newSteps = newRecipe.steps
        let addStep = `${newStep.stepNumber}: ${newStep.step}`
        newSteps.push(addStep)
        setNewRecipe({
            ...newRecipe,
            steps: [...newSteps],
        })
        setNewStep({
            step: '',
            stepNumber: (newStep.stepNumber + 1)
        })
        setErrors(validate({
            ...newRecipe,
            steps: [...newSteps],
        }))
        }
    }

    
    const handleDeleteDiet = function (e) { 
        e.preventDefault();
        let dietDelete = String(e.target.previousSibling.innerHTML);
        let oldDiets = newRecipe.diets;
        let newDiets = oldDiets.filter(el => el !== dietDelete);
        setNewRecipe({
            ...newRecipe,
            diets: newDiets,
        })
        setErrors(validate({
            ...newRecipe,
            diets: newDiets,
        }))
    }

    const handleDeleteDish = function (e) { 
        e.preventDefault();
        let dishDelete = String(e.target.previousSibling.innerHTML);
        let oldDishes = newRecipe.dishTypes;
        let newDishes = oldDishes.filter(el => el !== dishDelete);
        setNewRecipe({
            ...newRecipe,
            dishTypes: newDishes,
        })
    }
    
    const handleDeleteSteps = function (e) { 
        e.preventDefault();
        setNewRecipe({
            ...newRecipe,
            steps: [],
        })
        setNewStep({
            step: '',
            stepNumber: 1,
        })
        setErrors(validate({
            ...newRecipe,
            steps: [],
        }))
    }
    
    const handleSubmitRecipe = function (e) { 
        e.preventDefault();
        if(newRecipe.name && newRecipe.summary && newRecipe.diets && newRecipe.steps) {
            dispatch(createRecipe(newRecipe))
            setNewRecipe({
                name: '',
                summary: '',
                healthScore: '',
                image: '',
                dishTypes: [],
                steps: [],
                diets: [], 
            })
            alert('Recipe created!')
            history.push("/home")
        } else {
            alert('Please fill out all required fields')
        }


    }
    
    return (
        <div className='createRecipe-wrap'>
        <img className='createRecipebg' alt="" src={createRecipebg} />
            <div className='createRecipe'>

                <Link to='/home'><button>Back</button></Link>

                <h1>Create Recipe</h1>

                <form>
                    {!newRecipe.steps.length? <button type='submit'  disabled >SUBMIT</button> :
                    <button type='submit'  disabled={Object.keys(errors).length} onClick={(e) => handleSubmitRecipe(e)}>SUBMIT</button>}

                    <div>
                        <label>Name*: </label>
                        <input type="text" value={newRecipe.name} name='name' maxLength="255" required onChange={handleChange}/>
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>

                    <div>
                        <label>HealthScore: </label>
                        <input type="text" value={newRecipe.healthScore} name='healthScore' placeholder='1-100' onChange={handleChange}/>
                        {errors.healthScore && (<p>{errors.healthScore}</p>)}
                    </div>

                    <div>
                        <label>Summary*: </label>
                        <textarea name="summary" cols="50" rows="2" value={newRecipe.summary} maxLength="255" required onChange={handleChange} />
                        {errors.summary && (<p>{errors.summary}</p>)}
                    </div>

                    <div>
                        <label>Image: </label>
                        <input type="url" value={newRecipe.image} placeholder='URL' name="image" onChange={handleChange} />
                        {errors.image && (<p>{errors.image}</p>)}
                    </div>

                    <div>
                        <label>Dish types: </label>
                        <select >
                                {dishTypes.names.map(dishType =>
                                    <option key={dishType.charAt(1) + dishType.charAt(3) +  dishType.charAt(5)} value={dishType} >
                                        {dishType}
                                    </option>
                                )}
                        </select> 
                        <button type='submit' onClick={(e) => handleAddDish(e)}>ADD</button>
                    </div>

                    <div>
                        <ul> Dish types added:
                            { newRecipe.dishTypes.map(dishType => 
                                <div key={dishType.charAt(0) + dishType.charAt(3) + dishType.charAt(2)}  >
                                    <li value={dishType} key={dishType}>{dishType}</li>
                                    <button type='submit' onClick={(e) => handleDeleteDish(e)}>X</button>
                                </div>
                            ) }
                        </ul>
                    </div>

                    <div>
                        <label>Diets*: </label>
                        <select >
                                { diets.length && diets.map(diet =>
                                    <option key={diet.id} value={diet.name} >
                                        {diet.name}
                                    </option>
                                )}
                        </select> 
                        <button type='submit' onClick={(e) => handleAddDiet(e)}>ADD</button>
                        {errors.diets && (<p>{errors.diets}</p>)}
                    </div>

                    <div>
                        <ul> Diets added:
                            { newRecipe.diets.map(diet => 
                                <div key={diet.charAt(0) + diet.charAt(3) + diet.charAt(2)}  >
                                    <li value={diet} key={diet}>{diet}</li>
                                    <button type='submit' onClick={(e) => handleDeleteDiet(e)}>X</button>
                                </div>
                            ) }
                        </ul>
                    </div>

                    <div>
                        <label>Steps*: </label>
                        <textarea cols="50" rows="2" type="text" value={newStep.step} name='step' maxLength="255" required onChange={handleChangeStep}/>
                        <button type='submit' onClick={(e) => handleAddStep(e)}>ADD STEP</button>
                        <button type='submit' onClick={(e) => handleDeleteSteps(e)}>DELETE STEPS</button>
                        {errors.steps && (<p>{errors.steps}</p>)}
                    </div>

                    <div>
                        <ul> Steps added:
                            {newRecipe.steps.map(step => 
                                <li required key={step}>{step}</li>
                            )}
                        </ul>
                    </div>

                </form>


                    
            </div>
        </div>
    );
}

export default CreateRecipe;
