import { useState } from 'react'
import './Menu.scss'

export default function Menu({pic, positionName, weight, price,openPopup, item, editAllProdCount, delCard, id, editTotalPrice }) {
  return (
    <div>
      <div className="menu_position">
        <img src={pic} alt="" />
        <div className="position_container">
        <p className="price">{price}₽</p>
        <p className="name">{positionName}</p>
        <p className="weight">{weight}g</p>
        <button onClick={() =>{
                        openPopup(item)
                    }}>Add to cart</button>
        </div>
      </div>

    </div>
  )
}
