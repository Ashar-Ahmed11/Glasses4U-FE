import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/about" exact><div className="container py-5"><h1>About</h1></div></Route>
        <Route path="/users" exact><div className="container py-5"><h1>Users</h1></div></Route>
      </Switch>
    </>
  );
}

export default App;
