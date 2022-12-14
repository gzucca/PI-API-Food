import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRecipes } from '../../redux/actions/actions';
import'./navBar.css'


function NavBar() {

    const [recipeState, setRecipeState] = useState({
        name: ''
    });

    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipes(recipeState.name))
        setRecipeState({
            name: "",
        })
    };

    const handleInputChange = function (e) {
        setRecipeState({
            name: e.target.value.toLowerCase(),
        })
    }


    return (
        <div className='navBar-bg'>
            <h1>Home</h1>
            <div className='navBar'>
                <Link to="/createRecipe">Create recipe</Link>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label >Search: </label>
                        <input
                        type="text"
                        placeholder='Recipe name' 
                        autoComplete="off"
                        value={recipeState.name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" >🔎</button>
                </form>
            </div>
        </div>

    )

}

export default NavBar;

// disabled={Object.keys(errors).length}