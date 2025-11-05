import React from 'react'
import AppContext from './appContext'
import { useState } from 'react'
import useLocalStorage from '../useLocalStorage'

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
  const [products] = useState(INITIAL_PRODUCTS)
  const [cart, setCart] = useLocalStorage('cart2', [])

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

  return (
    <AppContext.Provider value={{ products, cart, addProduct, updateProduct, removeProduct, openCart }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState