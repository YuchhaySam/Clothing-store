import { product } from "./product.js";

export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [{
    id: 'd293a',
    quantity: 1
  }
];
}
export function addToCart(productId){
  
  let checkCart;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      checkCart = cartItem;
    }
  });

  if(checkCart){
    checkCart.quantity += 1;
  } else{
    cart.push({
      id: productId,
      quantity:1
    });
  }
  saveToLocalStorage();
}

export function deleteItem(productId){
  let newCart = [];
  cart.forEach((cartItem)=>{
    if(productId !== cartItem.id){
      newCart.push({
        id: cartItem.id,
        quantity: cartItem.quantity
      })
    }
  })
  cart = newCart;
  saveToLocalStorage();
}

export function saveToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function increaseQuantity(productId){
  let newQuantity = 0;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      if(cartItem.quantity>= 10){
        alert('Your item cannot be higher than 10');
      }else{
        newQuantity = cartItem.quantity += 1;
      }
    }
  })
  cart.quantity = newQuantity;
  saveToLocalStorage();
}
export function decreaseQuantity(productId){
  let newQuantity = 0;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.id){
      if(cartItem.quantity<= 1){
        alert('Your item cannot be lower than 1');
      }else{
        newQuantity = cartItem.quantity -= 1;
      }
    }
  })
  cart.quantity = newQuantity;
  saveToLocalStorage();
}