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
    document.querySelector('h1').textContent = product.name;
    document.querySelector(
      '.price'
    ).textContent = `Вартість: ${product.price} грн`;
    document.querySelector('.set-image')?.setAttribute('src', product.image);
    document.querySelector('.set-image')?.setAttribute('alt', product.name);

    document.getElementById('descriptionDropdown').innerHTML = `
      <p class="set-text">${product.description}</p>
    `;

    document.getElementById('characteristicsDropdown').innerHTML = `
      <ul>
        <li>Вік: ${product.age}</li>
        <li>Бренд: ${product.brand}</li>
        <li>Об'єм: ${product.volume}</li>
        <li>Колекція: ${product.collection}</li>
        <li>Країна ТМ: ${product.countryTM}</li>
        <li>Зроблено в: ${product.madeIn}</li>
      </ul>
    `;

    document.getElementById('usageDropdown').innerHTML = `
      <p class="set-text">${product.usage}</p>
    `;

    document.getElementById('ingredientsDropdown').innerHTML = `
      <p class="set-text">${product.ingredients}</p>
    `;
    document.getElementById('vidgukDropdown').innerHTML = `
      <ul>
        <li>Олена: ${product.vidguk}</li>
        <li>Катерина: ${product.vidguk1}</li>
      </ul>
    `;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const addToCartBtn = document.querySelector('.add-to-cart');

  if (!addToCartBtn) {
    console.warn('Кнопка не знайдена');
    return;
  }

  addToCartBtn.addEventListener('click', function () {
    const name =
      document.getElementById('productName').textContent || 'Без назви';
    const priceText =
      document.getElementById('productPrice').textContent || '0 грн';
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
    const image = document.getElementById('productImage')?.src || '';

    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) {
      console.error('ID товару не знайдено');
      return;
    }

    const newProduct = {
      id: productId,
      name: productId,
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
