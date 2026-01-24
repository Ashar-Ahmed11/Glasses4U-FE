import React, { useContext } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSlider from '../components/ui/HeroSlider';
import ZCard from '../components/ui/ZCard';
import CardCarousel from '../components/ui/CardCarousel';
import { heroSlides, featuredCards, defenseTiles, frameShapes, under30, featuredSlides } from '../data/homeContent';
import CategorySlider from '../components/categorySlider';
import FeatureIconsRow from '../components/featuredIcons';
import Trust from '../components/trust';
import FeaturedEyewear from '../components/ui/featuredeyewear';
import FeaturedProducts from '../components/ui/FeaturedProducts';
import SecHero from '../components/secHero';
import PromoDuo from '../components/ui/PromoDuo';
import PaymentOptions from '../components/ui/PaymentOptions';
import ShopByPrice from '../components/ui/ShopByPrice';
import { Link } from 'react-router-dom';
import AppContext from '../components/context/appContext';
import TrackOrder from '../components/TrackOrder';
const Home = () => {
    const { products } = useContext(AppContext)
    return (
        <>
            <Header />
            <main>
                <CategorySlider direction={'left'} />
                <HeroSlider slides={heroSlides} />


                <FeatureIconsRow />
                <Trust />
                <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center mb-5" style={{ fontWeight: 900 }}>EYEWEAR FOR EVERYONE         </p>

                <FeaturedEyewear slides={featuredSlides} />

                <section className="top-bg py-5 my-5">

                    <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center mb-5" style={{ fontWeight: 900 }}>BEST SELLERS </p>
                    <FeaturedProducts slides={featuredSlides} />

                </section>
                <ShopByPrice />
                <PromoDuo />
                <SecHero />

            </main>
            <TrackOrder />
            <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center my-5" style={{ fontWeight: 900 }}>SUNGLASSES OF MONTH     </p>

            <FeaturedEyewear slides={featuredSlides} />

            <section className="top-bg py-5 my-5">

                <p data-aos="fade-up" data-aos-duration="1000" className="display-4 text-center mb-5" style={{ fontWeight: 900 }}>SUMMER STYLE </p>
                <FeaturedProducts slides={featuredSlides} />

            </section>
            <PaymentOptions />
            <Footer />
        </>
    )
}

export default Home;
