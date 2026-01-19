import React, { useContext, useState, useEffect } from 'react'
import Logo from './logo.png'
import CheckoutItem from './checkoutItem'
import Spinner from './spinner'
import AppContext from './context/appContext'
// import { PayPalButton } from 'react-paypal-button-v2'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useHistory } from 'react-router-dom'
export default function Checkout() {


    const history = useHistory()
    const { basicInfo, cart, createStripeSession, getBasicInfo } = useContext(AppContext)
    const [checkoutLoader, setCheckoutLoader] = useState(false)




    const color = "#212427"

    const products = cart.map((element) => { return element.quantity + "x " + element.name + `(${element?.variant?.variant || ""})` + " " })
    const finalProducts = { ...products }
    const [form, setForm] = useState({ firstname: "", lastname: "", email: "", phone: "", address: "", city: "", products: finalProducts })

    useEffect(() => { if (!basicInfo) getBasicInfo() }, [basicInfo, getBasicInfo])




    const totalCal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

    const delivery = Number(basicInfo?.deliveryCharges || 0)
    const total = totalCal + delivery

    const theSubtotal = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })


    const [rotate, setRotate] = useState(false)


    const paypalAmount = total.toFixed(2)


    return (
        <div className='mb-5'>
            {checkoutLoader && <div style={{ position: "fixed", bottom: "-30px", right: "-25px", zIndex: "99999" }}><Spinner /></div>}
            <div className="d-flex justify-content-center my-3">
                <img src={Logo} style={{ width: '80px' }} alt="" />
            </div>
            <div className="container">
                <nav class="navbar">
                    <div class="container-fluid">
                        <div style={{ width: '100%' }} className="d-flex justify-content-between">
                            <div>
                                <button onClick={() => setRotate(rotate ? false : true)} class="navbar-toggler pt-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: 'none' }}>
                                    <p style={{ fontSize: '24px', color: '#a38235', marginBottom: '5px' }}>Show order summary</p>
                                    <i class="fa fa-chevron-down text-center" style={{ color: '#a38235', transform: `rotateZ(${rotate ? '180deg' : '0deg'})`, transition: '0.5s ease' }} aria-hidden="true"></i>
                                </button>
                            </div>
                            <div><h1 style={{ color: color, fontSize: "28px" }} className='pt-3 mx-3'>{theSubtotal}</h1></div>
                        </div>
                    </div>
                </nav>
                <div style={{ borderBottom: '1px solid #dadada' }} class="collapse shadow-3" id="navbarToggleExternalContent">
                    <div class=" px-4">
                        <div>

                            {cart.map((element) => {
                                return <  CheckoutItem element={element} />
                            })}
                        </div>
                        <div className='mt-4' style={{ color: color }}>
                            <div className="d-flex justify-content-between">
                                <p>Subtotal</p>
                                <p>{totalCal.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}</p>
                            </div>
                            <div style={{ borderBottom: '1px solid #dadada' }} className="d-flex justify-content-between">
                                <p>Shipping</p>

                                <p>USD {delivery}</p>


                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <p style={{ fontWeight: "bold" }}>Total</p>
                                <p style={{ fontWeight: "bold" }}>{theSubtotal}</p>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='container-fluid my-3'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div class="mb-3">
                            <p className='my-2' style={{ fontSize: '25px', color: color }} >Contact information</p>
                            <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='Email' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>
                        <div class="mb-3">
                            <p className='my-2' style={{ fontSize: '25px', color: color }} >Shipping address</p>


                            <select required placeholder='Country/Region' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} class="form-select" aria-label="Default select example">
                                <option selected>Pakistan</option>


                            </select>

                            <div className="d-flex justify-content-between my-4">
                                <input required value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} placeholder='First Name' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />
                                <input required value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} placeholder='Last Name' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />
                            </div>
                            <div className="d-flex  my-4">
                                <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder='Address' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />

                            </div>
                            <div className="d-flex justify-content-between my-4">
                                <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder='City' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />
                                <input required placeholder='Postal Code' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />
                            </div>
                            <div className="d-flex  my-4">
                                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder='WhatsApp Number' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />

                            </div>



                        </div>
                        <div>
                            <p className='my-2' style={{ fontSize: '25px', color: color }} >Payment method</p>
                            <div style={{ border: '1px solid #dadada', borderRadius: '0.375rem', paddingBottom: '10px' }} class="form-check d-flex justify-content-between">
                                <div style={{ marginLeft: ' -22px', marginTop: '7px' }}>
                                    <i style={{ color: color }} class="fa fa-check-circle mx-2" aria-hidden="true"></i>
                                    <label style={{ color: color }} class="form-check-label" for="flexRadioDefault2">

                                        Online Payment
                                    </label>
                                </div>

                            </div>
                        </div>



                        <div className="d-flex justify-content-between my-3">


                            <button onClick={() => history.goBack()} style={{ padding: '16.5px', backgroundColor: '#ffffff', border: '1px solid #000000', color: color }} className="btn"><i className="fa fa-chevron-left px-2" aria-hidden="true"></i>Return</button>
                            <button onClick={async (e) => { e.preventDefault(); try { setCheckoutLoader(true); const { url } = await createStripeSession({ items: cart, deliveryCharges: delivery }); window.location.href = url; } catch (err) { setCheckoutLoader(false); alert('Failed to start checkout') } }} disabled={checkoutLoader} style={{ padding: '16.5px', backgroundColor: color, color: 'white' }} className="btn">Proceed</button>
                        </div>

                        <PayPalButtons
                            style={{ disableMaxWidth: true }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: "USD",
                                                value: paypalAmount,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    console.log("Payment successful:", details);

                                    // OPTIONAL: send order info to backend
                                    // save order, clear cart, redirect, etc.

                                    alert(`Payment completed by ${details.payer.name.given_name}`);
                                });
                            }}
                            onError={(err) => {
                                console.error("PayPal Error:", err);
                                alert("PayPal payment failed");
                            }}
                        />


                    </form>
                </div>
            </div>
        </div>
    )
}