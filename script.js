// script.js

console.log("JS is connected!");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  

//FOR QUOTE IN TYPING on HOMEPAGE!
// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  new TypeIt("#typed-text", {
    strings: ["Where Every Bite Starts with the Perfect Crust!"],
    speed: 50,
    waitUntilVisible: true,
    cursor: true,
    loop: false,
  }).go();
});



// 🔍 Search Functionality
// const searchInput = document.querySelector('.search-bar');
// const productCards = document.querySelectorAll('.product-card');

// searchInput.addEventListener('input', () => {
//   const query = searchInput.value.toLowerCase();
//   productCards.forEach(card => {
//     const title = card.querySelector('h3').textContent.toLowerCase();
//     card.style.display = title.includes(query) ? 'block' : 'none';
//   });
// });

// 🔍 Search Functionality
const searchInput = document.querySelector('.search-bar');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  productCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase(); // 💡 new line
    const combinedText = title + ' ' + description;

    card.style.display = combinedText.includes(query) ? 'block' : 'none';
  });
});


// ➕ Quantity Buttons
productCards.forEach(card => {
  const minus = card.querySelector('.quantity-control button:first-child');
  const plus = card.querySelector('.quantity-control button:last-child');
  const countDisplay = card.querySelector('.quantity-control span');

  plus.addEventListener('click', () => {
    let count = parseInt(countDisplay.textContent);
    countDisplay.textContent = count + 1;
  });

  minus.addEventListener('click', () => {
    let count = parseInt(countDisplay.textContent);
    if (count > 1) countDisplay.textContent = count - 1;
  });
});

// 🛒 Add to Cart Interaction (with fixed price parsing)
document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('.price').textContent; // e.g. "Rs. 1499 / box of 5"

    // Extract only the first number (the price)
    const match = priceText.match(/\d+(\.\d+)?/);
    const price = match ? parseFloat(match[0]) : 0;

    const quantity = parseInt(card.querySelector('.quantity-control span').textContent);
    const image = card.querySelector('img').src;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity, image });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("🍪 Cookie added to cart!");
  });
});

// ❤️ Favorite Toggle
// document.querySelectorAll('.favorite').forEach(heart => {
//   heart.addEventListener('click', () => {
//     heart.classList.toggle('favorited');
//   });
// });




//ORDER PAGE



// order.js
// document.addEventListener("DOMContentLoaded", () => {
//   const orderSummaryContainer = document.querySelector(".order-summary");

//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   if (cart.length === 0) {
//     orderSummaryContainer.innerHTML += `<p>Your cart is empty.</p>`;
//     return;
//   }

//   // Add heading only once
//   const summaryTitle = document.createElement("h2");
//   summaryTitle.textContent = "Order Summary";
//   orderSummaryContainer.innerHTML = ""; // Clear existing summary
//   orderSummaryContainer.appendChild(summaryTitle);

//   let total = 0;

//   cart.forEach(item => {
//     const itemTotal = item.price * item.quantity;
//     total += itemTotal;

//     const itemDiv = document.createElement("div");
//     itemDiv.classList.add("item");
//     itemDiv.innerHTML = `
//       <span>${item.name} x${item.quantity}</span>
//       <span>Rs ${itemTotal}</span>
//     `;
//     orderSummaryContainer.appendChild(itemDiv);
//   });

//   const totalDiv = document.createElement("div");
//   totalDiv.classList.add("item");
//   totalDiv.innerHTML = `
//     <strong>Total</strong>
//     <strong>Rs ${total}</strong>
//   `;
//   orderSummaryContainer.appendChild(totalDiv);
// });


// document.querySelector('form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   // Submit order logic here (you can simulate this)
//   localStorage.removeItem('cart');
//   alert('Order confirmed! 🎉');
//   window.location.href = 'index.html'; // Redirect back to home
// });



// document.addEventListener('DOMContentLoaded', () => {
//   const summaryContainer = document.querySelector('.order-summary-items');
//   const totalElement = document.querySelector('.order-total');

//   const cart = JSON.parse(localStorage.getItem('cart')) || [];

//   if (cart.length === 0) {
//     summaryContainer.innerHTML = '<p>Your cart is empty 🛒</p>';
//     totalElement.textContent = 'Rs 0';
//     return;
//   }

//   let total = 0;

//   cart.forEach(item => {
//     const itemDiv = document.createElement('div');
//     itemDiv.classList.add('summary-item');

//     const subtotal = item.price * item.quantity;
//     total += subtotal;

//     itemDiv.innerHTML = `
//       <div class="summary-item-info">
//         <h3>${item.name}</h3>
//         <p>Qty: ${item.quantity}</p>
//         <p>Price: Rs ${item.price}</p>
//         <p><strong>Subtotal: Rs ${subtotal}</strong></p>
//       </div>
//     `;

//     summaryContainer.appendChild(itemDiv);
//   });

//   totalElement.textContent = `Rs ${total}`;
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const total = JSON.parse(localStorage.getItem('cart'))?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
//   document.getElementById('totalPriceInput').value = total;
// });


// // order.html
// window.onload = () => {
//   const cart = JSON.parse(localStorage.getItem('cart'));
//   const summaryContainer = document.getElementById('order-summary');

//   if (cart && cart.length > 0) {
//     let total = 0;
//     cart.forEach(item => {
//       const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
//       total += itemTotal;

//       const itemEl = document.createElement('div');
//       itemEl.className = 'summary-item';
//       itemEl.innerHTML = `
//         <p><strong>${item.name}</strong> x ${item.quantity} - $${itemTotal.toFixed(2)}</p>
//       `;
//       summaryContainer.appendChild(itemEl);
//     });

//     const totalEl = document.createElement('div');
//     totalEl.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
//     summaryContainer.appendChild(totalEl);
//   } else {
//     summaryContainer.innerHTML = `<p>No items in cart 😢</p>`;
//   }
// };





//BACKEND


document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    date: document.getElementById('date').value,
    instructions: document.getElementById('instructions').value
  };

  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Order placed successfully! Order ID: ' + result.orderId);
      // Optionally reset form or redirect
      e.target.reset();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (err) {
    alert('Network error: ' + err.message);
  }
});
