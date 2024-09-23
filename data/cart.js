import { product } from "./product.js";

export const cart = [];

export function addToCart(productId){
  
  let checkCart;
  cart.forEach((cartItem)=>{
    if(productId=== cartItem.id){
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
}


