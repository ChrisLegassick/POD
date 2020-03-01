const fetchBtn = document.getElementById('fetch-btn');
const selectedBreed = document.getElementById('breeds');
const imageOutput = document.getElementById('image-output');

fetchBtn.addEventListener('click', fetchDog);

function fetchDog() {
  if (selectedBreed.value === 'random') {
    randomDog();
  } else {
    selectedDog();
  }
}

function randomDog() {
  fetch('https://dog.ceo/api/breeds/image/random/12')
    .then(res => res.json())
    .then(data => {
      const dogImage = data.message;
      imageOutput.innerHTML = dogImage
        .map(
          image => `
        <div class="dog-image">
          <img src="${image}" alt="dog: ${selectedBreed.value}">
        </div>
      `
        )
        .join('');
    });
}

function selectedDog() {
  fetch(`https://dog.ceo/api/breed/${selectedBreed.value}/images/random/12`)
    .then(res => res.json())
    .then(data => {
      const dogImage = data.message;
      imageOutput.innerHTML = dogImage
        .map(
          image => `
        <div class="dog-image">
          <img src="${image}" alt="dog: ${selectedBreed.value}">
        </div>
      `
        )
        .join('');
    });
}

function fillBreedOptions() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
      const breedOptions = data.message;
      for (const breeds in breedOptions) {
        selectedBreed.innerHTML += `
          <option value="${breeds}">${breeds}</option>
        `;
      }
    });
}

fillBreedOptions();
