import React, { useContext, useState, useEffect } from 'react'
import Logo from './logo.png'
import CheckoutItem from './checkoutItem'
import Spinner from './spinner'
import { toast } from 'react-toastify'
import AppContext from './context/appContext'
// import { PayPalButton } from 'react-paypal-button-v2'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useHistory } from 'react-router-dom'
const COUNTRIES = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
    'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
    'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
    'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica',
    'Cote d’Ivoire','Croatia','Cuba','Cyprus','Czechia','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic',
    'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland',
    'France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea',
    'Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq',
    'Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait',
    'Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg',
    'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico',
    'Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru',
    'Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman',
    'Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar',
    'Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia',
    'Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa',
    'South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan',
    'Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan',
    'Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City',
    'Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
]
export default function Checkout() {


    const history = useHistory()
    const { basicInfo, cart, createStripeSession, getBasicInfo, createOrder, clearCart, getUser, userToken, sendOrderEmail } = useContext(AppContext)
    const [checkoutLoader, setCheckoutLoader] = useState(false)
    const [rxItem, setRxItem] = useState(null)
    const RX_LABEL = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
    const LT_LABEL = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun' }
    const openRx = (item) => {
        setRxItem(item)
        const el = document.getElementById('checkoutRxModal')
        const bs = window?.bootstrap
        if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
    }




    const color = "#212427"

    const products = cart.map((element) => { return element.quantity + "x " + element.name + `(${element?.variant?.variant || ""})` + " " })
    const finalProducts = { ...products }
    const [form, setForm] = useState({ firstname: "", lastname: "", email: "", phone: "", address: "", city: "", country: "", postalCode: "", products: finalProducts })

    useEffect(() => { if (!basicInfo) getBasicInfo() }, [basicInfo, getBasicInfo])
    // Prefill from logged-in user's general info
    useEffect(() => {
        (async () => {
            if (!userToken) return
            const u = await getUser()
            if (!u) return
            setForm((prev) => ({
                ...prev,
                firstname: prev.firstname || (u.name ? String(u.name).split(' ')[0] : ''),
                lastname: prev.lastname || (u.name ? String(u.name).split(' ').slice(1).join(' ') : ''),
                email: prev.email || u.email || '',
                phone: prev.phone || u.phone || '',
                address: prev.address || u.address || '',
                city: prev.city || u.city || '',
                country: prev.country || u.country || '',
                postalCode: prev.postalCode || u.postalCode || '',
            }))
        })()
    }, [userToken, getUser])




    const totalCal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

    const delivery = Number(basicInfo?.deliveryCharges || 0)
    const total = totalCal + delivery

    const theSubtotal = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })


    const [rotate, setRotate] = useState(false)


    const paypalAmount = total.toFixed(2)
    const isFormValid = [form.firstname, form.lastname, form.email, form.phone, form.address, form.city, form.country].every((v) => String(v || '').trim() !== '')
    const openPayPal = () => {
        if (!isFormValid) return
        const el = document.getElementById('paypalModal')
        const bs = window?.bootstrap
        if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).show()
    }


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
                                return <  CheckoutItem key={element.id} element={element} onViewPrescription={openRx} />
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


                            <select required value={form.country || ''} onChange={(e) => setForm({ ...form, country: e.target.value })} class="form-select" style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }}>
                                <option value="" disabled>Select Country</option>
                                {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
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
                                <input required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} placeholder='Postal Code' style={{ backgroundColor: '#ffffff', borderColor: "#dedede", color: 'black' }} type="text" class="form-control mx-1" />
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
                            <button onClick={(e) => { e.preventDefault(); openPayPal() }} disabled={checkoutLoader || !isFormValid} style={{ padding: '16.5px', backgroundColor: color, color: 'white' }} className="btn">Proceed</button>
                        </div>

                        {/* PayPal Modal */}
                        <div className="modal fade" id="paypalModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Complete Payment</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
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
                                                return actions.order.capture().then(async (details) => {
                                                    try {
                                                        const currentUser = userToken ? await getUser() : null
                                                        const productsPayload = cart.map((item) => {
                                                            const productId = String(item.id || '').split('|')[0]
                                                            return {
                                                                product: productId || undefined,
                                                                prescription: item.prescription || null,
                                                                quantity: item.quantity,
                                                                lens: item.prescription?.lens?.id || null,
                                                                coating: { enum: item.prescription?.coating?.key || 'none', price: Number(item.prescription?.coating?.price || 0) },
                                                            }
                                                        })
                                                        const orderPayload = {
                                                            name: `${form.firstname} ${form.lastname}`.trim(),
                                                            email: form.email,
                                                            products: productsPayload,
                                                            subtotal: Number(totalCal.toFixed(2)),
                                                            deliveryCharges: Number(delivery),
                                                            total: Number((totalCal + delivery).toFixed(2)),
                                                            country: form.country || '',
                                                            city: form.city,
                                                            phone: form.phone,
                                                            address: form.address,
                                                            postalCode: form.postalCode || '',
                                                            user: currentUser?._id || undefined,
                                                            status: 'Pending Approval',
                                                        }
                                                        toast.success('Payment Successful, Please Wait!')
                                                        // fire email in parallel, chained to order result for tracking id
                                                        const createPromise = createOrder(orderPayload)
                                                        createPromise.then((saved) => {
                                                            const emailPayload = {
                                                                email: form.email,
                                                                name: `${form.firstname} ${form.lastname}`.trim(),
                                                                phone: form.phone,
                                                                address: form.address,
                                                                city: form.city,
                                                                country: form.country || '',
                                                                postalCode: form.postalCode || '',
                                                                trackingId: saved?.trackingId || '',
                                                                status: 'Pending Approval',
                                                                subtotal: Number(totalCal.toFixed(2)),
                                                                deliveryCharges: Number(delivery),
                                                                total: Number((totalCal + delivery).toFixed(2)),
                                                                items: cart.map((it) => ({
                                                                    name: it.name,
                                                                    image: it.image,
                                                                    quantity: it.quantity,
                                                                    unitPrice: it.price,
                                                                    prescription: it.prescription || null,
                                                                })),
                                                            }
                                                            sendOrderEmail(emailPayload)
                                                            const adminEmailPayload = {
                                                                email: "kashanshahbaz7@gmail.com",
                                                                customerEmail: form.email,
                                                                name: `${form.firstname} ${form.lastname}`.trim(),
                                                                phone: form.phone,
                                                                address: form.address,
                                                                city: form.city,
                                                                country: form.country || '',
                                                                postalCode: form.postalCode || '',
                                                                trackingId: saved?.trackingId || '',
                                                                status: 'Pending Approval',
                                                                subtotal: Number(totalCal.toFixed(2)),
                                                                deliveryCharges: Number(delivery),
                                                                total: Number((totalCal + delivery).toFixed(2)),
                                                                items: cart.map((it) => ({
                                                                    name: it.name,
                                                                    image: it.image,
                                                                    quantity: it.quantity,
                                                                    unitPrice: it.price,
                                                                    prescription: it.prescription || null,
                                                                })),
                                                            }
                                                            sendOrderEmail(adminEmailPayload)
                                                        })
                                                        const saved = await createPromise
                                                        if (saved?.trackingId) localStorage.setItem('lastTrackingId', String(saved.trackingId))
                                                        clearCart()
                                                        const el = document.getElementById('paypalModal')
                                                        const bs = window?.bootstrap
                                                        if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).hide()
                                                        window.location.href = '/success'
                                                    } catch (err) {
                                                        console.error('Order creation failed:', err)
                                                        alert('Order creation failed')
                                                    }
                                                });
                                            }}
                                            onError={(err) => {
                                                console.error("PayPal Error:", err);
                                                alert("PayPal payment failed");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            {/* Prescription summary modal (Checkout) */}
            <div className="modal fade" id="checkoutRxModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">PRESCRIPTION</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {!rxItem?.prescription ? (
                                <div className="text-muted">No prescription on this item.</div>
                            ) : (
                                <>
                                    <div className="table-responsive mb-4">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr className="text-muted">
                                                    <th style={{ width: '20%' }}></th>
                                                    <th>SPH</th>
                                                    <th>CYL</th>
                                                    <th>Axis</th>
                                                    <th>Add</th>
                                                    <th>PD</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(() => {
                                                    const p = rxItem.prescription
                                                    const singlePD = !p?.prescription?.hasTwoPD
                                                    const pdRight = singlePD ? (p?.prescription?.pd ?? '') : (p?.prescription?.pd?.right ?? '')
                                                    const pdLeft = singlePD ? '' : (p?.prescription?.pd?.left ?? '')
                                                    const od = p?.prescription?.od || {}
                                                    const os = p?.prescription?.os || {}
                                                    const fmtNum = (v, sign = true) => typeof v === 'number' ? `${v >= 0 && sign ? '+' : ''}${v.toFixed(2)}` : 'None'
                                                    const fmtAxis = (v) => typeof v === 'number' ? `${v}` : 'None'
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th className="text-muted">OD-Right</th>
                                                                <td>{fmtNum(od.sph)}</td>
                                                                <td>{fmtNum(od.cyl)}</td>
                                                                <td>{fmtAxis(od.axis)}</td>
                                                                <td>{fmtNum(od.add)}</td>
                                                                {singlePD ? (
                                                                    <td rowSpan="2" className="align-middle text-center">{pdRight}</td>
                                                                ) : (
                                                                    <td>{pdRight}</td>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <th className="text-muted">OS-Left</th>
                                                                <td>{fmtNum(os.sph)}</td>
                                                                <td>{fmtNum(os.cyl)}</td>
                                                                <td>{fmtAxis(os.axis)}</td>
                                                                <td>{fmtNum(os.add)}</td>
                                                                {!singlePD && <td>{pdLeft}</td>}
                                                            </tr>
                                                        </>
                                                    )
                                                })()}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="list-group">
                                        <div className="list-group-item d-flex justify-content-between">
                                            <span className="text-muted">Rx Type</span>
                                            <span>{RX_LABEL[rxItem?.prescription?.rxType] || '—'}</span>
                                        </div>
                                        <div className="list-group-item d-flex justify-content-between">
                                            <span className="text-muted">Lens Type</span>
                                            <span>{LT_LABEL[rxItem?.prescription?.lensType] || '—'}</span>
                                        </div>
                                        <div className="list-group-item d-flex justify-content-between">
                                            <span className="text-muted">Lenses</span>
                                            <span>
                                                {rxItem?.prescription?.lens
                                                    ? `${rxItem.prescription.lens.thickness ?? ''} ${String(rxItem.prescription.lens.title || '').toUpperCase()}${rxItem.prescription.lens.price ? ` + $${Number(rxItem.prescription.lens.price).toFixed(2)}` : ''}`.trim()
                                                    : 'None'}
                                            </span>
                                        </div>
                                        <div className="list-group-item d-flex justify-content-between">
                                            <span className="text-muted">Coating</span>
                                            <span>{rxItem?.prescription?.coating?.title?.toUpperCase?.() || 'None'}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}