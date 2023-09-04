async function listRepos(gitUser) {

    // Start timing the function
    let start = Date.now();

    const gitUrl = `https://api.github.com/users/${gitUser}/repos`; // URL for API Call
    const response = await fetch(gitUrl);   // Fetch the repository list
    const repos = await response.json();    // Wait for the JSON response
    let numRepos = 0;

    // TODO: Add error checking for failed FETCH
    // TODO: Build full table programmatically

    // Build the output table
    const tableTitle = document.getElementById('tableTitle');
    const tBody = document.getElementById('tBody');
    const result = document.getElementById('result');

    tableTitle.innerText = `Public Repositories for ${gitUser}` // Add the table title

    for (let i in repos) {
        // If no description was given, add a note
        if (repos[i].description === null) {
            repos[i].description = 'No description has been entered for this repository.'
        }

        // Create the hyperlink for the repository URL
        let htmlLink = document.createElement('a');
        let linkText = document.createTextNode(`${repos[i].html_url}`);
        htmlLink.appendChild(linkText);
        htmlLink.target = '_blank'; // Make it open in a new window/tab
        htmlLink.href = `${repos[i].html_url}`;

        // Insert a new row
        let newRow = tBody.insertRow(i);

        // Insert the cells
        let firstCell = newRow.insertCell(0);
        let secondCell = newRow.insertCell(1);
        let thirdCell = newRow.insertCell(2);

        // Add the object data to the cells
        firstCell.innerText = repos[i].name;
        secondCell.innerText = repos[i].description;
        thirdCell.appendChild(htmlLink);
        numRepos++;
    }

    // Finish timing the function
    let timeTaken = Date.now() - start;

    // Write the timing results
    result.innerText = 'Found ' + numRepos + ' repositories in ' + timeTaken / 1000 + ' seconds';
    console.log('Total time taken : ' + timeTaken + ' milliseconds for ' + numRepos + ' repos');
}

// TODO: Build a form to allow the user to input a GitHub username
listRepos('colt');