import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, createPokemon } from '../../actions';
import style from './PokeCreate.module.css';

export function PokeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state.types);
    const [error, setError] = useState({
        name: '',
        image: '',
        type: [],
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
    });

    useEffect(() => {
        dispatch(getTypes());
    },[dispatch]);

    const [input, setInput] = useState({
        name: '',
        image: '',
        type: [],
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validation({
            ...input,
            [e.target.name]: e.target.value,
        }));
        
    };

    function handleSelect(e) {
        if(!input.type.includes(e.target.value)) {
        if(input.type.length >= 2){
            alert('You cannot choose more than two')
        } else {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
        setError(validation({
            ...input,
            [e.target.name]: e.target.value,
        }));
        }
        } else {
            alert('You cannot choose the same type')
        }
    
    };

    function handleDelete(t) {
        setInput({
            ...input,
            type: input.type.filter(tipo => tipo !== t)
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(
            !error.name &&
            !error.type &&
            !error.life &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.height &&
            !error.weight
        ) {
            dispatch(createPokemon(input));
            alert('Successfully created Pokemon!');
            setInput({
            name: '',
            image: '',
            type: [],
            life: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            });
            history.push('/home');
        } else {
            alert('You must complete all the fields!')
        }
    };

    return(
        <div> 
            <Link to='/home'><button className={style.btn}>Exit</button></Link>
            <h1 className={style.title}>Create your own Pokemon here!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <label className={style.label}>Name: </label>
                <input 
                type="text"
                value={input.name}
                name="name"   
                onChange={(e) => handleChange(e)}
                />
                {error.name? <p className={style.error}>{error.name}</p>: []}
                </div> 
                <div>
                <label className={style.label}>Image: </label>
                <input 
                type="text"
                value={input.image}
                name="image"   
                onChange={(e) => handleChange(e)}
                />
                </div> 
                <div>
                <label className={style.label}>Life: </label>
                <input 
                type="number" 
                value={input.life}
                min='0'
                max='100'
                name="life" 
                onChange={(e) => handleChange(e)}
                />
                {error.life && <p className={style.error}>{error.life}</p>}
                </div>
                <div>
                <label className={style.label}>Attack: </label>
                <input 
                type="number" 
                value={input.attack} 
                name="attack" 
                onChange={(e) => handleChange(e)}
                />
                {error.attack && <p className={style.error}>{error.attack}</p>}
                </div>
                <div>
                <label className={style.label}>Defense: </label>
                <input 
                type="number" 
                value={input.defense}
                name="defense" 
                onChange={(e) => handleChange(e)}
                />
                {error.defense && <p className={style.error}>{error.defense}</p>}
                </div>
                <div>
                <label className={style.label}>Speed: </label>
                <input 
                type="number" 
                value={input.speed}
                name="speed" 
                onChange={(e) => handleChange(e)}
                />
                {error.speed && <p className={style.error}>{error.speed}</p>}
                </div>
                <div>
                <label className={style.label}>Height: </label>
                <input 
                type="number" 
                value={input.height}
                name="height" 
                onChange={(e) => handleChange(e)}
                />
                {error.height && <p className={style.error}>{error.height}</p>}
                </div>
                <div>
                <label className={style.label}>Weight: </label>
                <input 
                type="number" 
                name="weight" 
                onChange={(e) => handleChange(e)}
                />
                {error.weight && <p className={style.error}>{error.weight}</p>}
                </div>
                <div> 
                <label className={style.label}>Tipos: </label>
                <select onChange={e => handleSelect(e)}>
                  
                    {types && types.map((type) => {
                        return (
                            <option value={type.name} key={type.id}>
                            {type.name}
                            </option>
                        );
                    })};
                </select>
                {error.type? <p className={style.error}>{error.type}</p>: []}
                </div>

                <button className={style.btn} type='submit'>Create Pokemon</button>
            </form>
            {input.type.map(t => 
                <div className={style.typeSelected} key={t}>  
                    <p className={style.type}>{t}</p>
                    <button className={style.btnDelete} onClick={()=> handleDelete(t)}>X</button>
                </div>
            )}
        </div>
    )
};


function validation(input) {
    let error = {};
    if(!input.name){
        error.name= 'Name is required';
    } 
    if(!input.life || input.life > 100){
        error.life= 'Life is required. Enter a number between 1 and 100';
    }  
    if(!input.attack || input.attack > 100){
        error.attack= 'Attack is required. Enter a number between 1 and 100';
    }  
    if(!input.defense || input.defense > 100){
        error.defense= 'Defense is required. Enter a number between 1 and 100';
    }  
    if(!input.speed || input.speed > 100){
        error.speed= 'Speed is required. Enter a number between 1 and 100';
    }  
    if(!input.height || input.height > 100){
        error.height= 'Height is required. Height must be between 1 and 100';
    }  
    if(!input.weight || input.weight > 1000){
        error.weight= 'Weight is required. Weight must be between 1 and 1000';
    }  
    if(input.type.length === 0|| input.type.length > 2){
        error.type= 'Type is required. You cannot choose more than 2 types';
    }

    return error;
};