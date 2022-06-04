// spinner function 
const spinner = state => {
  document.getElementById('spinner').style.display = state;
}

// button clicking function
const buttonClicked = () => {
  const input = document.getElementById('inputField');
  const inputVlaue = input.value.toLowerCase();
  if (inputVlaue == 'iphone' || inputVlaue == 'apple' || inputVlaue == 'oppo' || inputVlaue == 'galaxy' || inputVlaue == 'samsung'
    || inputVlaue == 'huawei') {
    const inputBrand = inputVlaue;
    const mainArea = document.getElementById('searchResultArea');
    mainArea.innerHTML = '';
    const detailArea = document.getElementById('detailArea');
    detailArea.innerHTML = '';
    spinner('block');
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputBrand}`)
      .then(res => res.json())
      .then(data => getResult(data.data))
    const area = document.getElementById('searchResultArea');
    area.innerHTML = '';
  }
  else {
    spinner('block');
    const area = document.getElementById('searchResultArea');
    area.innerHTML = `
    <p class="d-flex justify-content-center text-danger">No Phone Found</p>
    `;
    const detailArea = document.getElementById('detailArea');
    detailArea.innerHTML = '';
    spinner('none');
  }
  document.getElementById('inputField').value = '';

}

//result showing 
const getResult = brands => {
  const area = document.getElementById('searchResultArea')
  const first20 = brands.slice(0, 20);
  for (const brand of first20) {
    const image = brand.image;
    const model = brand.slug;
    const name = brand.phone_name;
    const brandName = brand.brand;
    spinner('none')
    const div = document.createElement('div')
    div.classList = 'col-lg-4 col-sm-4'
    div.innerHTML = `<div class="card border-0 text-center mx-auto" style="width: 10rem;">
        <img height='200px' width='100px' src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${brandName}</p>
          <a href="#" onclick="detail('${model}')" class="btn btn-primary">View Details</a>
        </div>
      </div>`;
    area.appendChild(div);
  }
}

// detail showing 
const detail = model => {
  fetch(`https://openapi.programming-hero.com/api/phone/${model}`)
    .then(res => res.json())
    .then(data => showDetials(data.data))
}

const showDetials = data => {
  const image = data.image;
  console.log(data);
  const chip = data.mainFeatures.chipSet;
  const display = data.mainFeatures.displaySize;
  const memory = data.mainFeatures.memory;
  const name = data.name;
  const date = data.releaseDate ? data.releaseDate : "Release Date Not Found";
  const brandName = data.brand;
  const otherBluetooth = data.others?.Bluetooth ? data.others.Bluetooth : "Bluetooth Information Not Found";
  const otherGPS = data.others?.GPS ? data.others.GPS : "GPS Information Not Found";
  const otherNFC = data.others?.NFC ? data.others.NFC : "NFC Information Not Found";
  const otherRadio = data.others?.Radio ? data.others.Radio : "Radio Information Not Found";
  const otherUSB = data.others?.USB ? data.others.USB : "USB Information Not Found";
  const otherWLAN = data.others?.WLAN ? data.others.WLAN : "WLAN Information Not Found";
  const sensor = data.mainFeatures.sensors;
  const detailArea = document.getElementById('detailArea')
  detailArea.innerHTML = `
  <div class='w-50 mx-auto'>
    <div class="row d-flex align-items-center gx-5">
      <div class="col-5"><img height='300px' width='100px' src="${image}" class="card-img-top" alt="..."></div>
      <div class="col-7 mt-5"><h3 class="card-title">${name}</h3>
      <h5 class="card-text">${brandName}</h5>
      <p class="card-text">${date}</p>
      <p class="card-text"><b>Bluetooth:</b> ${otherBluetooth}</p>
      <p class="card-text"><b>Procesor:</b> ${chip}</p>
      <p class="card-text"><b>Display:</b> ${display}</p>
      <p class="card-text"><b>Storage:</b> ${memory}</p>
      <p class="card-text"><b>GPS:</b> ${otherGPS}</p>
      <p class="card-text"><b>NFC:</b> ${otherNFC}</p>
      <p class="card-text"><b>Radio:</b> ${otherRadio}</p>
      <p class="card-text"><b>USB:</b> ${otherUSB}</p>
      <p class="card-text"><b>WLAN:</b> ${otherWLAN}</p>
      <p class="card-text"><b>Sensors:</b> ${sensor}</p></div>
    </div>
  </div>
    `;
}