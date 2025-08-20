document.addEventListener('DOMContentLoaded', () => {
  const summaryContainer = document.querySelector('.order-summary-items');
  const totalElement = document.querySelector('.order-total');
  const totalPriceInput = document.getElementById('totalPriceInput');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    summaryContainer.innerHTML = '<p>Your cart is empty 🛒</p>';
    totalElement.textContent = 'Rs 0';
    totalPriceInput.value = 0;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('summary-item');

    itemDiv.innerHTML = `
      <span class="summary-left">${item.name} x(${item.quantity})</span>
      <span class="summary-right">Rs ${subtotal}</span>
    `;

    summaryContainer.appendChild(itemDiv);
  });

  totalElement.textContent = `Rs ${total}`;
  totalPriceInput.value = total;
});

// Clear cart on form submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order confirmed! 🎉');
    localStorage.removeItem('cart');
    form.submit(); // If server connection exists, this will still work
  });
});
