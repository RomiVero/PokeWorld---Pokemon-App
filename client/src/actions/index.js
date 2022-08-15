import axios from 'axios';

export function getAllPokemons() {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/pokemons');
            dispatch({
                type: 'GET_ALL_POKEMONS',
                payload: response.data
            });
        } catch (error) {
            console.log('GetAllPokemons Error:', error);
        }
    }    
};

export function getTypes() {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/types');
            dispatch({
                type: 'GET_TYPES',
                payload: response.data
            });
        } catch (error) {
            console.log('getTypes Error:', error);
        }
    }
};

export function createPokemon(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/pokemons', payload)
            return response;
        } catch (error) {
            console.log('createPokemon Error:', error);
        }
    }
};

export function getPokemonByName(name) {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch({
                type: 'GET_POKEMON_BY_NAME',
                payload: response.data
            })
        } catch (error) {
            alert('No se encontró el Pokemon');
            console.log('getPokemonByName Error:',error);
        }
    }
};
export function getPokeDetail(idPokemon) {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/pokemons/' + idPokemon);
            return dispatch({
                type: 'GET_POKE_DETAIL',
                payload: response.data
            })
        } catch (error) {
            console.log('getPokeDetail Error:',error);
        }
    }
};

export function filterByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
};

export function filterByCreator(payload) {
    return {
        type: 'FILTER_BY_CREATOR',
        payload
    }
};

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
};