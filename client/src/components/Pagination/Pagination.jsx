import React from "react";
import "./Pagination.css";

export default function Pagination({
  cardsPerPage,
  recipes,
  paginado,
  currentPage,
}) {
  const pagesTotal = [];

  for (let i = 1; i <= Math.ceil(recipes / cardsPerPage); i++) {
    pagesTotal.push(i);
  }

  return (
    <nav className="paginado__container">
      <ul className="paginado">

        {pagesTotal &&
        // eslint-disable-next-line
          pagesTotal.map((number) => {
            if (number > currentPage - 2) {
              if (number < currentPage + 4) {
                return (
                  <li key={number}>
                    <button
                      className={
                        currentPage === number
                          ? "paginaActual"
                          : "paginadoPagina"
                      }
                      onClick={() => paginado(number)}
                    >
                      {number}
                    </button>
                  </li>
                );
              }
            }
          })}
      </ul>
    </nav>
  );
}
