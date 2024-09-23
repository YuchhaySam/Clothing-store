import { product, test } from "../data/product.js";
import { moneyConvert } from "./ultil/moneyConversion.js";

let itemHtml;

product.forEach((productItem) => {
  itemHtml += `
    <div class="item">
        <span class="item-name">${productItem.name}</span>
        <span class="item-price">${moneyConvert(productItem.priceCents)}</span>
        <img class="item-image" src=${productItem.image}>
        <button class="add-to-cart-button">Add to Cart</button>
      </div>
  `
});

