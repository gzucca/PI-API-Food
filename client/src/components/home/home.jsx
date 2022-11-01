import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { getAllDiets, filterRecipeDiets, getAllRecipes } from "../../redux/actions/actions";
import NavBar from "../navBar/navBar";
import RecipeCards from "../recipeCards/recipeCards";
import './home.css';


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            diets: [],

        };
    };
    
    // componentDidMount() {
    //     console.log(this.state.diets);
    // }

    displayDiets(e) {
        e.preventDefault();
        
        if (this.state.diets.length === 0){

            this.props.getAllDiets()
            setTimeout( () => {
                this.setState({diets : this.props.diets})
            }, 100);
            
        } 
        
        if (this.state.diets.length > 0) {
            this.setState({diets : []})
        }
        
    };

    handleFilter(e, name) {
        e.preventDefault();

        this.props.getAllRecipes();

        setTimeout( () => {  
            this.props.filterRecipeDiets(name);;
        }, 100);

    };


    addButtons() {
        $("#current").on('click', function(){
            $(this).next("ul").toggle();
        });
    }
    
    render() {
        return (
            <div>
                <NavBar/>

                <button onClick={(e) => this.displayDiets(e)}>Tipo de dieta</button>
                <ul>
                    {this.state.diets.map(diets =>
                        <li key={diets.id} onClick={(e) => this.handleFilter(e, diets.name)}>
                            {diets.name}
                        </li>
                    )}
                </ul> 

                <button id="current" onClick={this.addButtons}>Ordenar</button>
                <ul hidden style={{"listStyleType": "none"}}>
                    <li> Por nombre </li>
                        <select name='alphabetically' id='sort'>
                            <option value='ascending'>Ascendiente</option>
                            <option value='descending'>Descendiente</option>
                        </select>
                    <li> Por Health Score </li>
                        <select name='healthScore' id='sort'>
                            <option value='ascending'>Ascendiente</option>
                            <option value='descending'>Descendiente</option>
                        </select>
                </ul>

                <RecipeCards/>
            
            </div>
        );
    }

};


function mapStateToProps(state) {
    return {
        diets: state.diets,
        recipes: state.recipes
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         getAllDiets: () => dispatch(getAllDiets()),
//     }
// }

export default connect(mapStateToProps, {getAllDiets, filterRecipeDiets, getAllRecipes})(Home);