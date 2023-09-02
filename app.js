async function listRepos() {
    const gitUser = 'f-adams';
    const gitUrl = `https://api.github.com/users/${gitUser}/repos`;
    const response = await fetch(gitUrl);
    const repos = await response.json();

    const htTable = document.getElementById("repos");
    const tableTitle = document.getElementById("tableTitle");

    tableTitle.innerHTML = `Public Repositores for ${gitUser}`;

    for (let i in repos) {
        let row = document.createElement('tr');

        if (repos[i].description === null) {
            repos[i].description = "No description has been entered for this repository."
        }

        row.innerHTML = (`<tr>
                            <td>${repos[i].name}</td>
                            <td>${repos[i].description}</td>
                            <td><a href="${repos[i].html_url}" target="_new">${repos[i].html_url}</a></td>
                          </tr>`
        )

        htTable.appendChild(row);
    }
}

listRepos();