import '../index.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import '../Style.css'


import React, {useContext, useEffect, useState} from "react";



const CardPurchase = (props) => {


    return(
        <div className='card text-center'>
                <h4 className='card-title'> {props.title} </h4>
                <p className='card-title'> {props.shipAdd} </p>
                <p className='card-title'> {props.buyer} </p>
                <p className='card-title'> {props.name} </p>
        </div>
    )
}

export default CardPurchase;