let users = []; // Variable to store user data

// Function to load users from the JSON file
async function loadUsers() {
    try {
        const response = await fetch("https://amirshnll.github.io/random-user-generator/data/data.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        users = await response.json();
        generateRandomUser(); // Generate a random user after loading the data
    } catch (error) {
        console.error("Error loading users:", error);
        alert("Failed to load user data.");
    }
}

// Function to generate a random user
function generateRandomUser() {
    if (users.length === 0) return; // Ensure data exists

    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];

    // Update Basic Info Tab
    document.getElementById("user-avatar").src = `https://amirshnll.github.io/random-user-generator/avatars/${user.picture.url}`;
    document.getElementById("user-name").textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
    document.getElementById("user-email").querySelector("span").textContent = user.email;
    document.getElementById("user-phone").querySelector("span").textContent = user.phone;

    // Update Location Tab
    document.getElementById("user-location").querySelector("span").textContent =
        `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`;
    document.getElementById("user-coordinates").querySelector("span").textContent =
        `Lat: ${user.location.coordinates.latitude}, Long: ${user.location.coordinates.longitude}`;
    document.getElementById("user-timezone").querySelector("span").textContent =
        `${user.location.timezone.description} (Offset: ${user.location.timezone.offset})`;

    // Update Login Info Tab
    document.getElementById("user-username").querySelector("span").textContent = user.login.username;
    document.getElementById("user-uuid").querySelector("span").textContent = user.login.uuid;
    document.getElementById("user-password").querySelector("span").textContent = user.login.password;

    // Update Other Info Tab
    document.getElementById("user-dob").querySelector("span").textContent = `${user.dob.date} (Age: ${user.dob.age})`;
    document.getElementById("user-registered").querySelector("span").textContent = `${user.registered.date} (Years: ${user.registered.age})`;
    document.getElementById("user-id").querySelector("span").textContent = `${user.id.name}: ${user.id.value}`;
    document.getElementById("user-nationality").querySelector("span").textContent = user.nat;

    // Update Country Flag
    const countryCode = user.nat.toLowerCase();
    document.getElementById("user-flag").src = `https://amirshnll.github.io/random-user-generator/flags/${countryCode}.svg`;
}

// Add event listener to the button
document.getElementById("generate-btn").addEventListener("click", generateRandomUser);

// Load plugin version and update copyright dynamically
window.onload = () => {
    loadUsers();

    // Fetch the version from the manifest file
    fetch(chrome.runtime.getURL('manifest.json'))
        .then(response => response.json())
        .then(manifest => {
            const version = manifest.version;
            const currentYear = new Date().getFullYear();
            const footerElement = document.querySelector("footer p");

            footerElement.innerHTML = `
                <small>Version ${version} &mdash; Copyright &copy;${currentYear}
                <a href="https://github.com/amirshnll/random-user-generator" target="_blank">Random User Generator</a>.
                Licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a> | <a href="https://ashokri.com/donate" target="_blank">Donate</a>.</small>
            `;
        })
        .catch(error => console.error("Failed to fetch manifest:", error));
};