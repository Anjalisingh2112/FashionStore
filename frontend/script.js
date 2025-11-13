// Product data
const products = [
  {
    id: 1,
    name: "Men's Printed T-Shirt",
    category: "T-Shirts",
    price: 499,
    image: "https://i.ibb.co/7W2Lz7q/tshirt1.jpg",
    tag: "New"
  },
  {
    id: 2,
    name: "Casual Women's T-Shirt",
    category: "T-Shirts",
    price: 599,
    image: "https://i.ibb.co/k6Lh5tR/tshirt2.jpg",
    tag: "Hot"
  },
  {
    id: 3,
    name: "Sports Shoes",
    category: "Shoes",
    price: 1299,
    image: "https://i.ibb.co/TL8p0CW/shoes1.jpg",
    tag: "Sale"
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Shoes",
    price: 1499,
    image: "https://i.ibb.co/2n3J5Qs/shoes2.jpg",
    tag: ""
  },
  {
    id: 5,
    name: "Trendy Handbag",
    category: "Bags",
    price: 899,
    image: "https://i.ibb.co/SXwV0vT/bag1.jpg",
    tag: "New"
  },
  {
    id: 6,
    name: "Classic Handbag",
    category: "Bags",
    price: 999,
    image: "https://i.ibb.co/0KbbgY5/bag2.jpg",
    tag: ""
  },
  {
    id: 7,
    name: "Wireless Headphones",
    category: "Headphones",
    price: 1999,
    image: "https://i.ibb.co/4Z7fC2L/headphone1.jpg",
    tag: ""
  },
  {
    id: 8,
    name: "Noise Cancelling Headphones",
    category: "Headphones",
    price: 2999,
    image: "https://i.ibb.co/kG8sV4v/headphone2.jpg",
    tag: "Sale"
  },
];

// DOM elements
const productsContainer = document.getElementById("products");
const categoryButtons = document.querySelectorAll("#categories button");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

// Display products function
function displayProducts(items) {
  productsContainer.innerHTML = "";
  items.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      ${product.tag ? `<div class="tag">${product.tag}</div>` : ""}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}

// Filter by category
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    if (category === "All") {
      displayProducts(products);
    } else {
      displayProducts(products.filter(p => p.category === category));
    }
  });
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(query)));
});

// Cart
let cart = 0;
function addToCart(id) {
  cart++;
  cartCount.textContent = cart;
}

// Initial load
displayProducts(products);
