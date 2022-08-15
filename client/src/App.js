import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/Landing/Landing';
import Home from './components/Home/Home';
import { PokeCreate } from './components/PokeCreate/PokeCreate';
import Detail from './components/Detail/Detail';



function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/pokemons' component={PokeCreate} />
        <Route exact path='/pokemons/:idPokemon' component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;
