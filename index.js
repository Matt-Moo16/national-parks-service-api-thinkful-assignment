const apiKey = '7FfoaYoqRhXCB41Ul4yabwixoO7rzJBOkHEevnsl';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

function generateUrl(states, limit) {
    const statesArr = states.split(/,\s|,/)
    const stateMap = statesArr.map(state => 'stateCode=' + state);
    const statesParams = stateMap.join('&');
    const finalUrl = baseUrl + '?' + statesParams + '&limit=' + limit + '&api_key=' + apiKey
    console.log(finalUrl)
    return finalUrl
}

function fetchParks(state, limit) {
    return fetch(generateUrl(state, limit))
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            alert('Something went wrong. Please try again later.')
        }
    })
    .catch(error => alert('Something went wrong. Please try again later.'))

}

function generateResults(responseJson) {
    if (parseInt(responseJson.total) === 0) {
        alert('This is not a state. Please enter a valid state.')
    }
    const resultHtml = responseJson.data.map((result) =>
    $(`
    <li>
    <h3>${result.fullName}</h3>
    <a href="${result.url}">Website</a>
    <h3>Description:</h3>
    <p>${result.description}</p>
    </li>
`));
return resultHtml;
}

function displayResults(displayCode) {
    $('ul').html(displayCode);
}

function handleSubmitButton() {
    $('form').on('submit', event => {
        event.preventDefault()

        const state = $('#state').val().toUpperCase()
        const numOfResults = $('#limit').val()

        fetchParks(state, numOfResults).then(responseJson => generateResults(responseJson)).then(displayCode => displayResults(displayCode))
    });
}

$(handleSubmitButton)