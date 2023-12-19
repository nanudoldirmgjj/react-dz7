 import { useState } from 'react'
import './CartPosition.scss'
import cross from '../../assets/cross.png'
import App from '../App';


export default function CartPosition({pic, positionName, weight, price, delCard, id,  editCount,num,setNum  }) {
 //   let [num, setNum] = useState(1);





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
          <button onClick={()=>editCount(-1,id, price)} className='minus'>-</button>
            <p className="num">{num[-1+id]}</p>
            <button onClick={()=>editCount(+1,id, price)} className="plus">+</button>
          </div>

          <div className="delEl" onClick={() => delCard(id, price)}>
            <img src={cross} alt="" />
          </div>
          


        </div>

      </div>
    </div>
  )
}

