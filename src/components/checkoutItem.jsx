import React from 'react'
import { Image } from 'cloudinary-react'
import { Transformation } from 'cloudinary-react'
export default function CheckoutItem({ element }) {
    const { name, price, image, quantity, localePrice } = element
    // console.log(element);

    return (

        <div style={{ borderBottom: '1px solid #dadada', paddingBottom: '10px' }} className='d-flex justify-content-between my-2'>
            <div className='d-flex'>
                <div style={{ marginTop: '20px' }} className="position-relative">
                    {/* <img className='card-img' style={{ borderRadius: "10px",width:'128px' }} src={image} alt="" /> */}


                    <Image cloudName="dextrzp2q" className='card-img' style={{ borderRadius: "10px", width: '128px' }} key={image} publicId={image} type="fetch">

                        <Transformation fetchFormat="webp" />
                        <Transformation crop="pad" height="500" width="500" background="white" />
                        <Transformation quality="60" />
                    </Image>
                    <span style={{ backgroundColor: '#ffffff', width: '30px', height: '30px', border: '1px solid #000000', color: '#212427' }} class="position-absolute top-0 start-100 translate-middle rounded-circle">
                        <p style={{ paddingTop: '2px' }} className='text-center'>{quantity}</p>
                        <span class="visually-hidden">New alerts</span>
                    </span>
                </div>
                <div style={{ color: '#212427' }} className='py-5 mx-2 d-flex flex-column'>
                    <span>
                    {name}</span>
                    <span className='opacity-75'>
                    {element?.variant?.variant}</span>

                    </div>
            

            </div>

            <div className='py-5' style={{ color: '#212427' }}>{localePrice}</div>
        </div >

    )
}