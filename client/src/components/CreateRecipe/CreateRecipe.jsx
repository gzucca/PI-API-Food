import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllDiets, createRecipe } from "../../redux/actions/actions";
import { Link } from 'react-router-dom';
import './createRecipe.css';

const CreateRecipe = () => {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    
    const [newRecipe, setNewRecipe] = useState ({
        name: '',
        summary: '',
        healthScore: '',
        steps: [],
        diets: [],
    })
    
    const [newStep, setNewStep] = useState ({
        step: '',
        stepNumber: 1,
    })

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
    }

    
    const handleChange = function (e) {
        setNewRecipe({
            ...newRecipe,
            [e.target.name] : e.target.value
        })
    }
    
    const handleChangeStep = function (e) {
        setNewStep({
            ...newStep,
            step : e.target.value
        })
    }
    
    const handleSubmitStep = function (e) {
        e.preventDefault();
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
    }

    const handleSubmitRecipe = function (e) { 
        e.preventDefault();
        console.log(newRecipe);
        dispatch(createRecipe(newRecipe))
        alert('Receta creada!')
        setNewRecipe({
            name: '',
            summary: '',
            healthScore: '',
            steps: [],
            diets: [], 
        })

    }


    return (
        <div className='createRecipe'>
            <Link to='/home'><button>Volver</button></Link>

            <h1>Crear Receta</h1>

            <form>
                <button type='submit' onClick={(e) => handleSubmitRecipe(e)}>CREAR RECETA</button>

                <div>
                    <label>Nombre: </label>
                    <input type="text" value={newRecipe.name} name='name' onChange={handleChange}/>
                </div>

                <div>
                    <label>HealthScore: </label>
                    <input type="number" value={newRecipe.healthScore} name='healthScore' placeholder='1-100' onChange={handleChange}/>
                </div>

                <div>
                    <label>Resumen: </label>
                    <textarea name="summary" cols="50" rows="2" onChange={handleChange} />
                </div>

                <div>
                    <label>Dietas: </label>
                    <select >
                            {diets.map(diet =>
                                <option key={diet.id} value={diet.name} >
                                    {diet.name}
                                </option>
                            )}
                    </select> 
                    <button type='submit' onClick={(e) => handleAddDiet(e)}>AGREGAR DIETA</button>
                </div>

                <div>
                    <ul> Dietas Agregadas:
                        {newRecipe.diets.map(diet => 
                            <li key={diet}>{diet}</li>
                        )}
                    </ul>
                </div>

                <div>
                    <label>Pasos: </label>
                    <textarea cols="50" rows="2" type="text" value={newStep.step} name='step' onChange={handleChangeStep}/>
                    <button type='submit' onClick={(e) => handleSubmitStep(e)}>AGREGAR PASO</button>
                </div>

                <div>
                    <ul> Pasos:
                        {newRecipe.steps.map(step => 
                            <li key={step}>{step}</li>
                        )}
                    </ul>
                </div>

            </form>


                
            
        </div>
    );
}

export default CreateRecipe;
