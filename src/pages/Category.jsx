import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AppContext from '../components/context/appContext';
import ProductCard from '../components/ui/productCard';
import CategoryCarousel from '../components/ui/CategoryCarousel';

const Category = () => {
  const { id } = useParams()
  const { fetchCategoryById, fetchProductsByCategoryId } = useContext(AppContext)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [catProducts, setCatProducts] = useState([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const cat = await fetchCategoryById(id)
        const prods = await fetchProductsByCategoryId(id)
        if (!mounted) return
        setCategory(cat)
        setCatProducts(prods || [])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div className="container py-5 text-center"><div className="spinner-border text-dark" role="status"><span className="visually-hidden">Loading...</span></div></div>
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero / Carousel */}
        <section className="top-bg">{category?.coverImage ? <CategoryCarousel imageUrl={category.coverImage} heading={category?.mainHeading} /> : null}</section>

        {/* Headings (basic) */}
        <div className="container my-4">
          <h2 className="text-center fw-bold mb-3">{category?.mainHeading}</h2>
        </div>

        {/* Products grid */}
        <section className="container my-4">
          <div className="row">
            {catProducts.map((p) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={p._id}>
                <ProductCard product={p} to={`/product/${p._id}`} />
              </div>
            ))}
            {!catProducts.length && (
              <div className="col-12 text-center py-5 text-muted">No products found in this category.</div>
            )}
          </div>
        </section>

        {/* Jodit Description */}
        {category?.categoryDescription ? (
          <section className="container my-5">
            <div className="card border-0 p-3">
              <div dangerouslySetInnerHTML={{ __html: category.categoryDescription }} />
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}

export default Category;
