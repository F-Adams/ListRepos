async function listRepos(gitUser) {

    // Start timing the function
    let start = Date.now();

    const gitUrl = `https://api.github.com/users/${gitUser}/repos`; // URL for API Call
    const response = await fetch(gitUrl);   // Fetch the repository list
    const repos = await response.json();    // Wait for the JSON response

    // Finish timing the function
    let timeTaken = Date.now() - start;

    // TODO: Add error checking for failed FETCH
    // TODO: Handle result pagination

    // Display the search results
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
    tbl.appendChild(tblHead);

    // Add a row to the THEAD (TR element)
    const tblHeadRow = document.createElement('tr');

    // Add the header cells to the row (TH element)
    let tblHeadCell = document.createElement('th');
    tblHeadCell.innerText = 'Repository Name';
    tblHeadRow.appendChild(tblHeadCell);

    tblHeadCell = document.createElement('th');
    tblHeadCell.innerText = 'Description';
    tblHeadRow.appendChild(tblHeadCell);

    tblHeadCell = document.createElement('th');
    tblHeadCell.innerText = 'URL';
    tblHeadRow.appendChild(tblHeadCell);

    // Append the row of TH elements to the THEAD
    tblHead.appendChild(tblHeadRow);

    // Append the THEAD to the table
    tbl.appendChild(tblHead);

    // Build the TBODY (where the search results are displayed)
    const tblBody = document.createElement('tbody');
    tbl.appendChild(tblBody);

    // Build and display the results
    // Initialize a variable to count the repos
    let numRepos = 0;

    for (let i in repos) {
        // If no description was given, add a note
        if (repos[i].description === null) {
            repos[i].description = 'No description has been entered for this repository.'
        }

        // Create the hyperlink for the repository URL
        let htmlLink = document.createElement('a');
        htmlLink.innerText = `${repos[i].html_url}`
        htmlLink.target = '_blank'; // Make it open in a new window/tab
        htmlLink.href = `${repos[i].html_url}`;

        // Add a row to the TBODY
        const tblBodyRow = document.createElement('tr');
        tblBody.appendChild(tblBodyRow);

        // Add the result cells to the row (TD element)
        let tblBodyCell = document.createElement('td');
        tblBodyCell.innerText = `${repos[i].name}`
        tblBodyRow.appendChild(tblBodyCell);

        tblBodyCell = document.createElement('td');
        tblBodyCell.innerText = `${repos[i].description}`
        tblBodyRow.appendChild(tblBodyCell);

        tblBodyCell = document.createElement('td');
        tblBodyCell.appendChild(htmlLink);
        tblBodyRow.appendChild(tblBodyCell);

        // Increment the repo counter
        numRepos++;
    }

    // Build the TFOOT
    const tblFooter = document.createElement('tfoot');
    tbl.appendChild(tblFooter);

    const tblFooterRow = document.createElement('tr');
    tblFooter.appendChild(tblFooterRow);

    const tblFooterCell = document.createElement('td');
    tblFooterCell.classList.add('result');
    tblFooterCell.colSpan = 3;
    tblFooterCell.innerText = `Found ${numRepos} repositories in ${timeTaken / 1000} seconds`;
    tblFooterRow.appendChild(tblFooterCell);

    console.clear();
    console.log(`Total time taken: ${timeTaken} milliseconds for ${numRepos} repos for GitHub user: ${gitUser}`);
    console.log(tbl);
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
        let randomNames = ['Amzn', 'AWS', 'F-Adams', 'Google', 'Pluralsight', 'GitHub', 'CodeLouisville', 'Facebook', 'YouTube', 'Microsoft', 'Apple'];
        let imFeelingLucky = Math.floor(Math.random() * randomNames.length);
        gitUser = randomNames[imFeelingLucky];
    } else {
        gitUser = searchTerm;
    }

    // Clear the form input
    inputField.value = '';

    listRepos(gitUser);
});