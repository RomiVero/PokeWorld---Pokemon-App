import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../actions';
import style from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getPokemonByName(name))
    }

    return (
        <div className={style.container}>
        <input className={style.input}
        type='text'
        placeholder='Search Pokemon...'
        onChange={(e) => handleInputChange(e)}
        />
        <button className={style.btn} type='submit' onClick={(e) => handleSubmit(e)} >Search</button>
        </div>
    )
}