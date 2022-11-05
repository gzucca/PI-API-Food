import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../redux/actions/actions';
import './recipeDetail.css';


function RecipeDetail() {

    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(() => {
        dispatch(getRecipeDetail(id));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const recipes = useSelector((state) => state.recipeDetail);

    console.log(recipes);


    return (
        <div className='recipeDetail'>
        {recipes? <div> 
            <div >"<b>{recipes.name}</b>"</div> 
            <div > <img src={recipes.image} alt="Not found" /> 

            <div > |Health Score| <br/> '{recipes.healthScore}'<br/> |Dish type| <br/>'{recipes.dishTypes}'</div>
            

            </div>
            

            
            <div ><p dangerouslySetInnerHTML={{ __html: recipes.summary }}></p></div>
        
            <div > <div > <b>Steps:</b></div> <br/>{recipes.steps}</div>
            </div> : <div>"Recipe not found"</div>}
            
        </div>
    );
    };

    
export default RecipeDetail;