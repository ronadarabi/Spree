/* Profile Image Upload */ 
document.getElementById("profile-upload").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById("profile-pic").src = evt.target.result;
        localStorage.setItem("profilePic", evt.target.result);
    };
    reader.readAsDataURL(file);
});

/* Preferences */
const ALL_PREFS = ["Sports", "Arts", "Tech", "Workshops", "Volunteering", "Fitness"];
let selectedPrefs = JSON.parse(localStorage.getItem("selectedPrefs")) || [];

const prefsBox = document.getElementById("prefs-box");
const availableBox = document.getElementById("available-prefs");

function renderPreferences() {
    prefsBox.innerHTML = "";
    availableBox.innerHTML = "";

    ALL_PREFS.forEach(pref => {
        const isSelected = selectedPrefs.includes(pref);

        const chip = document.createElement("div");
        chip.className = "pref-chip";

        const label = document.createElement("span");
        label.textContent = pref;

        const btn = document.createElement("img");
        btn.className = isSelected ? "pref-icon x-icon" : "pref-icon plus-icon";
        btn.src = isSelected ? "icons/x.svg" : "icons/plus.svg";


        chip.appendChild(label);
        chip.appendChild(btn);

        if (isSelected) {
            prefsBox.appendChild(chip);
        } else {
            availableBox.appendChild(chip);
        }

        chip.onclick = () => togglePreference(pref);
    });
}

function togglePreference(pref) {
    if (selectedPrefs.includes(pref)) {
        selectedPrefs = selectedPrefs.filter(p => p !== pref);
    } else {
        selectedPrefs.push(pref);
    }
    localStorage.setItem("selectedPrefs", JSON.stringify(selectedPrefs));
    renderPreferences();
}

renderPreferences();


/* Save changes */

document.getElementById("save-changes-btn").addEventListener("click", () => {
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("selectedPrefs", JSON.stringify(selectedPrefs));

    alert("Profile saved!");
});


/* Navigation */
const card = document.getElementById("card");
const exitBtn = document.getElementById("exit-btn");
const icons = document.querySelectorAll(".side-icon");
const profileIcon = document.getElementById("sidebar-profile");

function deselectAllIcons() {
    icons.forEach(icon => icon.classList.remove("selected"));
}

function showCard() {
    card.style.display = "block";
    deselectAllIcons();
    profileIcon.classList.add("selected");
}

function hideCard() {
    card.style.display = "none";
    deselectAllIcons();
}

showCard();

exitBtn.addEventListener("click", () => {
    hideCard();
});

icons.forEach(icon => {
    icon.addEventListener("click", () => {

        // PROFILE button: show card
        if (icon === profileIcon) {
            showCard();
            return;
        }

        // Any other icon: hide card + select that icon
        hideCard();
        icon.classList.add("selected");
    });
});