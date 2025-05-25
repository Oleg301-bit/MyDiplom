function toggleDropdown(id, arrowId) {
  const dropdown = document.getElementById(id);
  const arrow = document.getElementById(arrowId);

  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
    arrow.textContent = '▼';
  } else {
    dropdown.style.display = 'block';
    arrow.textContent = '▲';
  }
}
const addReviewBtn = document.getElementById('add-review-btn');
const reviewForm = document.getElementById('review-form');
const saveReviewBtn = document.getElementById('save-review-btn');
const reviewText = document.getElementById('review-text');
const mainBlock = document.querySelector('.main-block');

addReviewBtn.addEventListener('click', () => {
  reviewForm.style.display = 'block';
});

saveReviewBtn.addEventListener('click', () => {
  const text = reviewText.value.trim();
  if (text !== '') {
    const newReview = document.createElement('div');
    newReview.classList.add('flex-set');
    newReview.innerHTML = `
      <div class="column-setting">
        <i class="fa-solid fa-user"></i>
      </div>
      <p>${text}</p>
    `;
    mainBlock.appendChild(newReview);
    reviewText.value = '';
    reviewForm.style.display = 'none';
  } else {
    alert('Будь ласка, напишіть відгук!');
  }
});
