const products = [
  {
    id: 1,
    name: 'Ivory Atelier Blazer',
    category: 'Outerwear',
    price: 140,
    description: 'Structured premium blazer with soft satin accents and gallery-inspired lines.',
    badge: 'Best Seller',
    mood: 'Editorial tailoring'
  },
  {
    id: 2,
    name: 'Golden Hour Silk Dress',
    category: 'Dresses',
    price: 180,
    description: 'Elegant fluid dress with a subtle glow and premium event-ready movement.',
    badge: 'New',
    mood: 'Evening statement'
  },
  {
    id: 3,
    name: 'Signature Tailored Trousers',
    category: 'Bottoms',
    price: 95,
    description: 'High-waist tailored trousers cut for modern proportion and everyday polish.',
    badge: 'Essential',
    mood: 'Quiet luxury'
  },
  {
    id: 4,
    name: 'Gallery Knit Top',
    category: 'Tops',
    price: 72,
    description: 'Soft knit texture designed for refined layering and effortless styling.',
    badge: 'Limited',
    mood: 'Soft structure'
  },
  {
    id: 5,
    name: 'Studio Longline Coat',
    category: 'Outerwear',
    price: 220,
    description: 'An elegant long coat designed to finish looks with warmth and authority.',
    badge: 'Premium',
    mood: 'Winter capsule'
  },
  {
    id: 6,
    name: 'Gold Trim Skirt',
    category: 'Bottoms',
    price: 88,
    description: 'Refined silhouette with subtle metallic detail and elevated movement.',
    badge: 'Editor Pick',
    mood: 'Day-to-night'
  }
];

const cart = [];

const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const summaryCount = document.getElementById('summary-count');
const summaryTotal = document.getElementById('summary-total');
const orderForm = document.getElementById('order-form');
const formMessage = document.getElementById('form-message');
const cartButton = document.querySelector('.cart-button');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual">
            <div>
              <span class="product-tag">${product.badge}</span>
              <strong>${product.name}</strong>
            </div>
          </div>
          <div class="product-copy">
            <span class="product-mood">${product.mood}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-meta">
              <span>${product.category}</span>
              <strong>$${product.price}</strong>
            </div>
          </div>
          <button class="button primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        </article>
      `
    )
    .join('');
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty. Add a few Bazquiat pieces to begin.</p></div>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, index) => `
          <div class="cart-item">
            <div>
              <h3>${item.name}</h3>
              <p>${item.category} · ${item.mood} · $${item.price}</p>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>
        `
      )
      .join('');
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  summaryCount.textContent = cart.length;
  summaryTotal.textContent = `$${total}`;
}

function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === Number(productId));
  if (!selectedProduct) {
    return;
  }

  cart.push(selectedProduct);
  formMessage.textContent = `${selectedProduct.name} added to your cart.`;
  renderCart();
}

productGrid.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    addToCart(event.target.dataset.id);
  }
});

cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    cart.splice(Number(event.target.dataset.index), 1);
    formMessage.textContent = 'Your cart has been updated.';
    renderCart();
  }
});

cartButton.addEventListener('click', () => {
  document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('open');
  }
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    formMessage.textContent = 'Please add at least one item to your cart before placing an order.';
    return;
  }

  const formData = new FormData(orderForm);
  const customerName = formData.get('name');

  formMessage.textContent = `Thank you, ${customerName}! Your Bazquiat order request has been received.`;
  orderForm.reset();
  cart.length = 0;
  renderCart();
});

renderProducts();
renderCart();
