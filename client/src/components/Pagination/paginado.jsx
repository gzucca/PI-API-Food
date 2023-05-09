import React from "react";
import "./paginado.css";

export default function Paginado({ cardsPerPage, recipes, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipes / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginado__container">
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button
                  className={currentPage === number ? "paginaActual" : "paginadoPagina"}
                  onClick={() => paginado(number)}
                  
                >
                  {number}
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
