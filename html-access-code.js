document.addEventListener('DOMContentLoaded', function () {
    const accessPopup = document.querySelector('.access-popup');
    const accessCodeInput = document.getElementById('access-code');
    const confirmButton = document.getElementById('confirm-access');
    const errorMessage = document.getElementById('error-message');
    const courseContent = document.getElementById('course-content');
    const timelineSection = document.querySelector('.timeline'); // The timeline section you want to reveal

    const spreadsheetId = '1JkQ4-7lhhVTiyCjgmiQBiQdO4_Wt8jvUxUb6qms33UU'; // Replace with your spreadsheet ID
    const range = 'Sheet3!A2:A'; // Fetching access codes from Sheet3, Column A
    const apiKey = 'AIzaSyAGqSnXJyXoDzocRwTOyMAoX5CXgtbz2DA'; // Replace with your API key
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    let accessCodes = [];

    // Fetch access codes from Google Sheets
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                accessCodes = data.values.flat(); // Flatten the array to get a list of codes
            }
        })
        .catch(error => console.error('Error fetching access codes:', error));

    // Function to validate the access code
    function validateAccessCode() {
        const enteredCode = accessCodeInput.value.trim();

        if (accessCodes.includes(enteredCode)) {
            // Valid code: grant access and make the timeline section visible
            accessPopup.style.display = 'none';  // Hide the access popup
            if (courseContent) {
                courseContent.style.display = 'block'; // Show the course content
            }
            if (timelineSection) {
                timelineSection.style.visibility = 'visible'; // Make the timeline section visible
            }
        } else {
            // Invalid code: show error message
            errorMessage.textContent = 'Invalid access code. Please try again.';
        }
    }

    // Validate access code on button click
    confirmButton.addEventListener('click', validateAccessCode);

    // Validate access code on pressing Enter in the input field
    accessCodeInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            validateAccessCode();
        }
    });
});
