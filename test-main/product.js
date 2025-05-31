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
  }
});
let cartCount = 0;

const cartCountElement = document.getElementById("cart-count");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    cartCount++;
    cartCountElement.textContent = cartCount;
  }
});
