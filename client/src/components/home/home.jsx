import React from "react";
import { connect } from "react-redux";
import {
  getAllDiets,
  filterRecipeDiets,
  getAllRecipes,
  sortRecipes,
  loadAllRecipes,
} from "../../redux/actions/actions";
import NavBar from "../navBar/navBar";
import Paginado from "../paginado/paginado";
import RecipeCard from "../recipeCard/recipeCard";
import "./home.css";
import oldReliable from "../../oldReliable.jpg";
import Spinner from "../spinner/spinner";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
      sortState: "",
      currentPage: 1,
      cardsPerPage: 9,
      indexOfLastCard: "",
      indexOfFirstCard: "",
      currentCards: [],
    };

    this.paginado = this.paginado.bind(this);
  }

  currentCards() {
    this.setState((state, props) => ({
      currentCards: props.recipes.slice(
        state.indexOfFirstCard,
        state.indexOfLastCard
      ),
    }));
  }

  indexOfLastCard() {
    this.setState((state) => ({
      indexOfLastCard: state.currentPage * state.cardsPerPage,
    }));
  }

  indexOfFirstCard() {
    this.setState((state) => ({
      indexOfFirstCard: state.indexOfLastCard - state.cardsPerPage,
    }));
  }

  async componentDidMount() {
    if (this.props.allRecipes.length === 0) {
      console.log("Se cargaron todas las recetas");
      await this.props.getAllRecipes();
    }
    if (this.props.diets.length === 0) {
      console.log("Se cargaron todas las dietas");
      await this.props.getAllDiets();
    }
    this.indexOfLastCard();
    this.indexOfFirstCard();
    this.currentCards();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage === this.state.currentPage &&
      prevProps.recipes !== this.props.recipes
    ) {
      this.setState({
        currentPage: 1,
      });
      this.indexOfLastCard();
      this.indexOfFirstCard();
      this.currentCards();
    }

    if (
      prevState.currentPage !== this.state.currentPage ||
      (prevProps.recipes === this.props.recipes &&
        prevState.sortState !== this.state.sortState)
    ) {
      this.indexOfLastCard();
      this.indexOfFirstCard();
      this.currentCards();
    }
  }

  async loadAllRecipes(e) {
    e.preventDefault();
    await this.props.loadAllRecipes();
  }

  handleFilterDiet(e) {
    e.preventDefault();
    this.props.filterRecipeDiets(e.target.value);
    this.setState({ currentPage: 1 });
  }

  handleSorts(e) {
    e.preventDefault();
    this.props.sortRecipes(e.target.value);
    this.setState({ sortState: e.target.value });
  }

  handlePrevious(e) {
    e.preventDefault();
    if (this.state.currentPage !== 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  }

  handleNext(e) {
    e.preventDefault();
    if (
      this.state.currentPage !==
      Math.ceil(this.props.recipes.length / this.state.cardsPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  }

  toggleMenu() {
    this.setState({ visibility: !this.state.visibility });
  }

  paginado(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div className="home__background">
        <NavBar />
        <div className="home__container">
          <div className="filters__container">
            <button id="top" onClick={(e) => this.loadAllRecipes(e)}>
              Load all recipes
            </button>
            <select
              className="filters__filterDiets"
              onChange={(e) => this.handleFilterDiet(e)}
            >
              <option value="allDiets">All diets</option>
              {this.props.diets.map((diets) => (
                <option key={diets.id} value={diets.name}>
                  {diets.name}
                </option>
              ))}
            </select>
            <button onClick={() => this.toggleMenu()}>Sort</button>
          </div>

          <div
            className="sorts"
            style={{ display: this.state.visibility ? "flex" : "none" }}
          >
            <li> By name </li>
            <select onChange={(e) => this.handleSorts(e)} name="alphabetically">
              <option value="alphaUp">A-Z</option>
              <option value="alphaDown">Z-A</option>
            </select>
            <li> By Health Score </li>
            <select onChange={(e) => this.handleSorts(e)} name="healthScore">
              <option value="hScoreUp">1 - 100</option>
              <option value="hScoreDown">100 - 1</option>
            </select>
          </div>

          <div className="pages__container">
            <button onClick={(e) => this.handlePrevious(e)}>Previous</button>
            <Paginado
              cardsPerPage={this.state.cardsPerPage}
              recipes={this.props.recipes.length}
              paginado={this.paginado}
              currentPage={this.state.currentPage}
            />
            <button onClick={(e) => this.handleNext(e)}>Next</button>
          </div>

          {this.state.currentCards.length === 0 ? (
            <Spinner />
          ) : (
            <div className="homeCards">
              {this.state.currentCards.map((r) => {
                return (
                  <RecipeCard
                    key={r.id}
                    name={r.name}
                    diets={r.diets}
                    img={r.image ? r.image : oldReliable}
                    id={r.id}
                    healthScore={r.healthScore}
                    dishTypes={r.dishTypes}
                  />
                );
              })}
            </div>
          )}

          <div className="pages__container">
            <button onClick={(e) => this.handlePrevious(e)}>Previous</button>
            <Paginado
              cardsPerPage={this.state.cardsPerPage}
              recipes={this.props.recipes.length}
              paginado={this.paginado}
              currentPage={this.state.currentPage}
            />
            <button onClick={(e) => this.handleNext(e)}>Next</button>
          </div>

          <div className="backToTop">
            <button
              className="backToTop__button"
              onClick={(e) => this.scrollToTop(e)}
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    diets: state.diets,
    recipes: state.recipes,
    allRecipes: state.allRecipes,
  };
}

export default connect(mapStateToProps, {
  getAllDiets,
  filterRecipeDiets,
  getAllRecipes,
  loadAllRecipes,
  sortRecipes,
})(Home);
