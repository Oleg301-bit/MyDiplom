document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const container = document.querySelector('.products-grid');
  let allProducts = [];
  fetch('http://localhost:5500/api/products')
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((err) => console.error('Помилка завантаження товарів:', err));

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', filterProducts);
  });

  function filterProducts() {
    const selectedCategories = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.id);

    const filtered = selectedCategories.length
      ? allProducts.filter((product) =>
          selectedCategories.includes(product.category)
        )
      : allProducts;

    renderProducts(filtered);
  }

  function renderProducts(products) {
    container.innerHTML = '';
    products.forEach((product) => {
      container.innerHTML += `
        <div class="product">
          <a href="product.html?id=${String(product._id)}">
            <img src="${product.image}" alt="${
        product.name
      }" class="set-image" data-id="${product._id}" />
          </a>
          <p>${product.name}</p>
          <p class="price">${product.price} грн</p>
          <p class="rating">⭐ Рейтинг: ${product.rating ?? 'Немає'}</p>
        </div>
      `;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('searchIcon');
  const input = document.getElementById('searchInput');

  icon.addEventListener('click', () => {
    const isHidden = input.style.display === 'none';
    input.style.display = isHidden ? 'inline-block' : 'none';
    if (isHidden) input.focus();
    else {
      input.value = '';
      filterProducts('');
    }
  });
  input.addEventListener('input', () => {
    const searchValue = input.value.toLowerCase().trim();
    filterProducts(searchValue);
  });

  function filterProducts(query) {
    const products = document.querySelectorAll('.product');
    products.forEach((product) => {
      const text = product.textContent.toLowerCase();
      product.style.display = text.includes(query) ? 'block' : 'none';
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const sortSelect = document.getElementById('sortSelect');
  const productsGrid = document.querySelector('.products-grid');

  sortSelect.addEventListener('change', () => {
    const sortType = sortSelect.value;
    const products = Array.from(productsGrid.querySelectorAll('.product'));

    if (sortType === 'asc' || sortType === 'desc') {
      products.sort((a, b) => {
        const priceA = parseInt(
          a.querySelector('.price').textContent.replace(/\D/g, '')
        );
        const priceB = parseInt(
          b.querySelector('.price').textContent.replace(/\D/g, '')
        );
        return sortType === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (sortType === 'rating-asc' || sortType === 'rating-desc') {
      products.sort((a, b) => {
        const ratingA =
          parseFloat(
            a.querySelector('.rating').textContent.replace(/[^\d.]/g, '')
          ) || 0;
        const ratingB =
          parseFloat(
            b.querySelector('.rating').textContent.replace(/[^\d.]/g, '')
          ) || 0;
        return sortType === 'rating-asc'
          ? ratingA - ratingB
          : ratingB - ratingA;
      });
    }

    productsGrid.innerHTML = '';
    products.forEach((product) => productsGrid.appendChild(product));
  });
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").textContent = cart.length;


fetch('http://localhost:5500/api/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("productsContainer");

    products.forEach(product => {
      const card = document.createElement("div");
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price} грн</p>
        <button class="add-to-cart"
          data-id="${product._id}"
          data-name="${product.name}"
          data-price="${product.price}">
          Додати у кошик
        </button>
      `;
      container.appendChild(card);
    });
  });


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price)
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").textContent = cart.length;
  }
});
