import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllRecipes } from '../../redux/actions/actions';
import'./navBar.css'


function NavBar() {

    const [recipeState, setRecipeState] = useState({
        name: ''
    });

    const dispatch = useDispatch();

    function  handleSubmit(e){
        e.preventDefault();
        dispatch(getAllRecipes(recipeState.name))
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
                <Link to="/createRecipe">Crear receta</Link>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label >Buscador: </label>
                        <input
                        type="text"
                        placeholder='Nombre receta' 
                        autoComplete="off"
                        onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" >BUSCAR</button>
                </form>
            </div>
        </div>

    )

}

export default NavBar;

// disabled={Object.keys(errors).length}