 import { useState } from 'react'
import './CartPosition.scss'
import cross from '../../assets/cross.png'


export default function CartPosition({pic, positionName, weight, price, editAllProdCount, delCard, id, editTotalPrice }) {
    let [num, setNum] = useState(1);

  function editCount(amper) {
    if (String(amper) === "-1" && num === 1) { 
      delCard(id, num, price);
     };

    const result = num + amper;
    editAllProdCount(amper);
    setNum(result);
    editTotalPrice(amper, price);

  }


  return (
    <div className='full'>
      <div className="position_container">

        <img src={pic} alt="" />

        <div className="info">
          <div className="properties">
            <p className="name">{positionName}</p>
            <p className="weight">{weight}g</p>
            <p className="price">{price}₽</p>
          </div>

          <div className="volume">
            <button onClick={()=>editCount(-1)} className='minus'>-</button>
            <p className="num">{num}</p>
            <button onClick={()=>editCount(+1)} className="plus">+</button>
          </div>

          <div className="delEl" onClick={() => delCard(id, num, price)}>
            <img src={cross} alt="" />
          </div>


        </div>
      </div>
    </div>
  )
}

