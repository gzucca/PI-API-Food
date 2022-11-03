import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllRecipes } from '../../redux/actions/actions';


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
        <div >
            <Link to="/home"><p>Home</p></Link>

            <Link to="/createRecipe"><p>Crear receta</p></Link>

            <h4>Buscador</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Receta: </label>
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

    )

}

export default NavBar;

// disabled={Object.keys(errors).length}