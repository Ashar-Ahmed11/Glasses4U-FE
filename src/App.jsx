import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './components/cart';
import ProductView from './components/productView';
import useScrollToTop from './components/useScrollToTop';
function App() {
  useScrollToTop();

  return (
    <>
            <Cart />

      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/product/:productid" exact ><ProductView /></Route>

        <Route path="/about" exact><div className="container py-5"><h1>About</h1></div></Route>
        <Route path="/users" exact><div className="container py-5"><h1>Users</h1></div></Route>
      </Switch>
    </>
  );
}

export default App;
