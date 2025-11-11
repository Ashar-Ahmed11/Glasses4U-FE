import React from 'react'

import NukhbaLogo from './nukhbaLogo.png'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
export default function Carousal() {
    const context = useContext(NoteContext)
    const {homeData} = context
    const {mainCarousalImgDesktop,mainCarousalImgPhone} = homeData
    return (
        <div>
            <div id="carouselExampleCaptions" class="carousel slide">

                <div class="carousel-inner">
                    <div class="carousel-item active">
                    {/* <div className='shade'></div> */}
                        <img src={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} class="d-block w-100" alt="..." />
                        {/* <div className="mycarousel-caption">
                            <img style={{width:'120px'}} src={NukhbaLogo} alt="" className="card-img" />
                            <p style={{ fontFamily: 'Sagrantino' }}>The Luxary You Deserve</p>
                        </div> */}
                    </div>


                </div>

            </div>
        </div>
    )
}