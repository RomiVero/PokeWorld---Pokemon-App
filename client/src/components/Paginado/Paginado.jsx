import React from 'react';
import style from './Paginado.module.css';

export default function Paginado ({pokePerPage, allPokemons, paginado}) {

    const numPage = [];

    for (let i = 0; i < Math.ceil(allPokemons/pokePerPage); i++) {
        numPage.push(i+1);
    }

    return (
        <nav className={style.paginado}>
            <ul>
            {numPage?.map( num => (
                <li  key={num}> 
                    <a href='#' onClick={()=> paginado(num)}>{num}</a>
                </li>
            ))}
            </ul>
        </nav>
    );
};