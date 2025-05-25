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
    }

    productsGrid.innerHTML = '';
    products.forEach((product) => productsGrid.appendChild(product));
  });
});
