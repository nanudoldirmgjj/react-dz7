import { useState } from 'react'
import './Menu.scss'


export default function Menu({ pic, positionName, weight, price, openPopup, item, addFromMenu, delCard, id, editTotalPrice }) {
  return (
    <div>
      <div onClick={() => {
        openPopup(item)
      }} className="menu_position">
        <img src={pic} alt="" />
        <div className="position_container">
          <p className="price">{price}₽</p>
          <p className="name">{positionName}</p>
          <p className="weight">{weight}g</p>
          <div onClick={(event)=>{event.stopPropagation()}}>
          <button onClick={() => {addFromMenu(item,1)}}>Add to cart</button></div>
        </div>
      </div>

    </div>
  )
}
