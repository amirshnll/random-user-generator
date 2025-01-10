# random-user-generator

A browser extension to display and generate random user profiles instantly. This project leverages external APIs and resources to provide a seamless and interactive experience.

## Features

- Generate random user profiles, including name, email, phone, and more.
- Display additional user details, such as location, login information, and date of birth.
- Dynamic navigation between user data categories (e.g., Basic Info, Location, Login Info).
- Supports user nationality and displays corresponding country flags.

## Data Sources

- **Flags Data**: [https://flagicons.lipis.dev](https://flagicons.lipis.dev)
- **Users Data**: [https://randomuser.me](https://randomuser.me)

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/random-user-generator.git
   ```

2. Open `index.html` in a browser to launch the app.

3. Click the "Generate Random User" button to display a new profile.

## Implementation Details

### Frontend

The frontend is designed using:

- **HTML**: Structure of the webpage.
- **Bootstrap**: Styling and layout.
- **JavaScript**: Dynamic fetching and display of user data.

### Backend

- **Python Scripts**: `fetcher.py` and `main.py` handle API integration and data processing.

### File Breakdown

- `index.html`: Main HTML file containing the layout and logic for user interaction.
- `fetcher.py`: Script for fetching user data from the API.
- `main.py`: Logic for managing data and ensuring smooth operations.

## How It Works

1. **Data Loading**: On page load, the app fetches user data from the [Random User Generator API](https://randomuser.me) and stores it locally.
2. **Random Selection**: Each time the "Generate Random User" button is clicked, a random user profile is displayed.
3. **Dynamic Rendering**: The app dynamically updates sections of the page with the fetched data, including a user's name, email, and even a flag for their nationality.

## Future Improvements

- Adding more customization options for the generated profiles.
- Improving the design and accessibility of the application.
- Extending support for additional data APIs.

## Demo

https://amirshnll.github.io/random-user-generator

---

Contributions are welcome! Feel free to fork the repository and create pull requests for enhancements or bug fixes.
