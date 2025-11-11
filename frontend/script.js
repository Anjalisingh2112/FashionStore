let cartCount = 0;

const products = [
  { name: "Men's Printed T-Shirt", category: "T-Shirts", price: 499, image: "https://via.placeholder.com/200x200?text=Men%27s+T-Shirt", badge: "New" },
  { name: "Casual Women's T-Shirt", category: "T-Shirts", price: 599, image: "https://via.placeholder.com/200x200?text=Women%27s+T-Shirt", badge: "Hot" },
  { name: "Sports Shoes", category: "Shoes", price: 1299, image: "https://via.placeholder.com/200x200?text=Sports+Shoes", badge: "Sale" },
  { name: "Running Shoes", category: "Shoes", price: 1499, image: "https://via.placeholder.com/200x200?text=Running+Shoes" },
  { name: "Trendy Handbag", category: "Bags", price: 899, image: "https://via.placeholder.com/200x200?text=Trendy+Handbag", badge: "New" },
  { name: "Classic Handbag", category: "Bags", price: 999, image: "https://via.placeholder.com/200x200?text=Classic+Handbag" },
  { name: "Wireless Headphones", category: "Headphones", price: 1999, image: "https://via.placeholder.com/200x200?text=Wireless+Headphones" },
  { name: "Noise Cancelling Headphones", category: "Headphones", price: 2999, image: "https://via.placeholder.com/200x200?text=Noise+Cancelling+Headphones", badge: "Sale" }
];

const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('#categories button');
const cartSpan = document.getElementById('cartCount');

function displayProducts(items) {
  productsContainer.innerHTML = '';
  items.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    productsContainer.appendChild(div);

    div.querySelector('button').addEventListener('click', () => {
      cartCount++;
      cartSpan.textContent = cartCount;
      alert(`${product.name} added to cart!`);
    });
  });
}

// Display all products initially
displayProducts(products);

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
});

// Category filter
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    if (category === "All") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      displayProducts(filtered);
    }
  });
});
