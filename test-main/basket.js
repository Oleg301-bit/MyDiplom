document.addEventListener('DOMContentLoaded', async function () {
  const cartContainer = document.getElementById('cart-container');
  const totalContainer = document.getElementById('cart-total');
  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    console.error('Помилка читання з localStorage:', e);
    cart = [];
  }

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p style="color: white;">Ваш кошик порожній.</p>';
    totalContainer.textContent = '';
    return;
  }

  let total = 0;

  for (const item of cart) {
    try {
      const res = await fetch(`http://localhost:5500/api/products/${item.id}`);
      if (!res.ok) throw new Error('Товар не знайдено');
      const product = await res.json();

      const sum = product.price * item.quantity;
      total += sum;

      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <img src="${product.image}" width="100" />
        <p><strong>${product.name}</strong></p>
        <p>Ціна: ${product.price} грн</p>
        <p>Кількість: ${item.quantity}</p>
        <p>Сума: ${sum} грн</p>
      `;
      cartContainer.appendChild(div);
    } catch (err) {
      console.error(`Помилка при завантаженні товару з id ${item.id}:`, err);
    }
  }

  totalContainer.textContent = `Загальна сума: ${total} грн`;
});
//localStorage.clear();
