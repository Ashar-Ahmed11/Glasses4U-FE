import React, { useEffect, useContext } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import AdminLinks from "./adminLinks";
import Home from "./home";
import CreateProduct from "./createProduct";
import AdminProducts from "./adminproducts";
import CreateCategory from "./createProduct copy";
import BasicInfo from "./basicInfo";
import AppContext from "../context/appContext";
import ViewCategories from "./viewCategories";
import Eyewear from "./eyewear";
import CreateLens from "./createLens";
import Orders from "./orders";

// import { useEffect } from "react";
const Dashboard = () => {
    const location = useLocation();

    const history = useHistory()
    const { adminLogout } = useContext(AppContext)
    const onLogout = () => { adminLogout(); history.push('/admin') }


    // if (!authToken) {
    //     history.push('/sign-in')
    // }
   



    return (
        <div>
            {/* Navbar for mobile */}
            <nav className="navbar navbar-dark bg-secondary d-md-none">
                <div className="container-fluid">
                    <button
                        className="btn btn-outline-light"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileSidebar"
                        aria-controls="mobileSidebar"
                    >
                        ☰ Menu
                    </button>

                    <div className="dropdown">
                        <button
                            type="button"
                            className="btn bg-transparent border-0 d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                            id="dropdownUser1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="position-relative">
                                <img
                                    src="https://png.pngtree.com/png-vector/20220529/ourmid/pngtree-black-user-icon-flat-and-simple-vector-people-avatar-icon-vector-png-image_46750236.jpg"
                                    alt="profile"
                                    width="30"
                                    height="30"
                                    className="rounded-circle"
                                />
                                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </div>
                            <span className="d-sm-inline mx-1">Admin</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser1">
                            <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row flex-nowrap">
                    {/* Sidebar for larger screens */}
                    <div style={{ position: "sticky", height: "100vh", top: 0 }} className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 top-bg d-none d-md-block">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a
                                href="/dashboard/"
                                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                            >
                                <span className="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul
                                className="nav w-100 nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu"
                            >
                                <AdminLinks />
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <button
                                    type="button"
                                    className="btn bg-transparent border-0 d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                    id="dropdownUser2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="position-relative">
                                        <img
                                            src="https://png.pngtree.com/png-vector/20220529/ourmid/pngtree-black-user-icon-flat-and-simple-vector-people-avatar-icon-vector-png-image_46750236.jpg"
                                            alt="profile"
                                            width="30"
                                            height="30"
                                            className="rounded-circle"
                                        />
                                        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                            <span className="visually-hidden">New alerts</span>
                                        </span>
                                    </div>
                                    <span className="d-none d-sm-inline mx-1">Admin</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser2">
                                    <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Offcanvas Sidebar for Mobile */}
                    <div
                        className="offcanvas offcanvas-start bg-secondary text-white"
                        id="mobileSidebar"
                        aria-labelledby="mobileSidebarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="mobileSidebarLabel">
                                Menu
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                                style={{ filter: "invert(1)", opacity: 1 }}
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="nav nav-pills flex-column">

                                <AdminLinks mobile={true} />
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                 <div className="col py-3">
                 
                        <Switch>
                            <Route exact path="/dashboard/">
                            <Home/>
                            </Route>
                            <Route exact path="/dashboard/create-product">
                                <CreateProduct />
                            </Route>
                            <Route path="/dashboard/create-product/:prodid">
                                <CreateProduct />
                            </Route>
                            <Route exact path="/dashboard/products">
                                <AdminProducts />
                            </Route>
                            <Route exact path="/dashboard/create-category">
                                <CreateCategory />
                            </Route>
                            <Route path="/dashboard/edit-category/:catid">
                                <CreateCategory />
                            </Route>
                            <Route exact path="/dashboard/categories">
                                <ViewCategories />
                            </Route>
                            <Route exact path="/dashboard/eyewear">
                                <Eyewear />
                            </Route>
                            <Route exact path="/dashboard/create-lens">
                                <CreateLens />
                            </Route>
                            <Route path="/dashboard/create-lens/:lensid">
                                <CreateLens />
                            </Route>
                            <Route exact path="/dashboard/basic-info">
                                <BasicInfo />
                            </Route>
                            <Route exact path="/dashboard/orders">
                                <Orders />
                            </Route>
                            <Route exact path="/dashboard/transaction">
                                <h1 className="text-center">Transaction</h1>
                            </Route>
                            <Route exact path="/dashboard/users">
                                <h1 className="text-center">Users</h1>
                            </Route>
                        </Switch>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



// <Route path="/dashboard/user-dashboard/staking">
// <Staking/>

// </Route>
// <Route path="/dashboard/user-dashboard/transfer">
// <Transfer/>

// </Route>
// <Route path="/dashboard/user-dashboard/referrals">
// {/* <h1>hellworld</h1> */}
// <Referrals/>

// </Route>
// <Route path="/dashboard/user-dashboard/withdraw">
// <Withdraw/>

// </Route>