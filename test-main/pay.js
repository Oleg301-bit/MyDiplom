const cityInput = document.getElementById('city');
const districtInput = document.getElementById('district');
const branchOutput = document.getElementById('branch');
const orderNumberOutput = document.getElementById('orderNumber');

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tryGenerate() {
  const city = cityInput.value.trim();
  const district = districtInput.value.trim();

  if (city && district) {
    const branchNumber = generateRandomNumber(1, 50);
    const orderNum = generateRandomNumber(100000, 999999);

    branchOutput.textContent = `Найближче відділення нової пошти №${branchNumber}`;
    orderNumberOutput.textContent = `Номер вашого замовлення: ${orderNum}`;
  } else {
    branchOutput.textContent = '';
    orderNumberOutput.textContent = '';
  }
}

cityInput.addEventListener('input', tryGenerate);
districtInput.addEventListener('input', tryGenerate);
