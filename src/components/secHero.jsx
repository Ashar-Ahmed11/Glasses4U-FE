import React from "react";
import "./CuratedStyleHero.css";

const SecHero = () => {
    return (
        <section className="curated-hero top-bg">
            {/* left content */}
            <div className="curated-content">
                <p className="eyebrow">THE</p>
                <h1 className="title">
                    CURATED <br /> STYLE EDIT
                </h1>
                <p className="subtitle">
                    Discover our selection of stylish frames curated for fashion, comfort, and everyday wear.
                </p>
                <button className="shop-btn">Shop now</button>
            </div>

            {/* right people / images */}
            <div className="curated-people">
                {/* person 1 */}
                <img
                    className="person person-left"
                    src="https://img.freepik.com/premium-photo/portrait-handsome-man-with-beard-wearing-glasses-black-jacket_1102944-6693.jpg"
                    alt="Model with glasses"
                />
                {/* person 2 */}
                <img
                    className="person person-middle"
                    src="https://img.freepik.com/premium-photo/minimal-vertical-portrait-handsome-africanamerican-man-wearing-glasses-looking-away-while-pos_236854-33943.jpg"
                    alt="Model with glasses"
                />
                {/* person 3 */}
                <img
                    className="person person-right"
                    src="https://images.pexels.com/photos/18165007/pexels-photo-18165007/free-photo-of-portrait-of-man-in-eyeglasses.jpeg"
                    alt="Model with glasses"
                />

                {/* bottom tag */}
                <div className="bottom-tag">
                    <span className="tag-icon">🏷️</span>
                    <span>Frames</span>
                </div>
            </div>
        </section>
    );
};

export default SecHero;
