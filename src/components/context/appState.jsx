import React from 'react'
import AppContext from './appContext'
import { useState } from 'react'
import useLocalStorage from '../useLocalStorage'
import { toast } from 'react-toastify'

// const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000'
const API_BASE = process.env.REACT_APP_API_BASE || 'https://glassesex-dot-arched-gear-433017-u9.de.r.appspot.com'
const priceConverter = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

const LOREM = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, debitis. Reprehenderit, illum. Vitae, minus. Nulla laboriosam, dolorum possimus, reiciendis dignissimos aut eaque nihil, consequuntur fuga laudantium repellendus. Aliquid, laborum facilis.</p>'

const INITIAL_PRODUCTS = [
 
  {
    _id: 'p2',
    name: 'Retro Sunglasses',
    price: 3499,
    localePrice: priceConverter(3499),
    assets: [{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' },{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' }],
    description: LOREM,
    variants: [
      { _id: 'v1', variant: 'Standard', price: 3499 },
      { _id: 'v2', variant: 'Polarized', price: 3999 },
      { _id: 'v3', variant: 'Premium', price: 4299 },
    ],
  },
  {
    _id: 'p3',
    name: 'Retro Sunglasses',
    price: 3499,
    localePrice: priceConverter(3499),
    assets: [{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' },{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' }],
    description: LOREM,
    variants: [
      { _id: 'v1', variant: 'Standard', price: 3499 },
      { _id: 'v2', variant: 'Polarized', price: 3999 },
      { _id: 'v3', variant: 'Premium', price: 4299 },
    ],
  },
  {
    _id: 'p4',
    name: 'Retro Sunglasses',
    price: 3499,
    localePrice: priceConverter(3499),
    assets: [{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' },{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' }],
    description: LOREM,
    variants: [
      { _id: 'v1', variant: 'Standard', price: 3499 },
      { _id: 'v2', variant: 'Polarized', price: 3999 },
      { _id: 'v3', variant: 'Premium', price: 4299 },
    ],
  },
  {
    _id: 'p5',
    name: 'Retro Sunglasses',
    price: 3499,
    localePrice: priceConverter(3499),
    assets: [{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' },{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' }],
    description: LOREM,
    variants: [
      { _id: 'v1', variant: 'Standard', price: 3499 },
      { _id: 'v2', variant: 'Polarized', price: 3999 },
      { _id: 'v3', variant: 'Premium', price: 4299 },
    ],
  },
  {
    _id: 'p6',
    name: 'Retro Sunglasses',
    price: 3499,
    localePrice: priceConverter(3499),
    assets: [{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' },{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' }],
    description: LOREM,
    variants: [
      { _id: 'v1', variant: 'Standard', price: 3499 },
      { _id: 'v2', variant: 'Polarized', price: 3999 },
      { _id: 'v3', variant: 'Premium', price: 4299 },
    ],
  },
  {
    _id: 'p7',
    name: 'Retro Sunglasses',
    price: 3499,
    localePrice: priceConverter(3499),
    assets: [{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' },{ url: 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*' }],
    description: LOREM,
    variants: [
      { _id: 'v1', variant: 'Standard', price: 3499 },
      { _id: 'v2', variant: 'Polarized', price: 3999 },
      { _id: 'v3', variant: 'Premium', price: 4299 },
    ],
  },
  

]

