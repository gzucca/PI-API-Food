import React from 'react'


export default function Paginado({cardsPerPage, recipes, paginado}) {
    const pageNumbers = []


    for (let i = 1; i <= Math.ceil(recipes/cardsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav >
            <ul className="paginado">
                {pageNumbers && pageNumbers.map (number =>{ 
                    return (
                    <li className="paginadoPagina" key={number}>
                        <button onClick={ () => paginado(number)}> {number} </button>
                    </li>
                )
                })}
            </ul>
        </nav>
    )

}

