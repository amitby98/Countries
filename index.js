// Load countries from the JSON file
const loadCountries = async () => {
  try {
    const response = await fetch("./CountriesData.json");
    const countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Error loading countries:", error);
  }
};

// Display the countries in the grid
const displayCountries = countries => {
  const countriesGrid = document.getElementById("countries-grid");
  countriesGrid.innerHTML = "";

  countries.forEach(country => {
    const countryItem = document.createElement("a");
    countryItem.href = "#";
    countryItem.className = "country scale-effect";
    countryItem.setAttribute("data-country-name", country.name);

    countryItem.innerHTML = `
      <div class="country-flag">
       <img src="${country.flag}" 
       alt="${country.name}" />
      </div>
      <div class="country-info">
       <h2 class="country-title">${country.name}</h2>
       <ul class="country-brief">
        <li><strong>population: </strong>${country.population}</li>
        <li><strong>Region: </strong>${country.region}</li>
        <li><strong>capital: </strong>${country.capital}</li>
       </ul>
      </div>
      `;

    countryItem.addEventListener("click", event => {
      window.location.href = `details.html`;
    });

    countriesGrid.appendChild(countryItem);
  });
};

// Filter countries by region
const filterCountries = async region => {
  try {
    const response = await fetch("./CountriesData.json");
    const countries = await response.json();
    const filteredCountries = region === "all" ? countries : countries.filter(country => country.region.toLowerCase() === region);
    displayCountries(filteredCountries);
  } catch (error) {
    console.error("Error filtering countries:", error);
  }
};

// Search countries by name when typing in the search input onchange
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", event => {
  const searchValue = event.target.value.toLowerCase();
  const countryItems = document.querySelectorAll(".country");

  countryItems.forEach(item => {
    const countryName = item.getAttribute("data-country-name").toLowerCase();
    if (countryName.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

//dark mode
const darkModeButton = document.getElementById("dark-mode-button");
const body = document.body;

darkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  const themeText = darkModeButton.querySelector(".theme-text");
  if (body.classList.contains("dark-theme")) {
    themeText.textContent = "Light Mode";
  } else {
    themeText.textContent = "Dark Mode";
  }
});

//Load the countries when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadCountries();

  // Filter countries by region when the region is clicked
  const filterWrapper = document.querySelector(".dropdown-wrapper");
  const filterHeader = document.querySelector(".dropdown-header");
  const filterBody = document.querySelector(".dropdown-body");

  filterHeader.addEventListener("click", () => {
    filterWrapper.classList.toggle("open");

    filterBody.addEventListener("click", event => {
      const region = event.target.getAttribute("data-region");
      filterCountries(region);
      filterWrapper.classList.remove("open");
    });
  });
});
