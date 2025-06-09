document.addEventListener('DOMContentLoaded', () => {
  let allProducts = [];
  const container =
    document.getElementById('productsContainer') ||
    document.querySelector('.products-grid');
  const input = document.getElementById('searchInput');
  const icon = document.getElementById('searchIcon');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const sortOptions = document.getElementById('sortOptions');

  // Завантаження товарів
  fetch('http://localhost:5500/api/products')
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((err) => console.error(err));

  // Пошук
  icon?.addEventListener('click', () => {
    input.style.display = input.style.display === 'none' ? 'block' : 'none';
    if (input.style.display === 'block') input.focus();
    else {
      input.value = '';
      applyFilters();
    }
  });

  input?.addEventListener('input', applyFilters);
  checkboxes.forEach((cb) => cb.addEventListener('change', applyFilters));

  // Обробка кліку на сортування
  sortOptions?.addEventListener('click', function (event) {
    const target = event.target.closest('.filter-line');
    if (!target) return;

    const sortValue = target.getAttribute('value');
    applyFilters(sortValue);
  });

  function applyFilters(sort = null) {
    let filtered = [...allProducts];
    const query = input?.value.toLowerCase().trim() || '';

    // Пошук
    if (query) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query));
    }

    // Фільтр за категоріями
    const cats = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.id);
    if (cats.length) {
      filtered = filtered.filter((p) => cats.includes(p.category));
    }

    // Сортування
    if (sort) {
      if (sort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating-asc') {
        filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      } else if (sort === 'rating-desc') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }

    renderProducts(filtered);
  }

  // Відображення товарів
  function renderProducts(products) {
    container.innerHTML = '';
    products.forEach((p) => {
      const el = document.createElement('div');
      el.classList.add('product');
      el.innerHTML = `
        <a href="product.html?id=${p._id}">
          <img src="${p.image}" alt="${p.name}" class="set-image">
        </a>
        <p>${p.name}</p>
        <p class="price">${p.price} грн</p>
        <p class="rating">⭐ Рейтинг: ${p.rating ?? 'Немає'}</p>
      `;
      container.appendChild(el);
    });
  }
});
