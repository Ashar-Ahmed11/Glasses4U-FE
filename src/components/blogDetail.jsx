import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from './context/appContext'
import MetaDecorator from './metaDecorator'
import Header from './layout/Header'
import Footer from './layout/Footer'

const BlogDetail = () => {
    const { slug } = useParams()
    const { fetchPostBySlug } = useContext(AppContext)
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try { const data = await fetchPostBySlug(slug); setPost(data) } finally { setLoading(false) }
        })()
        // limit deps to slug; context function identity can be unstable
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug])

    if (loading) return (
        <div style={{ backgroundColor: '#fff', minHeight: '60vh' }} className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
    if (!post) return <div className="text-center text-dark py-5" style={{ backgroundColor: '#fff', minHeight: '50vh' }}>Not found</div>

    return (
        <>
        <Header />
        <div style={{ backgroundColor: '#fff' }}>
            <MetaDecorator title={post.metaTitle || post.title || 'Blog'} description={post.metaDescription || 'Blog article'} />
            {post.image && (
              <section className="position-relative">
                <div className="w-100" style={{ paddingBottom: window.innerWidth > 750 ? '35%' : '66.6%' }}>
                  <img src={post.image} alt={post.title} className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover' }} />
                </div>
                <div className="shade w-100 h-100" style={{ zIndex: 20, position: 'absolute', inset: 0 }} />
                <div style={{ zIndex: 30 }} className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
                  <h1 className="display-5 fw-bold">{post.title}</h1>
                  <div className="mt-2">{new Date(post.date || Date.now()).toLocaleString()} • {post.category || 'General'}</div>
                </div>
              </section>
            )}
            <div className="container text-dark">
                
                            {!post.image && (
                              <>
                                <h1 className="">{post.title}</h1>
                                <div className="text-secondary mb-3">{new Date(post.date || Date.now()).toLocaleString()} • {post.category || 'General'}</div>
                              </>
                            )}
                            <div className="card bg-transparent border-0">
                                <div className="card-body px-0" dangerouslySetInnerHTML={{ __html: post.description || '' }} />
                            
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default BlogDetail


