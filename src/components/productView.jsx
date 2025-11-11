import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Varients from './varients'
import AppContext from './context/appContext'
import ResizePlugin from './resizePlugin'
import MutationPlugin from './mutationPlugin'
import ThumbnailPlugin from './thumbnailPlugin'
import PrescriptionModal from './prescriptionModal'

const priceConverter = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

export default function ProductView() {
  const { productid } = useParams()
  const { products, addProduct } = useContext(AppContext)
  const product = useMemo(() => products.find(p => String(p._id) === String(productid)), [products, productid])

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({ initial: 0 }, [ResizePlugin])
  const [thumbnailRef] = useKeenSlider({
    initial: 0,
    slides: { origin: 'center', perView: 4, spacing: 10 },
  }, [ThumbnailPlugin(instanceRef), ResizePlugin, MutationPlugin])

  useEffect(() => { if (product?.variants?.length) setSelectedSize(product.variants[0]) }, [product])
  if (!product) return (<><Header /><div className="container py-5">Loading...</div><Footer /></>)

  const color = '#212427'
  const unitPrice = selectedSize ? selectedSize.price : product.price

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-6">
            <div>
              <style>{`
                .thumbnail .keen-slider__slide img { border: 2px solid transparent; border-radius: 6px; }
                .thumbnail .keen-slider__slide.active img { border-color: #ec8c97; }
              `}</style>
              <div ref={sliderRef} className="keen-slider" style={{ display: 'flex', alignItems: 'center' }}>
                {product.assets?.map((a, i) => (
                  <div className="keen-slider__slide number-slide" key={i}>
                    <div className="d-flex justify-content-center" style={{ position: 'absolute', zIndex: 2, opacity: imgLoaded ? 0 : 1, alignItems: 'center', width: '100%', height: '100%' }}>
                      <div className="spinner-border text-warning" role="status" />
                    </div>
                    <div className="position-relative" style={{ width: '100%', paddingBottom: '100%', backgroundColor: '#ffffff' }}>
                      <img onLoad={() => setImgLoaded(true)} src={a.url} alt={product.name} className="position-absolute w-100 h-100" style={{ objectFit: 'contain', top: 0 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div ref={thumbnailRef} className="keen-slider thumbnail \mt-2">
                {product.assets?.length > 1 && product.assets.map((a, i) => (
                  <div className="keen-slider__slide number-slide d-flex align-items-center" key={i}>
                    <img src={a.url} alt={product.name} className="w-100 py-4 px-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h2 style={{ color }}>{product.name}</h2>
            <div className="h4" style={{ color }}>{priceConverter(unitPrice)}</div>

            {product.variants?.length > 0 && (
              <div className="my-3">
                <div className="mb-2" style={{ color }}>Variants</div>
                <Varients sizes={product.variants} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
              </div>
            )}

            <div className="d-flex align-items-center my-3">
              <button className="btn btn-outline-dark" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span className="mx-3 h5 mb-0" style={{ color }}>{quantity}</span>
              <button className="btn btn-outline-dark" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button className="btn top-bg text-white rounded-pill px-3 py-2 border-2 border-light" onClick={() => addProduct(product, quantity, selectedSize)}>Add to cart</button>

            <div className="mt-4" style={{ color }}>
              <div className="fw-semibold mb-2">Description</div>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
        
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Open Prescription
            </button>

            <PrescriptionModal/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}