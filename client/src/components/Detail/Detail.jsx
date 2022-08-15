import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokeDetail } from '../../actions';
import newpokemon from '../../img/newpokemon.png';
import style from './Detail.module.css';

export default function Detail(props) {
    const dispatch = useDispatch();
    console.log('props', props)

    useEffect(() => {
        dispatch(getPokeDetail(props.match.params.idPokemon));
    }, [dispatch,props.match.params.idPokemon]);

    const myPoke = useSelector((state) => state.pokeDetail);
    console.log('myPoke',myPoke)

    
    return (
        <div  key={myPoke.id}>
            {
                Object.entries(myPoke).length>0 ?
                <div className={style.info}>
                    <h1>{myPoke.name.toUpperCase()}</h1>
                    <img className={style.img} src= {myPoke.image ? myPoke.image : newpokemon} alt='pokemon img'/>
                    <h4>ID: {myPoke.id}</h4>
                    <h4>Life: {myPoke.life}</h4>
                    <h4>Attack: {myPoke.attack}</h4>
                    <h4>Defense: {myPoke.defense}</h4>
                    <h4>Speed: {myPoke.speed}</h4>
                    <h4>Heigth: {myPoke.height}</h4>
                    <h4>Weigth: {myPoke.weight}</h4>
                    <h4>Type: </h4>  
                    {myPoke.type.map(t => 
                    
                    <p className={style.type} key={t}>{t.toUpperCase()}</p>
                    
                    )}      
                </div> : <p>LOADING...</p>
            }
            <Link to= '/home'>
                <button className={style.btn} >Go Back</button> 
            </Link>
        </div>
    )
}