import React, { useContext, useEffect, useState } from 'react'
import MetaDecorator from './metaDecorator'
import { Link } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'
import AppContext from './context/appContext'
const slugify = (s='') => s.toString().toLowerCase().trim().replace(/[_\s]+/g,'-').replace(/[^a-z0-9-]/g,'').replace(/-+/g,'-')
const Blogs = ({ title, description, showBrand }) => {
    const { posts, fetchPosts } = useContext(AppContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => { try { setLoading(true); await fetchPosts() } finally { setLoading(false) } })()
        // run once on mount to avoid re-trigger from unstable function identity
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        
        <Header />
        <div>
            <MetaDecorator showBrand={showBrand} title={title} description={description} />
            {/* <ContactCarousal pageTitle={title} /> */}
            <section className="position-relative">
        <div className="w-100" style={{ paddingBottom: window.innerWidth > 750 ? '52.941%' : '133.3%' }}>
          <img
            src="http://res.cloudinary.com/dyytzksdp/image/upload/v1769627281/dpms4eeso2prubovpxpd.png?q=80&w=1600&auto=format&fit=crop"
            alt="About Glasses 4U"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 10 }} />
        <div style={{ zIndex: 30 }} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h1 className="display-4 fw-bold">Clear Vision. Confident Style. </h1>
          <p className="lead">Crafting prescription eyewear designed for comfort, clarity, and modern style.
            At Glasses 4U, we believe great vision should be easy, affordable, and effortless. That’s why we create high-quality prescription eyewear that helps you see clearly and feel confident every single day.
          </p>
        </div>
      </section>
            <div style={{ backgroundColor: '#fff' }}>
                <div className="container py-5 text-center text-dark">
                    {/* <h2 className='h5' style={{ textDecoration: 'underline', textUnderlineOffset: "6px", color: '#F4B92D' }}>OUR BLOGS</h2> */}
                    <h2 className='py-2 h4'>Blogs</h2>
                    <h2 className='px-2 blockquote display-6 h1'>The latest blogs of Glasses 4U</h2>
                    {loading ? (
                        <div className="d-flex justify-content-center py-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                    <div className="row" >
                        {(posts || []).map((p) => {
                            const slug = (p.slug && p.slug.length) ? p.slug : slugify(p.metaTitle || p.title || '')
                            return (
                            <div key={p._id} className="col-sm-6 col-lg-4 col-12 my-2 " data-aos="zoom-in-up" data-aos-duration="1000">
                                <Link onClick={() => window.scrollTo({ behavior: 'smooth', top: 0, left: 0 })} to={`/blog/${slug}`} style={{ textDecoration: "none" }}>
                                    <div className="card text-dark rounded-4 h-100 overflow-hidden" style={{ borderColor: "#F4B92D", backgroundColor: "#fff" }}>
                                        {p.image && <img src={p.image} className="card-img-top" alt={p.title || 'blog image'} />}
                                        <div className="card-body justify-content-end d-flex flex-column text-start">
                                            <h2 className="card-title text-secondary h6">
                                                {p.category || 'General'}
                                            </h2>
                                            <h2 className="card-title h5">
                                                {p.title || 'Untitled Post'}
                                            </h2>
                                            <p className="card-text">
                                                {new Date(p.date || Date.now()).toLocaleString()}
                                            </p>
                                        </div>
                                        <div style={{ borderTopColor: "#F4B92D" }} className="card-footer">
                                            <div className='d-flex align-items-center'>
                                                <i className="fa fa-user fa-2x"></i>
                                                <div className='d-flex flex-column px-3'>
                                                    <span className="text-dark text-start">Glasses 4U</span>
                                                    <span className="text-secondary text-start">{new Date(p.date || Date.now()).toDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )})}
                    </div>
                    )}
                </div>
            </div>
        </div >
        <Footer />
        </>
    )
}

export default Blogs