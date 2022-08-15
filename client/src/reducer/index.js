const initialState = {
    allPokemons: [],
    pokemons: [],
    types: [],
    pokeDetail: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'CREATE_POKEMON':
            return {
                ...state
            }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'GET_POKE_DETAIL':
            return {
                ...state,
                pokeDetail: action.payload
            }
        case 'FILTER_BY_TYPES':
            // let filteredTypes;
            //const allPoke = state.allPokemons;

           /*  if(action.payload === 'all')  {
                filteredTypes = allPoke
            } else { 
                filteredTypes = allPoke.filter((p) => 
                    p.type.includes(action.payload.toLowerCase())
                );
            } */
            let filteredTypes= action.payload === 'all'
            ? state.allPokemons 
            : state.allPokemons.filter(p =>  p.type.some(t => t.toLowerCase().trim() == action.payload.toLowerCase()));
                    
            return {
                ...state,
                pokemons: filteredTypes   
            }
        case 'FILTER_BY_CREATOR':
            let filteredByCreator = [];
            const allPoke2 = state.allPokemons;
            
            if(action.payload === 'creado') {
                filteredByCreator = allPoke2.filter(p => typeof p.id === 'string') 
            } else if(action.payload === 'api') {
                filteredByCreator = allPoke2.filter(p => typeof p.id === 'number');
            } else {
                filteredByCreator = allPoke2;
            }
            return {
                ...state,
                pokemons: filteredByCreator
            } 
        case 'ORDER_BY_NAME':
            let sortPoke = [];

            if (action.payload === 'null') {
                sortPoke = state.pokemons;
            }
            if (action.payload === 'asc') {
                sortPoke = state.pokemons.sort(function (a,b) {
                    if(a.name > b.name) {
                        return 1;
                    } 
                    if(b.name > a.name) {
                        return - 1;
                    } 
                    return 0;
                })
            }
            if (action.payload === 'desc') {
                sortPoke = state.pokemons.sort(function (a,b) {
                    if(a.name > b.name) {
                        return - 1;
                    } 
                    if(b.name > a.name) {
                        return 1;
                    } 
                    return 0;
                });
            }
            return {
                    ...state,
                    pokemons: sortPoke
                }
        case 'ORDER_BY_ATTACK':
            let sortAttack = [];
            
            if (action.payload === 'null') {
                sortAttack = state.pokemons;
            }
            if(action.payload === 'attack-') {
                sortAttack = state.pokemons.sort(function (a,b) {
                    if(a.attack > b.attack) {
                        return 1;
                    } 
                    if(b.attack > a.attack) {
                        return - 1;
                    } 
                    return 0;
                });
            }
            if(action.payload === 'attack+') {    
                sortAttack = state.pokemons.sort(function (a,b) {
                    if(a.attack > b.attack) {
                        return - 1;
                    } 
                    if(b.attack > a.attack) {
                        return 1;
                    } 
                    return 0;
                });
            }
                return {
                    ...state,
                    pokemons: sortAttack
                }
        default: 
            return state;
    }
};

export default rootReducer;