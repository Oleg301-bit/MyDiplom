document.addEventListener('DOMContentLoaded', () => {
  let allProducts = [];
  const container =
    document.getElementById('productsContainer') ||
    document.querySelector('.products-grid');
  const input = document.getElementById('searchInput');
  const icon = document.getElementById('searchIcon');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const sortSelect = document.getElementById('sortSelect');

  
  fetch('http://localhost:5500/api/products')
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((err) => console.error(err));


  icon?.addEventListener('click', () => {
    input.style.display = input.style.display === 'none' ? 'block' : 'none';
    if (input.style.display === 'block') input.focus();
    else {
      input.value = '';
      applyFilters();
    }
  });

  input.addEventListener('input', applyFilters);

  
  checkboxes.forEach((cb) => cb.addEventListener('change', applyFilters));
  sortSelect?.addEventListener('change', applyFilters);

  function applyFilters() {
    let filtered = [...allProducts];
    const query = input.value.toLowerCase().trim();

    if (query) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query));
    }

    const cats = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.id);
    if (cats.length) {
      filtered = filtered.filter((p) => cats.includes(p.category));
    }

    const sort = sortSelect?.value;
    if (sort) {
      filtered.sort((a, b) => {
        if (sort === 'asc') return a.price - b.price;
        if (sort === 'desc') return b.price - a.price;
        if (sort === 'rating-asc') return (a.rating || 0) - (b.rating || 0);
        if (sort === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      });
    }

    renderProducts(filtered);
  }
  document.addEventListener('DOMContentLoaded', function () {
    const sortOptions = document.getElementById('sortOptions');

    sortOptions.addEventListener('click', function (event) {
      const target = event.target.closest('.filter-line');
      if (!target) return;

      const sortType = target.dataset.sort;
      fetchSortedProducts(sortType);
    });

    function fetchSortedProducts(sortType) {
      fetch(`/api/products?sort=${sortType}`)
        .then((res) => res.json())
        .then((products) => {
          renderProducts(products);
        })
        .catch((err) => console.error('Помилка завантаження товарів:', err));
    }

    function renderProducts(products) {
      const container = document.getElementById('productList');
      container.innerHTML = '';

      products.forEach((product) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.dataset.price = product.price;
        div.dataset.rating = product.rating;
        div.textContent = product.name;
        container.appendChild(div);
      });
    }
  });

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
