function toggleMenu() {
    const nav = document.querySelector('header nav ul');
    nav.classList.toggle('show');
  }
  
  // Close the menu if clicked outside the hamburger or the menu
  document.addEventListener('click', function(event) {
    const nav = document.querySelector('header nav ul');
    const hamburger = document.querySelector('.hamburger');
    
    // Check if the click was outside the menu and hamburger
    if (!hamburger.contains(event.target) && !nav.contains(event.target)) {
      nav.classList.remove('show');  // Close the menu
    }
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    const timelineContainer = document.getElementById('timeline-container');
    const popup = document.getElementById('task-popup');
    const popupClose = document.getElementById('popup-close');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');

    const spreadsheetId = '1JkQ4-7lhhVTiyCjgmiQBiQdO4_Wt8jvUxUb6qms33UU'; // Replace with your spreadsheet ID
    const range = 'Sheet1!A:E'; // Fetching Columns A to E
    const apiKey = 'AIzaSyAGqSnXJyXoDzocRwTOyMAoX5CXgtbz2DA'; // Replace with your API key
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;

            rows.forEach(row => {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');

                const title = row[0] || 'No Title'; // Column A (Task Title)
                const description = row[1] || 'No Description'; // Column B (Description)
                const taskLink = row[2]; // Column C (Task Button)
                const submitLink = row[3]; // Column D (Submit Button)
                const lockStatus = row[4]; // Column E (Lock Status)

                // Check if the lock status is empty
                if (!lockStatus) {
                    timelineItem.classList.add('locked'); // Apply locked styling
                }

                // Constructing the timeline item
                let buttonsHTML = '';
                if (taskLink) {
                    buttonsHTML += `<button class="task-btn" data-description="${description}" data-link="${taskLink}">View Task</button>`;
                }
                if (submitLink) {
                    buttonsHTML += `<button class="submit-btn" data-link="${submitLink}">Submit</button>`;
                }

                // Add the buttons only if there is at least one valid link
                timelineItem.innerHTML = `
                    <h3>${title}</h3>
                    <div class="content">
                        ${buttonsHTML}
                    </div>
                `;

                // Add lock icon if locked
                if (!lockStatus) {
                    const lockIcon = document.createElement('span');
                    lockIcon.classList.add('lock-icon');
                    lockIcon.innerHTML = '&#128274;';
                    timelineItem.appendChild(lockIcon);
                }

                timelineContainer.appendChild(timelineItem);
            });

            // Add event listeners for task and submit buttons
            document.querySelectorAll('.task-btn').forEach(button => {
                button.addEventListener('click', function (event) {
                    const description = event.target.getAttribute('data-description');
                    openTaskPopup(description);
                });
            });

            document.querySelectorAll('.submit-btn').forEach(button => {
                button.addEventListener('click', function (event) {
                    const link = event.target.getAttribute('data-link');
                    if (link) {
                        openLinkInNewTab(link);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data from Google Sheets:', error));

    // Function to open the task popup
    function openTaskPopup(description) {
        popupTitle.innerText = "Task Details"; // Static title
        popupDescription.innerText = description; // Description from the row
        popup.style.display = 'flex'; // Show the popup
    }

    // Close the popup when the close button is clicked
    popupClose.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Close the popup if the user clicks outside the popup content
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Function to open links in a new tab
    function openLinkInNewTab(url) {
        window.open(url, '_blank');
    }
});
