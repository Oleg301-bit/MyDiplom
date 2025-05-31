document.addEventListener('DOMContentLoaded', async function () {
  const cartContainer = document.getElementById('cart-container');

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    console.error('Помилка читання з localStorage:', e);
    cart = [];
  }

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
    return;
  }

  let totalSum = 0; 

  for (const item of cart) {
    try {
      const res = await fetch(`http://localhost:5500/api/products/${item.id}`);
      if (!res.ok) throw new Error('Товар не знайдено');
      const product = await res.json();

      const itemSum = product.price * item.quantity;
      totalSum += itemSum;

      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <img src="${product.image}" width="100" />
        <p><strong>${product.name}</strong></p>
        <p>Ціна: ${product.price} грн</p>
        <p>Кількість: ${item.quantity}</p>
        <p>Сума: ${itemSum} грн</p>
      `;
      cartContainer.appendChild(div);
    } catch (err) {
      console.error(`Помилка при завантаженні товару з id ${item.id}:`, err);
    }
  }

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.style.fontWeight = 'bold';
  totalDiv.style.marginTop = '20px';
  totalDiv.textContent = `Загальна сума: ${totalSum} грн`;
  cartContainer.appendChild(totalDiv);
});
