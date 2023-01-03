import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getRecipeDetail, cleanRecipeDetail } from '../../redux/actions/actions';
import './recipeDetail.css';
import recipeDetailbg from "../../recipeDetailbg.jpg"
import oldReliable from "../../oldReliable.jpg"


function RecipeDetail() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const recipe = useSelector((state) => state.recipeDetail);
    
    
    useEffect(() => {
        dispatch(getRecipeDetail(id));
        return () => {
            dispatch(cleanRecipeDetail())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    let dietsNewArray = (diets) => {
        let newArray = []
        for (let i = 0; i < diets.length; i++) {
            let diet = diets[i];
            let dietUpper = diet.name.charAt(0).toUpperCase() + diet.name.slice(1)
            newArray.push(dietUpper)
            if (i+1 < diets.length){
            newArray.push(', ')}
            }   
            newArray.push('.')
        return newArray
    }

    let dishTypesNewArray = (dishTypes) => {
        let newArray = []
        for (let i = 0; i < dishTypes.length; i++) {
            let dishType = dishTypes[i];
            newArray.push(dishType)
            if (i+1 < dishTypes.length){
            newArray.push(', ')}
            }   
            newArray.push('.')
        return newArray
    }

    let stepsNewArray = (steps) => {
        let newArray = []
        for (let i = 0; i < steps.length; i++) {
            let step = steps[i].slice(3);
            newArray.push(step)}
        return newArray
    }
    

    return (
        <div className="recipeDetail-wrap">
        <img alt="" src={recipeDetailbg} className='recipeDetailbg' />
            {recipe.diets && recipe.name? 
                <div className='recipeDetail'> 

                <div className='recipeDetail_title' > <h1>{recipe.name}</h1> </div> 

                    <div className='recipeDetail_container'> 
                        <Link className='recipeDetail_backButton' to='/home'><button>Back</button></Link>

                        <div className='recipeDetail_image' > <img src={recipe.image? recipe.image : oldReliable} alt="Not found" /> </div>

                        <div className='recipeDetail_healthScore'>  {recipe.healthScore && (<h2>Health Score: {recipe.healthScore}</h2>)} </div>
                        
                        <div className='recipeDetail_diets'> <h3>Compatible diets: {dietsNewArray(recipe.diets).map(e => e)}</h3> </div>                    

                        <div className='recipeDetail_dishTypes'>  {recipe.dishTypes.length && (<h3>Dish Types: {dishTypesNewArray(recipe.dishTypes).map (e => e)} </h3>)} </div>

                        <div className='recipeDetail_summary' ><p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p></div>
                    
                        {recipe.steps.length?
                        (<>  
                            <div className='recipeDetail_preparation' ><h2>Preparation:</h2></div> 

                            <div className='recipeDetail_steps'>
                                <ul>
                                {stepsNewArray(recipe.steps).map(step => {return <li key={step.charAt(0) + step.charAt(3) + step.charAt(6)}>{step}</li>})}
                                </ul>
                            </div>
                        </>) : null}
                    </div>

                </div> 

                : 

                <div>"Recipe not found"</div>
            }
            
        </div>
    )
    
};

    
export default RecipeDetail;