const cart = JSON.parse(localStorage.getItem('cart')) || [];
const container = document.getElementById('cart-items');

if (cart.length === 0) {
  container.innerHTML = '<p>Ваш кошик порожній.</p>';
} else {
  cart.forEach((item) => {
    const el = document.createElement('div');
    el.textContent = `${item.name} — ${item.price} грн`;
    container.appendChild(el);
  });
}
