import React from 'react'


export default function Spinner() {
    const color = "#F4B92D"
    return (
        <div>
            <div className="spinner-border m-5" style={{width:"70px",height:"70px",color:color}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}