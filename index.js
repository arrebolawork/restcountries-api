const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flagImg}" alt="flag" />
              <h1 class="center">${country.name}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");
const continentesSLC = document.getElementById("continentesSLC");

let noRepeatContinente = [];
let allData = [];
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    renderFlags(data);
    let continente = [];
    data.map((data) => {
      data.continents.map((con) => continente.push(con));
      noRepeatContinente = [...new Set(continente)];
    });
  })
  .then(() => {
    noRepeatContinente.forEach((continente) => {
      const optionItem = document.createElement("option");
      optionItem.value = continente;
      optionItem.textContent = continente;
      continentesSLC.appendChild(optionItem);
    });
  });
function selectHandler() {
  countriesNode.innerHTML = "";
  let newfitered = [];
  if (continentesSLC.value === "") {
    newfitered = allData;
  } else {
    newfitered = allData.filter((country) => country.continents.includes(continentesSLC.value));
  }
  renderFlags(newfitered);
}

function renderFlags(array) {
  array.forEach((countryElement) => {
    const country = {
      name: countryElement.name.common,
      flagImg: countryElement.flags.svg,
    };
    const card = document.createElement("div");
    card.innerHTML = cardTemplate(country);
    countriesNode.append(card);
  });
}

continentesSLC.addEventListener("change", selectHandler);
