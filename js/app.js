// Create a function that simply writes information to the console.
// Function accepts two parameters:
// info: the information to be written to the console (String, object, array, etc)
// clearConsole: If set to TRUE, clear the console before writing text. Defaults to FALSE
function logInfo(info, clearConsole = false) {
    if (info !== '') {
        if (clearConsole === true) {
            console.clear();
        }
        console.log(info);
    };
};

// displayError(); function.  For now all it does is log the response code to the console
// Script execution is halted at that point
// The completed function should display a message reporting information about the error
function displayError(errorCode) {
    logInfo('There was an error! ' + errorCode);
};

// This is the function that calls the API and handles the response.
// The user-supplied GitHub useranme is passed in from the form.
// if RESPONSE.MESSAGE is '200' then the JSON object is sent to the displayResults function, 
// along with the time taken for the request, and the pagination links (if any)
// Otherwise the displayError function is called to show an error message based on RESPONSE.STATUS
// Possible RESPONSE.STATUS states:
async function getData(gitUser) {
    let start = Date.now();
    logInfo('Starting request...', true);

    const endPoint = `https://api.github.com/users/${gitUser}/repos`; // URL for API Call
    const response = await fetch(endPoint);   // Fetch the repository list

    if (response.status === 200) {
        const paginationLink = response.headers.get('link');
        const repos = await response.json();    // Wait for the JSON response
        let timeTaken = Date.now() - start;
        displayResults(repos, timeTaken, paginationLink);
    } else {
        displayError(response.status);
    };
};

// Display the resutls.
// Needs two parameters: The data to be displayed, and the timeTaken value from the getData function
// The third parameter may or may not contain any data. If it does it will be used in the buildPageLinks function
function displayResults(result, howLong, pagingLinks) {
    // Get the SECTION element, and clear it of any previously generated HTML
    const resultSection = document.getElementById('resultTable');
    resultSection.innerText = '';

    // Create the table and add it to the result section
    const tbl = document.createElement('table');
    tbl.classList.add('resultTable');
    resultSection.appendChild(tbl);

    // Add a caption to the table
    const tblTitle = document.createElement('caption');
    tblTitle.classList.add('tableCaption');
    tblTitle.innerText = `Public Repositories for ${gitUser}`
    tbl.appendChild(tblTitle);

    // Build the THEAD 
    const tblHead = document.createElement('thead');
    const tblHeadRow = document.createElement('tr');

    let tblHeadCell = document.createElement('th');
    tblHeadCell.innerText = 'Repository Name';
    tblHeadRow.appendChild(tblHeadCell);

    tblHeadCell = document.createElement('th');
    tblHeadCell.innerText = 'Description';
    tblHeadRow.appendChild(tblHeadCell);

    tblHeadCell = document.createElement('th');
    tblHeadCell.innerText = 'URL';
    tblHeadRow.appendChild(tblHeadCell);
    tblHead.appendChild(tblHeadRow);

    // Append the THEAD to the table
    tbl.appendChild(tblHead);

    // Build the TBODY (where the search results are displayed)
    const tblBody = document.createElement('tbody');

    // Build and display the results
    // Initialize a variable to count the repos
    let numRepos = 0;

    for (let i in result) {
        // If no description was given, add a note
        if (result[i].description === null) {
            result[i].description = 'No description has been entered for this repository.'
        }

        // Create the hyperlink for the repository URL
        let htmlLink = document.createElement('a');
        htmlLink.innerText = `${result[i].html_url}`
        htmlLink.target = '_blank'; // Make it open in a new window/tab
        htmlLink.href = `${result[i].html_url}`;

        const tblBodyRow = document.createElement('tr');
        let tblBodyCell = document.createElement('td');
        tblBodyCell.innerText = `${result[i].name}`
        tblBodyRow.appendChild(tblBodyCell);

        tblBodyCell = document.createElement('td');
        tblBodyCell.innerText = `${result[i].description}`
        tblBodyRow.appendChild(tblBodyCell);

        tblBodyCell = document.createElement('td');
        tblBodyCell.appendChild(htmlLink);
        tblBodyRow.appendChild(tblBodyCell);

        tblBody.appendChild(tblBodyRow);

        // Increment the repo counter
        numRepos++;
    }
    // Append the TBODY to the table
    tbl.appendChild(tblBody);

    // Build the TFOOT
    const tblFooter = document.createElement('tfoot');
    const tblFooterRow = document.createElement('tr');
    const tblFooterCell = document.createElement('td');

    tblFooterCell.classList.add('result');
    tblFooterCell.colSpan = 3;
    tblFooterCell.innerText = `Found ${numRepos} repositories in ${howLong / 1000} seconds`;

    tblFooterRow.appendChild(tblFooterCell);
    tblFooter.appendChild(tblFooterRow);

    // Append the TFOOT to the table
    tbl.appendChild(tblFooter);

    // TODO: Build the pagination links

    // Log some information the the console
    if (pagingLinks) {
        logInfo(pagingLinks);
    };
    logInfo(`Total time taken: ${howLong} milliseconds for ${numRepos} repos for GitHub user: ${gitUser}`);
    logInfo(tbl); // All generated HTML is output to the console, for QA purposes
}

// Get the form element
const searchForm = document.getElementById('searchForm');

// Add an event listener to the form, listening for SUBMIT
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the user submitted GitHub username to search for
    let inputField = document.getElementById('gitUser');
    let searchTerm = inputField.value;

    // Handle the input
    if (searchTerm === '') {
        // If no username was submitted, let's use a random hard coded default (This would not happen in production)
        // TODO: Implement proper input validation and error handling
        let randomNames = ['Amzn', 'Apple', 'AWS', 'CodeLouisville', 'F-Adams', 'Facebook', 'GitHub', 'Google', 'Hongkiat', 'Microsoft', 'Pluralsight', 'YouTube'];
        let imFeelingLucky = Math.floor(Math.random() * randomNames.length);
        gitUser = randomNames[imFeelingLucky];
    } else {
        gitUser = searchTerm;
    }

    // Clear the form input
    inputField.value = '';

    getData(gitUser);
});