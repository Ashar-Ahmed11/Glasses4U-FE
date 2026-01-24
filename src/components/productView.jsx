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
  const { addProductWithPrescription, fetchSingleProductBE } = useContext(AppContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({ initial: 0 }, [ResizePlugin])
  const [thumbnailRef] = useKeenSlider({
    initial: 0,
    slides: { origin: 'center', perView: 4, spacing: 10 },
  }, [ThumbnailPlugin(instanceRef), ResizePlugin, MutationPlugin])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true); setError(''); setImgLoaded(false)
        const data = await fetchSingleProductBE(productid)
        if (!mounted) return
        setProduct(data || null)
        if (data?.variants?.length) setSelectedSize(data.variants[0])
      } catch (e) {
        if (mounted) setError('Failed to load product')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [productid]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return (<><Header /><div className="container py-5">Loading...</div><Footer /></>)
  if (error || !product) return (<><Header /><div className="container py-5">Product not found.</div><Footer /></>)

  const color = '#212427'
  const unitPrice = selectedSize ? selectedSize.price : product.price
  const fs = product?.frameSpecs || {}
  const specRows = [
    { label: 'Lens Width', value: fs.lensWidth ? `${fs.lensWidth} mm` : '' },
    { label: 'Nose Bridge', value: fs.noseBridge ? `${fs.noseBridge} mm` : '' },
    { label: 'Temple Arm', value: fs.templeArm ? `${fs.templeArm} mm` : '' },
    { label: 'Size', value: fs.size || '' },
    { label: 'Color', value: fs.color || '' },
    { label: 'Shape', value: fs.shape || '' },
    { label: 'Material', value: fs.material || '' },
  ].filter(r => r.value)

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
                    <div className="position-relative product-main-frame" style={{ width: '100%', backgroundColor: '#ffffff' }}>
                      <img onLoad={() => setImgLoaded(true)} src={a.url} alt={product.name} className="position-absolute w-100 h-100" style={{ objectFit: 'contain', top: 0 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div ref={thumbnailRef} className="keen-slider thumbnail \mt-2">
                {product.assets?.length > 1 && product.assets.map((a, i) => (
                  <div className="keen-slider__slide number-slide d-flex align-items-center" key={i}>
                    <img src={a.url} alt={product.name} className="w-100 px-2 py-4 py-md-2" />
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

            <button className="btn top-bg text-white rounded-pill px-3 py-2 border-2 border-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
        
            <PrescriptionModal onComplete={(payload) => addProductWithPrescription(product, quantity, selectedSize, payload)}/>
          </div>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <h5 className="mb-3">Description</h5>
            <div className="card border-0 p-3 bg-light">
              <div style={{ color }} dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="mb-3">More Information</h5>
            <div className="card border-0">
              <ul className="list-group list-group-flush">
                {specRows.map((row, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between bg-light">
                    <span className="text-muted">{row.label}</span>
                    <span className="fw-semibold">{row.value}</span>
                  </li>
                ))}
                {specRows.length === 0 && (
                  <li className="list-group-item text-muted">No additional information.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}