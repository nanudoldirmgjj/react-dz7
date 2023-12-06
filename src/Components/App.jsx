import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import '../style/App.scss'
import arrCards from '../burgers.json'
import CartPosition from './CartPosition/CartPosition'
import Menu from './Menu/Menu'
import MenuPopup from './MenuPopup/MenuPopup'
const popArr = [];

function App() {

  const [burgers, setBurgers] = useState(arrCards.forCart);
  const [allProdCount, setAllProdCount] = useState(3);
  const [totalPrice, setTotalPrice] = useState(countStartPrice());
  const [foodInfo, setFoodInfo] = useState(arrCards.forMenu);
  const [popup, setPopup] = useState(popArr);



  function editAllProdCount(amper) {
    setAllProdCount(allProdCount + amper);

  }


  function delCard(id, num = 0, amount = 0) {
    const copyBurgerArr = [...burgers];
    const newBurgerArr = copyBurgerArr.filter((item) => item.id !== id);
    setBurgers(newBurgerArr);

    editAllProdCount(-num);
    editTotalPrice(-1, amount, num)
  }

  function countStartPrice() {
    let price = 0;
    burgers.map((item) => {
      price = price + item.price;
    })
    return price;
  }

  function editTotalPrice(amper, amount, num = 1) {
    if (String(amper) === "-1") {
      setTotalPrice(totalPrice - amount * num)
    }
    else setTotalPrice(totalPrice + amount * num)

  }

  function openPopup(item) {
    const arr = [...popArr];
    arr.push(item);
    setPopup(arr);
  }
  function closePopup() {
    setPopup([]);
  }

  function addFromMenu(item) {
   const truePosition = burgers.find(i => i.positionName === item.positionName);
   if(truePosition){    
    return
   } 

   let lastId = 0;
   if(burgers.length !== 0) {
    lastId = burgers[burgers.length-1].id;
    editAllProdCount(1);
    editTotalPrice(1, item.price);

  }

   item.id = lastId + 1;
setBurgers((prevState) => [...prevState, item]);
  }



  function addFromPopup (item, positionCount) {
    const truePosition = burgers.find(i => i.positionName === item.positionName);
    if(truePosition){    
     return
    } 
 
    let lastId = 0;
    if(burgers.length !== 0) {
     lastId = burgers[burgers.length-1].id;
     editAllProdCount(1);
     editTotalPrice(1, item.price, positionCount);
 
   }
 
    item.id = lastId + 1;
 setBurgers((prevState) => [...prevState, item]);
   }
 



  if (!burgers) return <h1>error</h1>

  return (
    <div className='mainDiv'>

      {popup.map(item => {
        return <div key={uuidv4()} className='popBack'>
          <MenuPopup {...item}
            key={uuidv4()}
            closePopup={closePopup} 
            burgers = {burgers}
            setBurgers = {setBurgers}
            editAllProdCount = {editAllProdCount}
            editTotalPrice = {editTotalPrice}
            item={item}
            addFromPopup = {addFromPopup}
            />
        </div>
      })}

      <div className='cart'>
        <h1>{allProdCount}</h1>



        <div className="bm">
          {burgers.map((item) => (
            <CartPosition {...item}
              key={item.id}
              editAllProdCount={editAllProdCount}
              delCard={delCard}
              editTotalPrice={editTotalPrice}
            />
          ))}


        </div>

        <h1>Total price: {totalPrice}</h1>

      </div>


      <div className="menu">
        <h1 className='burg_topic'>Burgers</h1>
        <div>
          {foodInfo.map((item) => (
            <Menu {...item}
              key={uuidv4()}
              openPopup={openPopup}
              item={item}
              addFromMenu = {addFromMenu}
            />
          ))}
        </div>
      </div>

      {/* <MenuPopup {...burgers}  /> */}

    </div>
  );
}

export default App
