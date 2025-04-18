const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flagImg}" alt="flag" />
              <h1 class="center">${country.name}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.map((data) => {
      const country = {
        name: data.name.common,
        flagImg: data.flags.svg,
      };
      const card = document.createElement("div");
      card.innerHTML = cardTemplate(country);
      countriesNode.append(card);
    });
  });
