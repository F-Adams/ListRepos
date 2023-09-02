async function listRepos() {
    const gitUser = 'F-Adams';  // User's GitHub username
    const gitUrl = `https://api.github.com/users/${gitUser}/repos`; // URL for API Call
    const response = await fetch(gitUrl);   // Fetch the repository list
    const repos = await response.json();    // Wait for the JSON response

    // TODO: Add error checking for failed FETCH

    // Build the output table

    const tableTitle = document.getElementById('tableTitle');
    const tBody = document.getElementById('tBody');

    tableTitle.innerText = `Public Repositores for ${gitUser}` // Add the table title

    for (let i in repos) {
        // Create a new row for each element in the object


        // If no description was given, add a note
        if (repos[i].description === null) {
            repos[i].description = 'No description has been entered for this repository.'
        }

        // Insert a new row
        let newRow = tBody.insertRow(i);

        // Insert the cells
        let firstCell = newRow.insertCell(0);
        let secondCell = newRow.insertCell(1);
        let thirdCell = newRow.insertCell(2);

        // Add the object data to the cells
        firstCell.innerText = repos[i].name;
        secondCell.innerText = repos[i].description;
        thirdCell.insertAdjacentHTML('afterbegin', `<a href="${repos[i].html_url}" target="_blank">${repos[i].html_url}</a>`);


        // Build each cell
        // newRow.appendChild(newCell);
        // newCell.innerText = repos[i].name;


        // newRow.appendChild(newCell);
        // newCell.innerText = repos[i].description;

        // newRow.appendChild(newCell);
        // newCell.innerText = repos[i].html_url;

        // row.innerHTML = (`<tr>
        //                     <td>${repos[i].name}</td>
        //                     <td>${repos[i].description}</td>
        //                     <td><a href="${repos[i].html_url}" target="_new">${repos[i].html_url}</a></td>
        //                   </tr>`
        // )

        // Add the row to the table
        // tBody.appendChild(row);
    }
}

listRepos();