'use strict';


const apiKey = 'Fzu44deYrqnCFJgrh3Dg9Vd0jqlqcEckyzIz8OvG'; 
const baseURL = 'https://developer.nps.gov/api/v1/parks';

// const options = {
//     headers: new Headers({
//       "X-Api-Key": apiKey})
//   }; 

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <ul id='address'><h3>Address:</h3>
            <li id='line1'>${responseJson.data[i].addresses[0].line1}</li>
            <li id='line2'>${responseJson.data[i].addresses[0].line2}</li>
            <li id='city'>${responseJson.data[i].addresses[0].city}</li>
            <li id='state'>${responseJson.data[i].addresses[0].stateCode}</li>
            <li id='Zip'>${responseJson.data[i].addresses[0].postalCode}</li>
            </ul>
    </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParksByState(searchState, maxResults=10) {
  const params = {
    stateCode: searchState,
    limit: maxResults,
    fields: "addresses",
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

