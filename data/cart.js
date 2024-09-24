import { product } from "./product.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    id: 'd293c',
    quantity: 1
  },
  {
    id: 'd293d',
    quantity: 3
  }
];

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