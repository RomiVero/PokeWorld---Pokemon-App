const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    try {
       const response1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
       const response2 = await axios.get(response1.data.next);
       const response = response1.data.results.concat(response2.data.results);
       let types= [];
       const apiData = await Promise.all(response.map(async (elem) => {
       let subrequest = await axios.get(elem.url);
       types = subrequest.data.types.map(elem => {
            return elem.type.name + " ";
        });

       return {
           id: subrequest.data.id,
           name: elem.name,
           image: subrequest.data.sprites.other.home.front_default,
           type: types,
           life: subrequest.data.stats[0].base_stat,
           attack: subrequest.data.stats[1].base_stat,
           defense: subrequest.data.stats[2].base_stat,
           speed: subrequest.data.stats[5].base_stat,
           height: subrequest.data.height,
           weight: subrequest.data.weight,
       };
       }));
          
        return apiData;

    } catch (error) {
        return error;
    }
};


const getDbInfo = async () => {
    let type= [];
    
    const pokeDb= await Pokemon.findAll({
        include: Type 
    });
        
    const pokeDbFinal = pokeDb.map(poke => {
        type = poke.types.map(elem => {
            return elem.name + " ";
        });
        /* if(poke.types.length === 1) {
            type = poke.types[0].name;
        } else {
            for(var i=0; i<poke.types.length; i++){
                type = type + " " + poke.types[i].name;
            }
        } */
        return {
            id: poke.id,
            name: poke.name.toLowerCase(),
            image: poke.image,
            type: type,
            life: poke.life,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            height: poke.height,
            weight:poke.weight,
            created: poke.created         
        }
    });
    return pokeDbFinal;
};

const getInfoTotal = async () => {
    const apiInfo = await getApiInfo();
    //console.log('apiInfo', apiInfo)
    const dbInfo = await getDbInfo();
    //console.log('dbInfo', dbInfo)
    const infoTotal = [...apiInfo, ...dbInfo];
    //console.log('infoTotal', infoTotal)
    return infoTotal;
   
};

router.get('/pokemons', async (req, res) => {
    const { name } = req.query;
    
    try {
        const data = await getInfoTotal();
        if(name) {
            //let pokeName = await data.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()));
            let pokeName = await data.filter(poke => poke.name.toLowerCase() === name.toLowerCase());
            if(pokeName.length)
            {
                return res.status(200).send(pokeName);
                
            } else {
                return res.status(404).send({message: 'No se encontro el Pokemon'})
                
            }
        } else {
            return res.status(200).json(data);
        } 
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
});

router.get('/pokemons/:idPokemon', async (req, res) => {
    const idPokemon = req.params.idPokemon;
    //console.log('idPokemon', idPokemon)

    try {
        const data = await getInfoTotal();
        //console.log(data, 'data de getApiInfo');
        const pokemon = data.find(elem => elem.id.toString() == idPokemon);
        //console.log('pokemon',pokemon);
        res.status(200).send(pokemon);

    } catch (error) {
        res.status(404).send({message: 'No se encontró el Pokemon'});
    }
});

router.post('/pokemons', async (req, res) => {
    const { name, image, type, life, attack, defense, speed, height, weight } = req.body;
    let pokemon =  {
        name, 
        image, 
        life, 
        attack, 
        defense, 
        speed, 
        height, 
        weight,
        created: true
    };
    try {
        const createdPoke = await Pokemon.create(pokemon);
        const typeDb = await Type.findAll({where:{ name: type}});
        createdPoke.addType(typeDb);
       
        return res.status(200).send('Pokemon creado correctamente');

    } catch (error) {
        return res.status(404).send(error)
    }
});

router.get('/types', async (req, res) => {
    
        try {
            const dbTypes = await Type.findAll();

            if(dbTypes.length > 0) {
               return res.status(200).send(dbTypes)

            } else {
                const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
                const apiTypesFinal = apiTypes.data.results;
                apiTypesFinal.forEach((t) => {
                    Type.create({name: t.name})
                });
                
                return res.status(200).send(apiTypesFinal);
            }
        } catch (error) {
            return res.status(404).send(error);
        }
});


module.exports = router;
