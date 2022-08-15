import React from 'react';
import style from './Card.module.css';

export default function Card({image, name, type}) {

    return(
        <div className={style.card}>
            <h3>{name.toUpperCase()}</h3>
            <img className={style.img} src={image} alt='img not found'  />
            <h5>Type: </h5>
            {type.map(t => 
                    <div className={style.types} key={t}>  
                    <p>{t.toUpperCase()}</p>
                    </div>
                    )}     
        </div>
    );
}