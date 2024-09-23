import { product } from "./product.js";

export const cart = [{
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