const AppState = (props) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [cart, setCart] = useLocalStorage('cart2', [])
  const [adminToken, setAdminToken] = useState(localStorage.getItem('auth-token') || '')
  const [adminLoading, setAdminLoading] = useState(false)
  const [userToken, setUserToken] = useState(localStorage.getItem('user-token') || '')
  const [user, setUser] = useState(null)
  const [basicInfo, setBasicInfo] = useState(null)
  const [categories, setCategories] = useState([])
  const [lenses, setLenses] = useState([])
  const [globalLoader, setGlobalLoader] = useState(false)

  // helper to extract validator / server errors nicely
  const extractError = async (res, fallback = 'Request failed') => {
    try {
      const data = await res.clone().json()
      if (Array.isArray(data?.errors) && data.errors.length) {
        return data.errors.map((e) => e.msg).join('\n')
      }
      if (data?.message) return data.message
      if (typeof data === 'string') return data
    } catch (_) {
      // ignore json parse error
    }
    try {
      const text = await res.text()
      return text || fallback
    } catch {
      return fallback
    }
  }

  const addProduct = (product, quantity, selectedSize) => {
    const itemId = selectedSize ? `${product._id}${selectedSize._id}` : product._id
    const existing = cart.find((e) => e.id === itemId)
    if (existing) {
      const updated = cart.map((e) => (e.id === itemId ? { ...e, quantity: e.quantity + quantity } : e))
      setCart(updated)
    } else {
      const unitPrice = selectedSize ? selectedSize.price : product.price
      setCart([
        ...cart,
        {
          id: itemId,
          name: product.name,
          image: product.assets?.[0]?.url || 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*',
          price: unitPrice,
          localePrice: priceConverter(unitPrice),
          quantity,
          variant: selectedSize || null,
        },
      ])
    }
          openCart()
  }

  // Add product with prescription, lens and coating
  const addProductWithPrescription = (product, quantity, selectedSize, prescription) => {
    const lensId = prescription?.lens?.id || 'nolens'
    const coatingKey = prescription?.coating?.key || 'nocoat'
    const sizeKey = selectedSize ? selectedSize._id : 'base'
    // Build a stable key from prescription values so any change makes a unique cart line
    const rx = prescription?.prescription || {}
    const rxKey = [
      `rx:${prescription?.rxType || ''}`,
      `lt:${prescription?.lensType || ''}`,
      `od:${[rx?.od?.sph, rx?.od?.cyl, rx?.od?.axis, rx?.od?.add].map((v) => v ?? '').join(',')}`,
      `os:${[rx?.os?.sph, rx?.os?.cyl, rx?.os?.axis, rx?.os?.add].map((v) => v ?? '').join(',')}`,
      `pd:${rx?.hasTwoPD ? [rx?.pd?.right ?? '', rx?.pd?.left ?? ''].join(',') : (rx?.pd ?? '')}`,
    ].join('|')
    const itemId = `${product._id}|${sizeKey}|${lensId}|${coatingKey}|${rxKey}`
    const basePrice = selectedSize ? selectedSize.price : product.price
    const lensPrice = Number(prescription?.lens?.price || 0)
    const coatingPrice = Number(prescription?.coating?.price || 0)
    const unitPrice = Number(basePrice) + lensPrice + coatingPrice

    const existing = cart.find((e) => e.id === itemId)
    if (existing) {
      const updated = cart.map((e) => (e.id === itemId ? { ...e, quantity: e.quantity + quantity } : e))
      setCart(updated)
    } else {
      setCart([
        ...cart,
        {
          id: itemId,
          name: product.name,
          image: product.assets?.[0]?.url || 'https://static.zennioptical.com/production/products/general/19/54/195421-eyeglasses-front-view.jpg?output-quality=90&resize=500px:*',
          price: unitPrice,
          localePrice: priceConverter(unitPrice),
          quantity,
          variant: selectedSize || null,
          prescription, // include full details for order creation
        },
      ])
    }
          openCart()
  }

  const updateProduct = (item, quantity) => {
    if (quantity < 1) {
      setCart(cart.filter((e) => e.id !== item.id))
      return
    }
    setCart(cart.map((e) => (e.id === item.id ? { ...e, quantity } : e)))
  }

  // Admin Auth
  const adminLogin = async ({ username, password }) => {
    try {
      setAdminLoading(true)
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const msg = await extractError(res, 'Login failed')
        throw new Error(msg || 'Login failed')
      }
      const data = await res.json()
      localStorage.setItem('auth-token', data.authToken)
      setAdminToken(data.authToken)
      toast.success('Logged in successfully')
      return true
    } catch (e) {
      toast.error(e.message)
      return false
    } finally {
      setAdminLoading(false)
    }
  }

  const adminLogout = () => {
    localStorage.removeItem('auth-token')
    setAdminToken('')
    toast.info('Logged out')
  }

  // User Auth
  const userRegister = async ({ firstName, lastName, email, password }) => {
    try {
      setAdminLoading(true)
      const name = `${firstName} ${lastName}`.trim()
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const msg = await extractError(res, 'Registration failed')
        throw new Error(msg || 'Registration failed')
      }
      const data = await res.json()
      localStorage.setItem('user-token', data.authToken)
      setUserToken(data.authToken)
      toast.success('Registered successfully')
      return true
    } catch (e) {
      toast.error(e.message)
      return false
    } finally {
      setAdminLoading(false)
    }
  }
  const userLogin = async ({ email, password }) => {
    try {
      setAdminLoading(true)
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const msg = await extractError(res, 'Login failed')
        throw new Error(msg || 'Login failed')
      }
      const data = await res.json()
      localStorage.setItem('user-token', data.authToken)
      setUserToken(data.authToken)
      toast.success('Logged in')
      return true
    } catch (e) {
      toast.error(e.message)
      return false
    } finally {
      setAdminLoading(false)
    }
  }
  const userLogout = () => {
    localStorage.removeItem('user-token')
    setUserToken('')
    setUser(null)
    toast.info('Logged out')
  }
  const getUser = async () => {
    if (!userToken) return null
    const res = await fetch(`${API_BASE}/api/users/me`, { headers: { 'auth-token': userToken } })
    if (!res.ok) return null
    const data = await res.json()
    setUser(data)
    return data
  }
  const updateUser = async (payload) => {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const msg = await extractError(res, 'Update failed')
      throw new Error(msg)
    }
    const data = await res.json()
    setUser(data)
    toast.success('Profile updated')
    return data
  }
  const addToWishlist = async (productId) => {
    const res = await fetch(`${API_BASE}/api/users/wishlist/${productId}`, { method: 'POST', headers: { 'auth-token': userToken } })
    if (!res.ok) throw new Error('Add to wishlist failed')
    const data = await res.json()
    setUser(data)
    toast.success('Added to wishlist')
    return data
  }
  const removeFromWishlist = async (productId) => {
    const res = await fetch(`${API_BASE}/api/users/wishlist/${productId}`, { method: 'DELETE', headers: { 'auth-token': userToken } })
    if (!res.ok) throw new Error('Remove from wishlist failed')
    const data = await res.json()
    setUser(data)
    toast.info('Removed from wishlist')
    return data
  }
  const getUserOrders = async (userId) => {
    const res = await fetch(`${API_BASE}/api/orders/user/${userId}`)
    if (!res.ok) throw new Error('Fetch user orders failed')
    return await res.json()
  }

  // Products (BE)
  const fetchAllProductsBE = async () => {
    const res = await fetch(`${API_BASE}/api/products/allproducts`)
    const data = await res.json()
    const mapped = (data || []).map((p) => ({
      ...p,
      localePrice: priceConverter(Number(p?.price || 0)),
    }))
    setProducts(mapped)
    return mapped
  }
  const fetchSingleProductBE = async (id) => {
    const res = await fetch(`${API_BASE}/api/products/singleproduct/${id}`)
    return await res.json()
  }
  const fetchProductsByCategoryId = async (categoryId) => {
    const res = await fetch(`${API_BASE}/api/products/bycategory/${categoryId}`)
    const data = await res.json()
    return (data || []).map((p) => ({ ...p, localePrice: priceConverter(Number(p?.price || 0)) }))
            }
  const fetchProductsByCategorySlug = async (slug) => {
    const res = await fetch(`${API_BASE}/api/products/bycategoryslug/${slug}`)
    const data = await res.json()
    return (data || []).map((p) => ({ ...p, localePrice: priceConverter(Number(p?.price || 0)) }))
  }
  const fetchHomePreviewProducts = async () => {
    const res = await fetch(`${API_BASE}/api/products/homepreview`)
    const data = await res.json()
    return (data || []).map((p) => ({ ...p, localePrice: priceConverter(Number(p?.price || 0)) }))
  }
  const createProductBE = async (payload) => {
    const res = await fetch(`${API_BASE}/api/products/createproduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Create product failed')
    return await res.json()
  }
  const editProductBE = async (id, payload) => {
    const res = await fetch(`${API_BASE}/api/products/editproduct/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Edit product failed')
    return await res.json()
  }
  const deleteProductBE = async (id) => {
    const res = await fetch(`${API_BASE}/api/products/deleteproduct/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': adminToken },
    })
    if (!res.ok) throw new Error('Delete product failed')
    return await res.json()
  }

  // Categories (BE via /api/getdata)
  const fetchCategories = async () => {
    const res = await fetch(`${API_BASE}/api/getdata/getcategories`)
    const data = await res.json()
    setCategories(data || [])
    return data
  }
  const createCategory = async (payload) => {
    const body = typeof payload === 'string' ? { mainHeading: payload } : payload
    const res = await fetch(`${API_BASE}/api/getdata/createcategory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('Create category failed')
    const data = await res.json()
    setCategories(data)
    toast.success('Category created')
    return data
  }
  const fetchCategoryById = async (id) => {
    const res = await fetch(`${API_BASE}/api/getdata/getcategory/${id}`)
    if (!res.ok) throw new Error('Fetch category failed')
    return await res.json()
  }
  const fetchCategoryBySlug = async (slug) => {
    const res = await fetch(`${API_BASE}/api/getdata/getcategory/slug/${slug}`)
    if (!res.ok) throw new Error('Fetch category failed')
    return await res.json()
  }
  const editCategory = async (id, payload) => {
    const res = await fetch(`${API_BASE}/api/getdata/editcategory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Edit category failed')
    const data = await res.json()
    toast.success('Category updated')
    return data
  }
  const deleteCategory = async (id) => {
    const res = await fetch(`${API_BASE}/api/getdata/deletecategory/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': adminToken },
    })
    if (!res.ok) throw new Error('Delete category failed')
    const data = await res.json()
    setCategories(data)
    toast.info('Category deleted')
    return data
  }

  // Basic Info
  const getBasicInfo = async () => {
    const res = await fetch(`${API_BASE}/api/basicInfo/getInfo`)
    const data = await res.json()
    setBasicInfo(data)
    return data
  }
  const editBasicInfo = async () => {
    const res = await fetch(`${API_BASE}/api/basicInfo/editInfo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(basicInfo),
    })
    if (!res.ok) {
      const msg = await res.text()
      throw new Error(msg || 'Update failed')
      }
    const data = await res.json()
    setBasicInfo(data)
    toast.success('Basic info updated')
    return data
  }

  // Stripe checkout
  const createStripeSession = async ({ items, deliveryCharges }) => {
    const res = await fetch(`${API_BASE}/api/stripe/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((it) => ({ name: it.name, quantity: it.quantity, price: it.price, image: it.image })),
        deliveryCharges: deliveryCharges || 0,
        currency: 'usd',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/failed`,
      }),
    })
    if (!res.ok) throw new Error('Stripe session failed')
    return await res.json()
  }

  const removeProduct = (item) => setCart(cart.filter((e) => e.id !== item.id))

      const openCart = () => {
    const el = document.getElementById('staticBackdrop')
    const bs = window?.bootstrap
    if (el && bs?.Offcanvas) {
      bs.Offcanvas.getOrCreateInstance(el).show()
    } else {
      const trigger = document.querySelector('[data-bs-target="#staticBackdrop"]')
      if (trigger) trigger.click()
      }
  }

  // Upload (direct to Cloudinary)
  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', 'dga8po59')
    const res = await fetch('https://api.cloudinary.com/v1_1/dextrzp2q/image/upload', {
      method: 'POST',
      body: fd,
    })
    if (!res.ok) throw new Error('Upload failed')
    const data = await res.json()
    return data.secure_url || data.url
  }

  // Lenses
  const fetchLenses = async (filters = {}) => {
    const qs = new URLSearchParams(filters).toString()
    const res = await fetch(`${API_BASE}/api/lenses${qs ? `?${qs}` : ''}`)
    const data = await res.json()
    setLenses(Array.isArray(data) ? data : [])
    return data
  }
  const fetchLensById = async (id) => {
    const res = await fetch(`${API_BASE}/api/lenses/${id}`)
    return await res.json()
  }
  const createLens = async (payload) => {
    const res = await fetch(`${API_BASE}/api/lenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Create lens failed')
    const data = await res.json()
    toast.success('Lens created')
    return data
  }
  const editLens = async (id, payload) => {
    const res = await fetch(`${API_BASE}/api/lenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Edit lens failed')
    const data = await res.json()
    toast.success('Lens updated')
    return data
  }
  const deleteLens = async (id) => {
    const res = await fetch(`${API_BASE}/api/lenses/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': adminToken },
    })
    if (!res.ok) throw new Error('Delete lens failed')
    toast.info('Lens deleted')
    return true
  }

  // Orders
  const createOrder = async (payload) => {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const msg = await res.text()
      throw new Error(msg || 'Create order failed')
    }
    return await res.json()
  }
  const clearCart = () => setCart([])

  // Orders (Admin)
  const fetchOrders = async () => {
    const res = await fetch(`${API_BASE}/api/orders`)
    if (!res.ok) throw new Error('Fetch orders failed')
    return await res.json()
  }
  const updateOrderStatus = async (id, status) => {
    const res = await fetch(`${API_BASE}/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': adminToken },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) throw new Error('Update status failed')
    return await res.json()
  }
  const fetchOrderByTracking = async (trackingId) => {
    const res = await fetch(`${API_BASE}/api/orders/track/${trackingId}`)
    if (!res.ok) throw new Error('Order not found')
    return await res.json()
  }

    return (
    <AppContext.Provider value={{ products, setProducts, cart, addProduct, addProductWithPrescription, updateProduct, removeProduct, openCart, clearCart, adminToken, adminLoading, adminLogin, adminLogout, userToken, user, userRegister, userLogin, userLogout, getUser, updateUser, addToWishlist, removeFromWishlist, getUserOrders, fetchAllProductsBE, fetchSingleProductBE, fetchProductsByCategoryId, fetchProductsByCategorySlug, fetchHomePreviewProducts, createProductBE, editProductBE, deleteProductBE, categories, fetchCategories, createCategory, fetchCategoryById, fetchCategoryBySlug, editCategory, deleteCategory, basicInfo, setBasicInfo, getBasicInfo, editBasicInfo, uploadImage, createStripeSession, lenses, fetchLenses, fetchLensById, createLens, editLens, deleteLens, createOrder, fetchOrders, updateOrderStatus, fetchOrderByTracking, globalLoader, setGlobalLoader }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState