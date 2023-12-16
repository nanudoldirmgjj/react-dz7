import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import '../style/App.scss'
import arrCards from '../burgers.json'
import CartPosition from './CartPosition/CartPosition'
import Menu from './Menu/Menu'
import MenuPopup from './MenuPopup/MenuPopup'
const popArr = [];

function App({number, setNumber}) {

  const [burgers, setBurgers] = useState(arrCards.forCart);
  const [allProdCount, setAllProdCount] = useState(3);
  const [totalPrice, setTotalPrice] = useState(countStartPrice());
  const [foodInfo, setFoodInfo] = useState(arrCards.forMenu);
  const [popup, setPopup] = useState(popArr);



  function editAllProdCount(amper, number = 1) {
    setAllProdCount(allProdCount + amper*number);

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

//   const cartState2 =[];

  // function getState(num,setNum){
  //   console.log(num,setNum);
  //   let cartState = [num,setNum];
  //   console.log(cartState);
  //   return num,setNum;
  // }

// let a;


  function addFromMenu(item, number) {
   const truePosition = burgers.find(i => i.positionName === item.positionName);
   if(truePosition){    
    editAllProdCount(1, number);
    editTotalPrice(1, item.price, number);
    return
   } 

   let lastId;
   if(burgers.length !== 0) {
    lastId = burgers[burgers.length-1].id;


  } 
  editAllProdCount(1, number);
  editTotalPrice(1, item.price, number);

   item.id = lastId + 1;
setBurgers((prevState) => [...prevState, item]);
// editCount(+1, item.id, undefined, item.price, undefined, number)
  }


function changeCartPosNum(number=1){
  setNum((prevState) => prevState +number)
}

function editCount(amper,id, num, price,setNum, count = 1) {
  // if (num == undefined || setNum == undefined){

  //   console.log(78);
  // }
  if (String(amper) === "-1" && num === 1) { 
    delCard(id, num, price);
   };

  const result = num + amper*count;
  editAllProdCount(amper);
  setNum(result);
  editTotalPrice(amper, price);



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
            // addFromPopup = {addFromPopup}
            addFromMenu = {addFromMenu}
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
              editCount={editCount}
              //  getState ={getState}
              // a = {a}
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
