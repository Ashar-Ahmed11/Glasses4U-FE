import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
export default function FinalCover() {
    const context = useContext(NoteContext)
    const {homeData} = context
    const {footerCarousalImgDesktop,footerCarousalImgPhone} = homeData
    return (
        <div>
          
            <div id="carouselExampleCaptions" class="carousel slide">

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div className='shade'></div>
                        <img src={window.innerWidth>750?footerCarousalImgDesktop:footerCarousalImgPhone} class="d-block w-100" alt="..." />
                        <div class="carousel-caption" style={{color:'white'}}>
                        <h1 className="text-center" style={{ fontFamily: 'Sagrantino' }}>Customer Care</h1>
                            <p className="text-center">Our motive is to provide the best customer service we can</p>
                            <button className="btn" style={{borderRadius:'100px',borderColor:"white",color:"white",bacgroundColor:'none'}}>READ MORE</button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}