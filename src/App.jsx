import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './components/cart';
import ProductView from './components/productView';
import Admin from './components/admin/admin';
import Dashboard from './components/admin/dashboard';
import Checkout from './components/checkout';
import React from 'react'
import useScrollToTop from './components/useScrollToTop';
import ZendeskMessagingLoader from './components/ZendeskMessagingLoader';
const Success = () => (<div className="container py-5 text-center"><h1 className="display-5 mb-3">Payment Successful</h1><p className="lead">Thank you! Your order has been placed.</p><a href="/" className="btn btn-dark mt-3">Continue Shopping</a></div>)
const Failed = () => (<div className="container py-5 text-center"><h1 className="display-5 mb-3">Payment Failed</h1><p className="lead">Something went wrong. Please try again.</p><a href="/checkout" className="btn btn-dark mt-3">Back to Checkout</a></div>)
function App() {
  useScrollToTop();

  return (
    <>
            <Cart />
            {/* <ZendeskMessagingLoader apiKey={'LR1Mq7jCT5S2nWHZk73tDgQOA7YqxcRW6hjGf8IV'} /> */}

      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/product/:productid" exact ><ProductView /></Route>
        <Route path="/checkout" exact><Checkout /></Route>
        <Route path="/success" exact><Success /></Route>
        <Route path="/failed" exact><Failed /></Route>
        <Route path="/admin" exact><Admin /></Route>
        <Route path="/dashboard" render={() => localStorage.getItem('auth-token') ? <Dashboard /> : <Redirect to="/admin" />} />

        <Route path="/about" exact><div className="container py-5"><h1>About</h1></div></Route>
        <Route path="/users" exact><div className="container py-5"><h1>Users</h1></div></Route>
      </Switch>
    </>
  );
}

export default App;
