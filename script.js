document.addEventListener("DOMContentLoaded", function() {
    // Mock API URL (replace with your actual API endpoint)
    const apiUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev';
    
    // Your API username and password (replace with your actual credentials)
    const username = 'coalition';
    const password = 'skills-test';
    
    // Create the Basic Authentication header
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    // Fetch data from the API
    fetch(apiUrl, {
        headers: {
            'Authorization': authHeader
        }
    })
    .then(response => response.json())
    .then(data => {
        const patient = data[0]; // Select the first patient in the array
        displayDiagnosisTable(patient.diagnostic_list);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    function displayDiagnosisTable(diagnostic_list) {
        const tableBody = document.querySelector('#diagnosisTable tbody');
        diagnostic_list.forEach(diagnosis=> {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${diagnosis.name}</td>
                <td>${diagnosis.description}</td>
                <td>${diagnosis.status}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});

