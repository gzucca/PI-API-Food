import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllDiets, createRecipe } from "../../redux/actions/actions";
import { Link } from 'react-router-dom';


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
    
    useEffect(() => {
        dispatch(getAllDiets());
    }, []);

    const [step, setStep] = useState ({
        step: '',
    })

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
        console.log(newRecipe);

    }
    
    const handleChangeStep = function (e) {
        setStep({
            ...step,
            [e.target.name] : e.target.value
        })
        console.log(step);
    }
    
    const handleAddStep = function (e) {
        e.preventDefault();
        let newSteps = newRecipe.steps
        newSteps.push(step.step)
        setNewRecipe({
            ...newRecipe,
            steps: [...newSteps],
        })
    }


    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>

            <h1>Crear Receta</h1>

            <form>
                <button>CREAR RECETA</button>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={newRecipe.name} name='name' onChange={handleChange}/>
                </div>
                <div>
                </div>
                <div>
                    <label>HealthScore: </label>
                    <input type="number" value={newRecipe.healthScore} name='healthScore' placeholder='1-100' onChange={handleChange}/>
                </div>
                <label>Resumen: </label>
                    <textarea name="summary" cols="50" rows="2" onChange={handleChange} />
     
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
                    <textarea cols="50" rows="2" type="text"  name='step' onChange={handleChangeStep}/>
                    <button type='submit'  onClick={(e) => handleAddStep(e)}>AGREGAR PASO</button>
                </div>

            </form>


                
            
        </div>
    );
}

export default CreateRecipe;
