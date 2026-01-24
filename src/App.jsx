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
import Category from './pages/Category';
import TrackOrder from './components/TrackOrder';
import UserLogin from './components/user/Login';
import UserRegister from './components/user/Register';
import UserDashboard from './components/user/Dashboard';
const Success = () => {
  const tracking = localStorage.getItem('lastTrackingId') || ''
  return (
    <div className="container py-5 text-center">
      <h1 className="display-5 mb-3">Payment Successful</h1>
      <p className="lead">Thank you! Your order has been placed.</p>
      {tracking && <p className="h5 mt-3">Your tracking ID: <strong>{tracking}</strong></p>}
      {tracking && <p className="text-muted">Use this tracking ID to track your order.</p>}
      <a href="/" className="btn btn-dark mt-3" onClick={() => localStorage.removeItem('lastTrackingId')}>Continue Shopping</a>
    </div>
  )
}
const Failed = () => (<div className="container py-5 text-center"><h1 className="display-5 mb-3">Payment Failed</h1><p className="lead">Something went wrong. Please try again.</p><a href="/checkout" className="btn btn-dark mt-3">Back to Checkout</a></div>)
function App() {
  useScrollToTop();

  return (
    <>
            <Cart />
            {/* <ZendeskMessagingLoader apiKey={'LR1Mq7jCT5S2nWHZk73tDgQOA7YqxcRW6hjGf8IV'} /> */}

      <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/category/:id" exact><Category /></Route>
        <Route path="/product/:productid" exact ><ProductView /></Route>
        <Route path="/checkout" exact><Checkout /></Route>
        <Route path="/track" exact><TrackOrder /></Route>
        <Route path="/login" exact><UserLogin /></Route>
        <Route path="/register" exact><UserRegister /></Route>
        <Route path="/account" render={() => localStorage.getItem('user-token') ? <UserDashboard /> : <Redirect to="/login" />} />
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
