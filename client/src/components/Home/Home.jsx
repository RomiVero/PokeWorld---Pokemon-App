import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPokemons, getTypes, filterByTypes, filterByCreator, orderByName, orderByAttack } from '../../actions';
import { Link } from 'react-router-dom';
import newpokemon from '../../img/newpokemon.png';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage] = useState(12);
    const indexLastPoke = currentPage * pokePerPage;
    const indexFirstPoke = indexLastPoke - pokePerPage;
    const currentPoke = allPokemons.slice(indexFirstPoke, indexLastPoke);
    const [,setOrden] = useState('');
    

//console.log(currentPoke);

    const paginado = (pageNum) => {
        setCurrentPage(pageNum);
    };

//console.log(types);
    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
    },[dispatch]);
//console.log(allPokemons);

    function handleReload(e) {
        e.preventDefault();
        dispatch(getAllPokemons());
        dispatch(getTypes());
        setCurrentPage(1);
        document.getElementById('myForm').reset();
    };

    function handleFilterTypes(e) {
        dispatch(filterByTypes(e.target.value))
        console.log('value',e.target.value)
    };

    function handleFilterCreator(e) {
        dispatch(filterByCreator(e.target.value))
    };

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    };

    function handleOrderByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    };

    return(
        <div className={style.home}>
            <div className={style.search}> 
            <SearchBar/>
            
            <Link to = '/pokemons'>
                <button className={style.btnCreate}>Create Pokemon</button>
            </Link>
            </div>

            <h1 className={style.title} >THE POKEMON WORLD</h1>
            <button className={style.btnReload} onClick={e=>{handleReload(e)}}>RELOAD</button>

            <div  >
                <div> 
                <form id='myForm'> 
                <span> ORDER BY </span>
                <select onChange={e => handleOrderByName(e)}>
                    <option hidden>ALFABETIC</option>
                    <option value='asc'>A - Z  ASC</option>
                    <option value='desc'>Z - A  DESC</option>
                </select>
                <span> </span>
                <select onChange={e => handleOrderByAttack(e)}>
                    <option hidden>ATTACK</option>
                    <option value='attack+'>+ ATTACK</option>
                    <option value='attack-'>- ATTACK</option>
                </select>

                <span> SOURCE </span>
                <select onChange={e => handleFilterCreator(e)}>
                    <option value='all'>ALL</option>
                    <option value='api'>EXISTING</option>
                    <option value='creado'>CREATED</option>
                </select>

                <span > TYPES </span>
                <select onChange={e => handleFilterTypes(e)}>
                    <option value='all'>ALL</option>
                    {types && types.map((type) => {
                        return (
                            <option value={type.name} key={type.id}>
                            {type.name}
                            </option>
                        );
                    })};
                </select>
                </form>
                </div>
            <Paginado pokePerPage={pokePerPage} allPokemons={allPokemons.length} paginado={paginado} />
            {allPokemons.length > 0? 
            <div className={style.cards}>
            {currentPoke?.map(el=> {
                return(
                        <Link to={`/pokemons/${el.id}`} key={el.id} >
                        <Card  image={el.image? el.image : newpokemon} name={el.name} type={el.type}/>
                        </Link>
                    )
            })}
            </div> 
            : 'LOADING...'
            }
            </div>
        </div>
    )
};