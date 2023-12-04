import { useState } from 'react'
import React from 'react';
import './MenuPopup.scss'

export default function MenuPopup({ pic, positionName, calories, weight, price, id, info, constituents, closePopup }) {
    const [number, setNumber] = useState(1)
    function changeNum(amper) {
        if (String(amper) === '-1' && number === 1) {
            return
        }
        setNumber(number + amper)
    }
    return (
        <div>
            <div className="menu_popup">
                <div className="popup_container">
                    <div className='popup_top_block'>
                    <p className="pop_name">{positionName}</p>
                    <button onClick={() => { closePopup() }}>x</button>
                    </div>
                    <div className="pop_content">
                        <img src={pic} alt="" />
                        <div className="full_info">
                            <p className="info">{info}</p>
                            <div className="constituents">
                                <ul className='constituents_ul'>
                                    Constituents:
                                    {constituents.map(item => {
                                        return <li key={++id}>{item} </li>
                                    })}
                                </ul>
                            </div>
                            <p className="weight_calories">
                                {weight}g, {calories} calories
                            </p>
                        </div>
                    </div>
                    <div className="popup_bottom_part">
                        <button className="add_to_cart_button">Add to cart</button>
                        <div className="calc">
                        <button onClick={() => {
                                changeNum(-1)
                            }}>-</button>
                            <p>{number}</p>
                            <button onClick={() => {
                                changeNum(+1)
                            }}>+</button>
                        </div>
                        <div className="item_price">{price}₽</div>
                    </div>

                </div>
            </div>
        </div>
    )
}
