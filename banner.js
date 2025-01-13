document.addEventListener('DOMContentLoaded', function () {
    const spreadsheetId = '1JkQ4-7lhhVTiyCjgmiQBiQdO4_Wt8jvUxUb6qms33UU'; // Your Google Sheet ID
    const range = 'Sheet2!A:E'; // Fetching Columns A (background color), B (text color), C (text), D (link), E (button visibility)
    const apiKey = 'AIzaSyAGqSnXJyXoDzocRwTOyMAoX5CXgtbz2DA'; // Your API key

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const bannerSection = document.getElementById('banner');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;

            if (rows && rows.length > 0) {
                const bannerData = rows[0]; // First row data
                const backgroundColor = bannerData[0]; // Column A
                const textColor = bannerData[1]; // Column B
                const text = bannerData[2]; // Column C
                const link = bannerData[3]; // Column D
                const buttonVisibility = bannerData[4]; // Column E

                if (text) {
                    bannerSection.style.backgroundColor = backgroundColor;
                    bannerSection.style.color = textColor;

                    let bannerHTML = `<p>${text}</p>`;

                    if (buttonVisibility && link) {
                        // Sanitize the link to ensure it starts with "https://"
                        const sanitizedLink = link.startsWith('https://') ? link : `https://${link}`;
                        bannerHTML += `<a href="${sanitizedLink}" target="_blank" rel="noopener noreferrer">Join Now</a>`;
                    }

                    bannerSection.innerHTML = bannerHTML;
                    bannerSection.style.display = 'flex'; // Make banner visible
                } else {
                    bannerSection.style.display = 'none'; // Hide if no text
                }
            } else {
                bannerSection.style.display = 'none'; // Hide if no data
            }
        })
        .catch(error => console.error('Error fetching data from Google Sheets:', error));
});
