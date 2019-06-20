'use strict';


const apiKey = 'Fzu44deYrqnCFJgrh3Dg9Vd0jqlqcEckyzIz8OvG'; 
const baseURL = 'https://www.developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.items.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <img src='${responseJson.data[i].url}'>
        <ul id='address'><h3>Address:</h3>
            <li id='line1'>${response.Json.data[i].addresses.line1}</li>
            <li id='line1'>${response.Json.data[i].addresses.line2}</li>
            <li id='city'>${response.Json.data[i].addresses.city}, ${response.Json.data[i].addresses.statecode}, ${response.Json.data[i].addresses.postalcode}</li>
        </ul>
        </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParksByState(searchState, maxResults=10) {
  const params = {
    stateCode: searchState,
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = baseURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParksByState(searchState, maxResults);
  });
}

$(watchForm);