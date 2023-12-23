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
  const [num, setNum] = useState([1, 1, 1,]);

  //console.log(num)


  function editAllProdCount(amper, number = 1) {
    setAllProdCount(allProdCount + amper * number);

  }

  function delCard(id, amount = 0) {

    const copyBurgerArr = [...burgers];
    const newBurgerArr = copyBurgerArr.filter((item) => item.id !== id);
    setBurgers(newBurgerArr);


    // const cartArr = [...num];
    // cartArr.splice(id-1, 1);
    // console.log('sjflkds' + `\n` +cartArr +`\n` +id)
    // setNum(cartArr);
    const arr = [...num];
    arr[-1+id] = 1;
    setNum(arr);

    editAllProdCount(-1, num[id - 1]);
    editTotalPrice(-1, amount, num[id - 1])
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




  function addFromMenu(item, number = 1) {

 

    const truePosition = burgers.find(i => i.positionName === item.positionName);
    if (truePosition) {

      editCount(+1, item.id, item.price, number)
      return
    }

    let lastId;
    if (burgers.length !== 0) {
      lastId = burgers[burgers.length - 1].id;
    } else{
      lastId = 0;
      setNum([]);
    } 

    editAllProdCount(1, number);
    editTotalPrice(1, item.price, number);
     //editCount(+1,1+ item.id, item.price, number)

    item.id = lastId + 1;
    setBurgers((prevState) => [...prevState, item]);
    setNum((prevState) => [...prevState, number])

  }



  function editCount(amper, id, price, count = 1) {
    // console.log(num[id])

    const truePosition = burgers.find(i => i.id !== id);
    if (!truePosition) {
      setNum((prevState) => [...prevState, 1])

    }

    const result = [...num];
    if (String(amper) === "-1" && num[-1 + id] === 1) {
      delCard(id, price);

      // result.splice(id-1, 1)
      return
    }
    //  else {
    result[id - 1] += amper * count;

    //  }



    // console.log(result)

    editAllProdCount(amper, count);
    setNum(result);
    editTotalPrice(amper, price,count);



  }



  if (!burgers) return <h1>error</h1>

  return (
    <div className='mainDiv'>

      {popup.map(item => {
        return <div key={uuidv4()} className='popBack'>
          <MenuPopup {...item}
            key={uuidv4()}
            closePopup={closePopup}
            burgers={burgers}
            setBurgers={setBurgers}
            editAllProdCount={editAllProdCount}
            editTotalPrice={editTotalPrice}
            item={item}
            // addFromPopup = {addFromPopup}
            addFromMenu={addFromMenu}
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

              num={num}
              setNum={setNum}
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
              addFromMenu={addFromMenu}
            />
          ))}
        </div>
      </div>

      {/* <MenuPopup {...burgers}  /> */}

    </div>
  );
}

export default App
