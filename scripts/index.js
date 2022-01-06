const host = 'http://localhost:3000'
const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", currencyDisplay: "symbol" })

// View Updates

const updateCount = (data) => {
  document.getElementById('count').innerHTML = `${new Intl.NumberFormat().format(parseInt(data.count))} orders`
}

const updateCountries = (data) => {
  const dropdown = document.getElementById('countries');
  dropdown.innerHTML = '<option selected value="">All countries selected</option>';
  data.countries.forEach((country) => {
    const list = `<option value="${country}">${country}</option>`
    dropdown.insertAdjacentHTML('beforeend', list)
  });
}

const updateSummary = (data) => {
  document.getElementById('revenue').innerHTML=`${euros.format(data.revenue)}`
  document.getElementById('average').innerHTML=`${euros.format(data.average_per_order)}`
  document.getElementById('customers').innerHTML=`${data.customers}`
}

const updateChart = (chart) => {
  document.getElementById('chart').innerHTML = chart
  console.log(chart)
}

// API calls

const fetchCountries = () => {
  fetch(host,{ headers: { 'Accept': 'application/json' } } )
  .then(res => res.json())
  .then((data) => {
    updateCountries(data);
    addCountriesListener(data);
  })
}

const fetchData = (country) => {
  fetch(`${host}?country=${country}`,{ headers: { 'Accept': 'application/json' } } )
  .then(res => res.json())
  .then((data) => {
    updateCount(data);
    updateSummary(data);
  })
}

const fetchChart = (country) => {
  fetch(`${host}/chart?country=${country}`,{ headers: { 'Accept': 'text/plain' } } )
  .then(res => res.text())
  .then((chart) => {
    updateChart(chart);
  })
}

// Listeners & triggers

const update = (country) => {
  fetchData(country);
  fetchChart(country);
}

window.onload = () => {
  fetchCountries();
  update('');
}

function addCountriesListener(data) {
  document.getElementById('countries').childNodes.forEach((elt) => {
    elt.addEventListener('click', (e) => {
      update(elt.value )
    })
  })
}
