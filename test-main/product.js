document.addEventListener('DOMContentLoaded', () => {
  const productId = new URLSearchParams(window.location.search).get('id');

  if (!productId) {
    console.error('ID товару не знайдено в URL');
    return;
  }

  fetch(`http://localhost:5500/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => renderProduct(product))
    .catch((err) => console.error('Помилка завантаження товару:', err));

  function renderProduct(product) {
    // Назва товару в заголовок сторінки і заголовок в body
    document.title = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('product-title').textContent = product.name;

    // Ціна
    document.getElementById(
      'productPrice'
    ).textContent = `Вартість: ${product.price} грн`;

    // Зображення
    const img = document.getElementById('productImage');
    img.src = product.image;
    img.alt = product.name;

    // Опис
    document.getElementById('productDescription').textContent =
      product.description;

    // Характеристики — список
    const characteristicsList = document.getElementById(
      'productCharacteristics'
    );
    characteristicsList.innerHTML = `
      <li>Вік: ${product.age}</li>
      <li>Бренд: ${product.brand}</li>
      <li>Об'єм: ${product.volume}</li>
      <li>Колекція: ${product.collection}</li>
      <li>Країна ТМ: ${product.countryTM}</li>
      <li>Зроблено в: ${product.madeIn}</li>
    `;

    // Спосіб застосування
    document.getElementById('productUsage').textContent = product.usage;

    // Склад
    document.getElementById('productIngredients').textContent =
      product.ingredients;
  }

  // Обробник кнопки "Додати у кошик"
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (!addToCartBtn) {
    console.warn('Кнопка "Додати у кошик" не знайдена');
    return;
  }

  addToCartBtn.addEventListener('click', () => {
    const name =
      document.getElementById('productName').textContent || 'Без назви';
    const priceText =
      document.getElementById('productPrice').textContent || '0 грн';
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
    const image = document.getElementById('productImage')?.src || '';

    if (!productId) {
      console.error('ID товару не знайдено');
      return;
    }

    const newProduct = {
      id: productId,
      name,
      price,
      image,
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find((item) => item.id === newProduct.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  });

  // Оновлення лічильника кошика при завантаженні
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElem = document.getElementById('cart-count');
  if (cartCountElem) {
    cartCountElem.textContent = count;
  }
}
