document.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('searchIcon');
  const input = document.getElementById('searchInput');

  // Показати/сховати поле вводу
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
