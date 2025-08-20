document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.cart-container');
  const cartSummary = document.querySelector('.cart-summary');
  const totalEl = cartSummary.querySelector('.total strong');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Cart items:', cart);

  if (cart.length === 0) {
    cartContainer.innerHTML = '<h2>Your cart is empty 😔</h2>';
    return;
  }

  const createCartItem = (item, index) => {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div class="item-details">
      <h3>${item.name}</h3>
      <p>Box of delicious cookies 🍪</p>
      <div class="quantity-price">
        <div class="quantity-control">
          <button class="decrease-btn">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>
        <div class="price">Rs ${item.price * item.quantity}</div>
      </div>
    </div>
    <button class="remove-btn">🗑️</button>
  `;

  const decreaseBtn = div.querySelector('.decrease-btn');
  const increaseBtn = div.querySelector('.increase-btn');
  const quantitySpan = div.querySelector('.quantity');
  const priceEl = div.querySelector('.price');

  decreaseBtn.addEventListener('click', () => {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      quantitySpan.textContent = cart[index].quantity;
      priceEl.textContent = `Rs ${cart[index].price * cart[index].quantity}`; // Update price here
      updateCart();
    }
  });

  increaseBtn.addEventListener('click', () => {
    cart[index].quantity++;
    quantitySpan.textContent = cart[index].quantity;
    priceEl.textContent = `Rs ${cart[index].price * cart[index].quantity}`; // Update price here
    updateCart();
  });

  div.querySelector('.remove-btn').addEventListener('click', () => {
    cart.splice(index, 1);
    updateCart(true);
  });

  return div;
};


  const updateCart = (rerender = false) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalEl.textContent = `Rs ${total}`;

    if (rerender) {
      document.querySelectorAll('.cart-item').forEach(item => item.remove());
      cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartSummary.before(cartItem);
      });
    }
  };

  // Initial render
  cart.forEach((item, index) => {
    const cartItem = createCartItem(item, index);
    cartSummary.before(cartItem);
  });

  updateCart();
});



//order page

// cart.html
document.getElementById('checkoutBtn').addEventListener('click', () => {
  const cart = []; // This should be your array of cart items

  // Sample structure, adjust according to your cart code
  document.querySelectorAll('.cart-item').forEach(item => {
    cart.push({
      name: item.querySelector('.item-name').innerText,
      price: item.querySelector('.item-price').innerText,
      quantity: item.querySelector('.item-qty').value
    });
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'order.html';
});
