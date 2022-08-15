import style from './Landing.module.css';
import React from "react";
import { Link } from 'react-router-dom';


export default function Landing() {
    return (
        <div className={style.back}>
            <h1 className={style.title}>WELCOME TO POKEWORLD</h1>
            <Link to= '/home'>
                <button className={style.button}>START</button>
            </Link>
        </div>
    )
};