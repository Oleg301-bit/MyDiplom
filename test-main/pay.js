const cityInput = document.getElementById('city');
const districtInput = document.getElementById('district');
const branchOutput = document.getElementById('branch');
const orderNumberOutput = document.getElementById('orderNumber');
const pickupTimeOutput = document.getElementById('pickupTime');

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(startDate, endDate) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTimestamp = generateRandomNumber(start, end);
  return new Date(randomTimestamp);
}

function getRandomTime() {
  const hour = generateRandomNumber(9, 19);
  const minute = generateRandomNumber(0, 1) === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
}

function tryGenerate() {
  const city = cityInput.value.trim();
  const district = districtInput.value.trim();

  if (city && district) {
    const branchNumber = generateRandomNumber(1, 50);
    const orderNum = generateRandomNumber(100000, 999999);

    const randomDate = getRandomDate(
      new Date('2025-05-06'),
      new Date('2025-05-29')
    );
    const formattedDate = `${randomDate
      .getDate()
      .toString()
      .padStart(2, '0')}.${(randomDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${randomDate.getFullYear()}`;
    const time = getRandomTime();

    branchOutput.textContent = `Найближче відділення Нової пошти №${branchNumber}.`;
    orderNumberOutput.textContent = `Номер вашого замовлення: ${orderNum}.`;
    pickupTimeOutput.textContent = `Замовлення буде Вас очікувати: ${formattedDate}  о ${time}. Ви можете забрати товар впродовж 3 діб.`;
  } else {
    branchOutput.textContent = '';
    orderNumberOutput.textContent = '';
    pickupTimeOutput.textContent = '';
  }
}

cityInput.addEventListener('input', tryGenerate);
districtInput.addEventListener('input', tryGenerate);
