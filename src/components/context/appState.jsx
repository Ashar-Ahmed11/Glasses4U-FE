import React from 'react'
import AppContext from './appContext'
import { useState } from 'react'
import useLocalStorage from '../useLocalStorage'
import { toast } from 'react-toastify'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000'
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
  const [basicInfo, setBasicInfo] = useState(null)
  const [categories, setCategories] = useState([])
  const [lenses, setLenses] = useState([])

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
        const msg = await res.text()
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

  // Products (BE)
  const fetchAllProductsBE = async () => {
    const res = await fetch(`${API_BASE}/api/products/allproducts`)
    const data = await res.json()
    setProducts(data || [])
    return data
  }
  const fetchSingleProductBE = async (id) => {
    const res = await fetch(`${API_BASE}/api/products/singleproduct/${id}`)
    return await res.json()
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

  // Upload (Cloudinary via backend)
  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('photo', file)
    const res = await fetch(`${API_BASE}/api/sendImg`, { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const data = await res.json()
    return data.url
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

    return (
    <AppContext.Provider value={{ products, setProducts, cart, addProduct, updateProduct, removeProduct, openCart, adminToken, adminLoading, adminLogin, adminLogout, fetchAllProductsBE, fetchSingleProductBE, createProductBE, editProductBE, deleteProductBE, categories, fetchCategories, createCategory, fetchCategoryById, editCategory, deleteCategory, basicInfo, setBasicInfo, getBasicInfo, editBasicInfo, uploadImage, createStripeSession, lenses, fetchLenses, fetchLensById, createLens, editLens, deleteLens }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState