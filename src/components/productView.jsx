import React, { useContext, useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'

const priceConverter = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

export default function ProductView() {
  const { productid } = useParams()
  const { addProductWithPrescription, fetchSingleProductBE, addToWishlist, userToken, basicInfo, getBasicInfo, setGlobalLoader } = useContext(AppContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({ initial: 0 }, [ResizePlugin])
  const [thumbnailRef] = useKeenSlider({
    initial: 0,
    slides: { origin: 'center', perView: 4, spacing: 10 },
  }, [ThumbnailPlugin(instanceRef), ResizePlugin, MutationPlugin])

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          setLoading(true); setError(''); setImgLoaded(false)
          setGlobalLoader(true)
          const data = await fetchSingleProductBE(productid)
          if (!mounted) return
          setProduct(data || null)
          if (data?.variants?.length) setSelectedSize(data.variants[0])
        } catch (e) {
          if (mounted) setError('Failed to load product')
        } finally {
          if (mounted) setLoading(false)
          setGlobalLoader(false)
        }
      })()
    return () => { mounted = false }
  }, [productid]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!basicInfo) getBasicInfo() }, []) // load shipping info

  if (loading) return (<><Header /><div className="container py-5">Loading...</div><Footer /></>)
  if (error || !product) return (<><Header /><div className="container py-5">Product not found.</div><Footer /></>)

  const color = '#212427'
  const unitPrice = selectedSize ? selectedSize.price : product.price
  const fs = product?.frameSpecs || {}
  const eta = new Date(Date.now() + 5 * 864e5).toLocaleDateString()
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
              <button
                className="btn top-bg text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                aria-label="Decrease quantity"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="mx-3 h5 mb-0" style={{ color }}>{quantity}</span>
              <button
                className="btn top-bg text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
                aria-label="Increase quantity"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>

            <div className="d-flex gap-2">
              <button className="btn top-bg text-white rounded-pill px-3 py-2 border-2 border-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
              <button
                className="btn btn-outline-dark rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
                disabled={wishLoading}
                onClick={async () => {
                  try {
                    if (!userToken) { toast.error('The User is not logged in.'); return }
                    setWishLoading(true)
                    await addToWishlist(product._id)
                    toast.success('The item is successfully added to wishlist')
                  } catch (e) {
                    toast.error(e.message || 'Failed to add to wishlist')
                  } finally {
                    setWishLoading(false)
                  }
                }}
              >
                {wishLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                {wishLoading ? 'Adding...' : 'Add to wishlist'}
              </button>
            </div>

            {/* Meta info block */}
            <div className="mt-3 py-3 px-2 px-md-3">
              <div className="d-flex align-items-center gap-3 mb-2">
                <span className="badge bg-success px-3 py-2 fs-6">In Stock</span>
                {/* <div className="fs-6">
                  <span className="text-warning me-2"><i className="fa fa-star" /></span>
                  <span className="fw-semibold" style={{ color }}>4.7</span>
                  <span className="text-muted"> (1,248)</span>
                </div> */}
                <div className="fs-6">
                <span className="text-warning me-2"><i className="fa fa-star" /></span>
                <span className="text-warning me-2"><i className="fa fa-star" /></span>
                <span className="text-warning me-2"><i className="fa fa-star" /></span>

                  {/* <span className="fw-semibold text-dark"></span> */}
                  <small className="text-muted">Top Rated</small>
                </div>
              </div>
              <div className="text-muted mt-2 fs-6 d-flex align-items-center">
                <i className="fa fa-truck fa-lg me-2" />
                Delivery: Full Protection · Shipping {priceConverter(Number(basicInfo?.deliveryCharges || 0))}
              </div>
              <div className="d-flex flex-wrap gap-4 text-muted mt-3 fs-6">
                <span className="d-inline-flex align-items-center"><i className="fa fa-check-circle fa-lg me-2" />Premium Quality</span>
                <span className="d-inline-flex align-items-center"><i className="fa fa-undo fa-lg me-2" />24/7 Support</span>
                <span className="d-inline-flex align-items-center"><i className="fa fa-lock fa-lg me-2" />Secure checkout</span>
              </div>
            </div>

            <PrescriptionModal onComplete={(payload) => addProductWithPrescription(product, quantity, selectedSize, payload)} />
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