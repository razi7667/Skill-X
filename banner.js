document.addEventListener('DOMContentLoaded', function() {
    // Fetch data for the banner from Google Sheets (Sheet2)
    const spreadsheetId = '1JkQ4-7lhhVTiyCjgmiQBiQdO4_Wt8jvUxUb6qms33UU'; // Your Google Sheet ID
    const range = 'Sheet2!A:D'; // Fetching Columns A (background color), B (text color), C (text), D (link)
    const apiKey = 'AIzaSyAGqSnXJyXoDzocRwTOyMAoX5CXgtbz2DA'; // Your API key

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const bannerSection = document.getElementById('banner');
            
            if (rows && rows.length > 0) {
                // Assume the first row in Sheet2 is the banner info
                const bannerData = rows[0]; // Getting the first row data (A, B, C, D)

                const backgroundColor = bannerData[0]; // Column A: Background Color
                const textColor = bannerData[1]; // Column B: Text Color
                const text = bannerData[2]; // Column C: Text
                const link = bannerData[3]; // Column D: Link to the Text
                
                // Check if text is available, otherwise hide the banner
                if (text) {
                    // Set background and text color styles
                    bannerSection.style.backgroundColor = backgroundColor;
                    bannerSection.style.color = textColor;

                    // Add the text and link to the banner
                    bannerSection.innerHTML = `
                        <p>${text}</p>
                        <a href="${link}" target="_blank">Join Now</a>
                    `;
                    bannerSection.style.display = 'flex'; // Ensure banner is visible if data exists
                } else {
                    // If no text, hide the banner
                    bannerSection.style.display = 'none';
                }
            } else {
                // If no data, hide the banner
                bannerSection.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching data from Google Sheets:', error));
});
