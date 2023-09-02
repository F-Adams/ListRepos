async function listRepos() {
    const gitUser = 'f-adams';  // User's GitHub username
    const gitUrl = `https://api.github.com/users/${gitUser}/repos`; // URL for API Call
    const response = await fetch(gitUrl);   // Fetch the repository list
    const repos = await response.json();    // Wait for the JSON response

    // TODO: Add error checking for failed FETCH

    // Build the output table
    const htTable = document.getElementById("repos");
    const tableTitle = document.getElementById("tableTitle");

    tableTitle.innerHTML = `Public Repositores for ${gitUser}` // Add the table title

    for (let i in repos) {
        // Create a new row for each element in the object
        let row = document.createElement('tr');

        // If no description was given, add a note
        if (repos[i].description === null) {
            repos[i].description = "No description has been entered for this repository."
        }

        // Build each row
        row.innerHTML = (`<tr>
                            <td>${repos[i].name}</td>
                            <td>${repos[i].description}</td>
                            <td><a href="${repos[i].html_url}" target="_new">${repos[i].html_url}</a></td>
                          </tr>`
        )

        // Add the row to the table
        htTable.appendChild(row);
    }
}

listRepos();