import React from "react";
import { connect } from "react-redux";
import { getAllDiets, filterRecipeDiets, getAllRecipes, sortRecipes } from "../../redux/actions/actions";
import NavBar from "../navBar/navBar";
import Paginado from "../paginado/paginado";
import RecipeCard from "../recipeCard/recipeCard";
import './home.css';


export class Home extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            diets: [],
            visibility : false,
            sort : '',
            currentPage : 1,
            cardsPerPage : 6,
            indexOfLastCard : "",
            indexOfFirstCard : "",
            currentCards : []
        };
        
        this.paginado = this.paginado.bind(this);
    };
    
    currentCards(){
        let recipesShown= this.props.recipes.slice(this.state.indexOfFirstCard, this.state.indexOfLastCard)
        this.setState({currentCards: recipesShown})
    }

    indexOfLastCard(){
        this.setState({indexOfLastCard: (this.state.currentPage * this.state.cardsPerPage)})
    }

    indexOfFirstCard(){
        this.setState({indexOfFirstCard: (this.state.indexOfLastCard - this.state.cardsPerPage)})
    }

    componentDidMount(){
        this.props.getAllRecipes();
        this.props.getAllDiets();
        setTimeout(() => {
            this.setState({diets : this.props.diets})
        }, 200);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.currentPage !== this.state.currentPage || prevProps.recipes !== this.props.recipes || prevState.sort !== this.state.sort) {
            this.indexOfLastCard();
            setTimeout(() => {
                this.indexOfFirstCard();
                this.currentCards()
            }, 100);
        }
    }

    loadAllRecipes(e) {
        e.preventDefault();
        this.props.getAllRecipes()
    };
    
    displayDiets(e) {
        e.preventDefault();
        
        if (this.state.diets.length === 0){
            
            this.props.getAllDiets()
            setTimeout( () => {
                this.setState({diets : this.props.diets})
            }, 500);
            
        } 
        
        if (this.state.diets.length > 0) {
            this.setState({diets : []})
        }
        
    };
    
    handleFilterDiet(e) {
        e.preventDefault();
        
        setTimeout( () => {  
            this.props.filterRecipeDiets(e.target.value);
        }, 100);
        
    };
    
    handleSorts(e) {
        e.preventDefault();
        this.props.sortRecipes(e.target.value)
        this.setState({currentPage: 1})
        this.setState({sort: e.target.value})
        
    }
    
    toggleMenu() {
        this.setState({visibility: !this.state.visibility})
    }

    paginado(pageNumber) {
        this.setState({currentPage: pageNumber})
    }
                        
    render() {
        return (
            <div>
                <NavBar/>
                
                <button onClick={(e) => this.loadAllRecipes(e)}>Cargar todas las recetas</button>
                <select onChange={(e) => this.handleFilterDiet(e)}>
                        <option>Todas las dietas</option>
                    {this.state.diets.map(diets =>
                        <option key={diets.id} value={diets.name} >
                            {diets.name}
                        </option>
                    )}
                </select> 

                <button onClick={() => this.toggleMenu()}>Ordenar</button>
                <ul  style={{"display": this.state.visibility ? 'inline' : 'none', "listStyleType": "none"}}>
                    <li> Por nombre </li>
                        <select onChange={(e) => this.handleSorts(e)} name='alphabetically'>
                            <option value="alphaUp" >Ascendiente</option>
                            <option value="alphaDown" >Descendiente</option>
                        </select>
                    <li> Por Health Score </li>
                        <select  onChange={(e) => this.handleSorts(e)} name='healthScore'>
                            <option value="hScoreUp" >Ascendiente</option>
                            <option value="hScoreDown" >Descendiente</option>
                        </select>
                </ul>

                <div>
                {(this.state.currentCards).map(r => {
                    return <RecipeCard
                        key={r.name}
                        name={r.name}
                        diets={r.diets}
                        img={r.image}
                        id={r.id}
                        healthScore={r.healthScore}
                    />
                })}
                </div>

                <Paginado cardsPerPage={this.state.cardsPerPage} recipes={this.props.recipes.length} paginado={this.paginado}/>

            
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

export default connect(mapStateToProps, {getAllDiets, filterRecipeDiets, getAllRecipes, sortRecipes})(Home);