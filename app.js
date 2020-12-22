const data = {
  items: [
    {
      sys: { id: "1" },
      fields: {
        title: "Brown Brim",
        price: 25,
        image: {
          fields: { file: { url: "https://i.ibb.co/ZYW3VTp/brown-brim.png" } },
        },
      },
    },
    {
      sys: { id: "2" },
      fields: {
        title: "Blue Beanie",
        price: 18,
        image: {
          fields: { file: { url: "https://i.ibb.co/ypkgK0X/blue-beanie.png" } },
        },
      },
    },
    {
      sys: { id: "3" },
      fields: {
        title: "Brown Cowboy",
        price: 35,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/QdJwgmp/brown-cowboy.png" },
          },
        },
      },
    },
    {
      sys: { id: "4" },
      fields: {
        title: "Green Beanie",
        price: 25,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/YTjW3vF/green-beanie.png" },
          },
        },
      },
    },
    {
      sys: { id: "5" },
      fields: {
        title: "Adidas NMD",
        price: 220,
        image: {
          fields: { file: { url: "https://i.ibb.co/0s3pdnc/adidas-nmd.png" } },
        },
      },
    },
    {
      sys: { id: "6" },
      fields: {
        title: "Black Converse",
        price: 110,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/bPmVXyP/black-converse.png" },
          },
        },
      },
    },
    {
      sys: { id: "7" },
      fields: {
        title: "Nike Red Range",
        price: 160,
        image: {
          fields: { file: { url: "https://i.ibb.co/QcvzydB/nikes-red.png" } },
        },
      },
    },
    {
      sys: { id: "8" },
      fields: {
        title: "Air Jordan Limited",
        price: 190,
        image: {
          fields: { file: { url: "https://i.ibb.co/w4k6Ws9/nike-funky.png" } },
        },
      },
    },
    {
      sys: { id: "9" },
      fields: {
        title: "Black Jean Shearling",
        price: 125,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/XzcwL5s/black-shearling.png" },
          },
        },
      },
    },
    {
      sys: { id: "10" },
      fields: {
        title: "Blue Jean Jacket",
        price: 100,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png" },
          },
        },
      },
    },
    {
      sys: { id: "11" },
      fields: {
        title: "Grey Jean Jacket",
        price: 90,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png" },
          },
        },
      },
    },
    {
      sys: { id: "12" },
      fields: {
        title: "Tan Trench",
        price: 190,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/M6hHc3F/brown-trench.png" },
          },
        },
      },
    },
    {
      sys: { id: "13" },
      fields: {
        title: "Floral Dress",
        price: 80,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/KV18Ysr/floral-skirt.png" },
          },
        },
      },
    },
    {
      sys: { id: "14" },
      fields: {
        title: "Striped Sweater",
        price: 55,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/KmSkMbH/striped-sweater.png" },
          },
        },
      },
    },
    {
      sys: { id: "15" },
      fields: {
        title: "Floral T-shirt",
        price: 30,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/qMQ75QZ/floral-shirt.png" },
          },
        },
      },
    },
    {
      sys: { id: "16" },
      fields: {
        title: "Jean Long Sleeve",
        price: 40,
        image: {
          fields: {
            file: { url: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png" },
          },
        },
      },
    },
  ],
};
console.log(data);

// variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
let cart = [];

// products
class Products {
  async getProducts() {
    try {
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      console.log(products);

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// ui
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
   <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
              height="300"
              width="350"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              Add To Cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        <!-- end of single product -->
   `;
    });
    productsDOM.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach((button) => {
      let id = button.dataset.id;

      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          // disable button
          event.target.innerText = "In Cart";
          event.target.disabled = true;
          // add to cart
          let cartItem = { ...Storage.getProduct(id), amount: 1 };
          cart = [...cart, cartItem];
          Storage.saveCart(cart);
          // add to DOM
          this.setCartValues(cart);
          this.addCartItem(cartItem);
          this.showCart();
        });
      }
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<!-- cart item -->
            <!-- item image -->
            <img src=${item.image} alt="product" />
            <!-- item info -->
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item" data-id=${item.id}>Remove</span>
            </div>
            <!-- item functionality -->
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
              <p class="item-amount">
                ${item.amount}
              </p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
          <!-- cart item -->
    `;
    cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }
  cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cart = cart.filter((item) => item.id !== id);
        console.log(cart);

        this.setCartValues(cart);
        Storage.saveCart(cart);
        cartContent.removeChild(removeItem.parentElement.parentElement);
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach((button) => {
          if (parseInt(button.dataset.id) === id) {
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-shopping-cart">add to cart</i>`;
          }
        });
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cart = cart.filter((item) => item.id !== id);
          // console.log(cart);

          this.setCartValues(cart);
          Storage.saveCart(cart);
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          const buttons = [...document.querySelectorAll(".bag-btn")];
          buttons.forEach((button) => {
            if (parseInt(button.dataset.id) === id) {
              button.disabled = false;
              button.innerHTML = `<i class="fas fa-shopping-cart">add to cart</i>`;
            }
          });
        }
      }
    });
  }
  clearCart() {
    // console.log(this);

    cart = [];
    this.setCartValues(cart);
    Storage.saveCart(cart);
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach((button) => {
      button.disabled = false;
      button.innerHTML = `<i class="fas fa-shopping-cart">add to cart</i>`;
    });
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  ui.setupAPP();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});
