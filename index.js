import {menuArray} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const consentForm = document.getElementById('consent-form')
let orderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.plusBtn){
      getOrderObj(e.target.dataset.plusBtn) 
    } 
    else if(e.target.dataset.removeBtn) {
        handleRemoveBtn(e.target.dataset.removeBtn)
    }
    else if(e.target.id === 'complete-btn') {
        handleCompleteBtnClick()
    }
    // else if(e.target.id === 'pay-btn') {
    //     handlePayBtnClick()
    // }
})



// MENU SECTION
function getMenuHtml() {
    let menuHtml = ``
    
    menuArray.forEach(function(item){
         menuHtml += `
        <div class="items">
            <h2 class="emoji">${item.emoji}</h2>
            <div class="item-info">
                <p class="name">${item.name}</p>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <i class="fa-regular fa-plus plus-icon" data-plus-btn="${item.id}"></i>
        </div>`
    })
    return menuHtml
}

// ORDER SECTION
function getOrderObj(itemId) {
    const targetOrderObj = menuArray.find((item) => item.id === Number(itemId))
    if (targetOrderObj) {
        addToOrderArray(targetOrderObj)
    }
}

function addToOrderArray(item) {
    const orderObj = {
        name: item.name,
        price: item.price,
        id: item.id,
        uuid: uuidv4()
    }
    orderArray.push(orderObj)
    localStorage.setItem('order', JSON.stringify(orderArray))
    renderOrder()
}

function getOrderHtml() {
    let orderHtml = ``
    
    orderArray.map((item) => {
        orderHtml += `
        <div class="order-name">
            <p class="name">${item.name}</p>
            <p class="remove-btn" id="remove-btn" data-remove-btn="${item.uuid}">REMOVE</p>
            <div class="order-price">
                <p class="price">$${item.price}</p>
            </div>
        </div>`
    })
    return orderHtml
}

function handleRemoveBtn(itemId) {
    let index = orderArray.findIndex( order => order.uuid == itemId);
    orderArray.splice(index,1)
    renderOrder()
}

function getTotalPrice() {
    let totalPrice = 0
    orderArray.map((item) => {
        totalPrice += item.price
    })
    return totalPrice
}

function handleCompleteBtnClick() {
    document.getElementById('modal').style.display = 'block'
    document.getElementById('container').style.filter = 'brightness(50%)'
}

// MODAL
// function handlePayBtnClick(e) {
//     e.defaultPrevented()
//     document.getElementById('container').style.filter = 'none'
//     renderThankYou()
//     localStorage.clear()
// }

// function  getThankYouMsg() {
//     let thankYou = ``
//     const consentFormData = new FormData(consentForm)
//     const fullName = consentFormData.get('fullName')
//     thankYou = `Thanks, ${fullName}! Your order is on its way!`
// }

consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    let thankYou = ``
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    thankYou = `Thanks, ${fullName}! Your order is on its way!`
    document.getElementById('container').style.filter = 'none'
    document.getElementById('modal').style.display = 'none'
    document.getElementById('thank-you-msg').style.display = 'block'
    document.getElementById('thank-you-msg').innerHTML = thankYou
    orderArray = []
    localStorage.clear()
    renderOrder()
})

// RENDER
function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

function renderOrder() {
    if (orderArray.length > 0) {
        document.getElementById('order-section').style.display = 'block'
    } else {
        document.getElementById('order-section').style.display = 'none'
    }
    document.getElementById('order').innerHTML = getOrderHtml()
    document.getElementById('total-price').innerHTML = '$' + getTotalPrice()
}

// function renderThankYou() {
//     document.getElementById('thank-you-msg').innerHTML = getThankYouMsg()
// }

renderMenu()













// MENU
// <div class="items">
//     <h2 class="emoji">🍕</h2>
//      <div class="item-info">
//         <p class="name">Pizza</p>
//         <p class="ingredients">pepperoni,mushrom,mozarella</p>
//         <p class="price">$14</p>
//     </div>
//     <i class="fa-regular fa-plus plus-icon"></i>
// </div>



// ORDER SECTION
// <h2 class="your-orders">Your Orders</h2>
// <div class="orders">
//     <div class="order">
//         <div class="order-name">
//             <p class="name">Pizza</p>
//             <p class="remove-btn" id="remove-btn" data-remove-btn="">REMOVE</p>
//         </div>
//         <p class="price">$14</p>
//     </div>
// </div>
// <div class="price-and-btn">
//     <div class="total-price">
//         <p class="name">Total price:</p>
//         <p class="price">$14</p>
//     </div>
//      <button class="complete-btn">Complete Order</button>
// </div>

// ORDER 
// <div class="order-name">
//     <p class="name">Pizza</p>
//     <p class="remove-btn" id="remove-btn" data-remove-btn="">REMOVE</p>
// </div>
// <p class="price">$14</p>