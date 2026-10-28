// Smooth Search Filtering
function searchFunction() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const country = card.getAttribute('data-country').toLowerCase();
        if (country.includes(query)) {
            card.style.display = "block";
            card.style.opacity = "1";
        } else {
            card.style.display = "none";
            card.style.opacity = "0";
        }
    });
}

// Navbar Scroll Effect
window.onscroll = function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = "15px 8%";
        nav.style.background = "rgba(250, 250, 250, 0.95)";
    } else {
        nav.style.padding = "25px 8%";
        nav.style.background = "rgba(250, 250, 250, 0.8)";
    }
};

// Listen for "Enter" key on search
document.getElementById("searchInput").addEventListener("keyup", function(e) {
    if (e.key === "Enter") searchFunction();
});

// Fade-in effect for stories on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.story-box').forEach(box => {
    box.style.opacity = "0";
    box.style.transform = "translateY(30px)";
    box.style.transition = "all 0.8s ease-out";
    observer.observe(box);
});


const regPopup = document.getElementById("registerModal");
const regBtn = document.getElementById("registerBtn"); // Ensure your nav button has this ID
const closeBtn = document.querySelector(".close-modal");

// 1. Open popup when Register Now is clicked
regBtn.addEventListener("click", function(e) {
    e.preventDefault();
    regPopup.classList.add("show-reg");
});

// 2. Close popup via 'X' button
closeBtn.addEventListener("click", function() {
    regPopup.classList.remove("show-reg");
});

// 3. Close popup if clicking anywhere outside the square
window.addEventListener("click", function(event) {
    if (event.target === regPopup) {
        regPopup.classList.remove("show-reg");
    }
});

// 4. Handle form submission
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const country = document.getElementById("countrySelect").value;
    const program = document.getElementById("programSelect").value;
    
    alert(`Registration Successful!\nPreferred Destination: ${country}\nSelected Program: ${program}`);
    regPopup.classList.remove("show-reg");
});



const progModal = document.getElementById("programsModal");
const closeProg = document.querySelector(".close-programs");
const modalTitle = document.getElementById("modalCountryName");
const univLink = document.getElementById("univLink");

// University Database
const universityData = {
    "Italy": "https://www.unifi.it/index.php?module=pagemaster&PAGE_user_op=view_page&PAGE_id=10333",
    "Japan": "https://www.kyoto-u.ac.jp/en",
    "South Korea": "https://www.snu.ac.kr/en",
    "Canada": "https://www.ubc.ca/",
    "France": "https://www.sorbonne-universite.fr/en",
    "Australia": "https://www.sydney.edu.au/"
};

// Open Modal logic
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the country name from the card
        const card = this.closest('.card');
        const country = card.getAttribute('data-country');
        const cityText = card.querySelector('h3').innerText;

        // Update Modal Content
        modalTitle.innerText = cityText;
        univLink.href = universityData[country] || "#";

        progModal.classList.add("show-reg");
    });
});

// Close logic
closeProg.onclick = () => progModal.classList.remove("show-reg");

window.addEventListener("click", (event) => {
    if (event.target === progModal) {
        progModal.classList.remove("show-reg");
    }
});




// List of countries in your database
const countries = [
    "Australia", "Bologna, Italy", "Canada", "Florence, Italy", 
    "France", "Italy", "Japan", "Kyoto, Japan", 
    "Messina, Italy", "Milano, Italy", "South Korea", "Seoul, South Korea", "Verona, Italy"
];

const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('suggestionsBox');

searchInput.addEventListener('input', function() {
    const userData = this.value.toLowerCase(); 
    let suggestions = [];

    if (userData) {
        // Filter countries that start with or contain the typed letter
        suggestions = countries.filter(data => {
            return data.toLowerCase().includes(userData);
        });

        // Show the box and fill it
        suggestionsBox.style.display = "block";
        displaySuggestions(suggestions);
    } else {
        suggestionsBox.style.display = "none";
    }
});

function displaySuggestions(list) {
    if (!list.length) {
        suggestionsBox.innerHTML = '<div class="suggestion-item">No destinations found</div>';
        return;
    }

    const html = list.map(item => {
        return `<div class="suggestion-item" onclick="selectSuggestion('${item}')">${item}</div>`;
    }).join('');

    suggestionsBox.innerHTML = html;
}

// When a user clicks a country from the list
function selectSuggestion(name) {
    searchInput.value = name;
    suggestionsBox.style.display = "none";
    
    // Optional: Automatically trigger your main search/filter function here
    // filterDestinationCards(name); 
}

// Close dropdown if user clicks outside
window.addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        suggestionsBox.style.display = "none";
    }
});