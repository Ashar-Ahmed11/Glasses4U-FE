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
                    The trend shop everyone’s eying—and loving.
                </p>
                <button className="shop-btn">Shop now</button>
            </div>

            {/* right people / images */}
            <div className="curated-people">
                {/* person 1 */}
                <img
                    className="person person-left"
                    src="https://thumbs.dreamstime.com/b/middle-aged-white-man-glasses-smiling-to-camera-vertical-85215429.jpg"
                    alt="Model with glasses"
                />
                {/* person 2 */}
                <img
                    className="person person-middle"
                    src="https://thumbs.dreamstime.com/b/cool-handsome-guy-glasses-beard-52415143.jpg"
                    alt="Model with glasses"
                />
                {/* person 3 */}
                <img
                    className="person person-right"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElnCjPYqof03ULh-3cKuWmO9iyOgCBai6LoziI3Uo3pQgWozp4YTxZIrYUV3vYqTe6VA&usqp=CAU"
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
