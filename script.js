/* ============================================================
   PROFILE IMAGE UPLOAD
   ============================================================ */
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


/* ============================================================
   PREFERENCES SYSTEM
   ============================================================ */
const ALL_PREFS = [
    "Arts", "Sports", "Tech", "Workshops", "Volunteering", "Fitness",
];

// Load saved prefs or empty
let selectedPrefs = JSON.parse(localStorage.getItem("selectedPrefs")) || [];

const prefsBox = document.getElementById("prefs-box");          // selected prefs
const availableBox = document.getElementById("available-prefs"); // not selected prefs


/* ------------------------------------------------------------
   Render preferences into two areas
   ------------------------------------------------------------ */
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
        btn.className = "pref-icon";
        btn.src = isSelected ? "icons/x.png" : "icons/plus.png";

        chip.appendChild(label);
        chip.appendChild(btn);

        // Attach to correct container
        if (isSelected) {
            prefsBox.appendChild(chip);
        } else {
            availableBox.appendChild(chip);
        }

        // Toggle on click
        chip.onclick = () => togglePreference(pref);
    });
}


/* ------------------------------------------------------------
   Toggle Preference: add or remove
   ------------------------------------------------------------ */
function togglePreference(pref) {
    if (selectedPrefs.includes(pref)) {
        selectedPrefs = selectedPrefs.filter(p => p !== pref);
    } else {
        selectedPrefs.push(pref);
    }

    localStorage.setItem("selectedPrefs", JSON.stringify(selectedPrefs));
    renderPreferences();
}


/* ============================================================
   SAVE PROFILE
   ============================================================ */
document.getElementById("save-btn").addEventListener("click", () => {
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("selectedPrefs", JSON.stringify(selectedPrefs));

    alert("Profile saved!");
});


/* ============================================================
   EXIT + SIDEBAR REOPEN
   ============================================================ */
document.getElementById("exit-btn").addEventListener("click", () => {
    document.getElementById("profile-card").style.display = "none";
});

document.getElementById("sidebar-profile").addEventListener("click", () => {
    document.getElementById("profile-card").style.display = "block";
});


/* ============================================================
   LOAD PROFILE ON STARTUP
   ============================================================ */
window.onload = () => {
    // Load saved profile pic
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) document.getElementById("profile-pic").src = savedPic;

    // Load text fields
    document.getElementById("name-input").value = localStorage.getItem("name") || "";
    document.getElementById("email-input").value = localStorage.getItem("email") || "";

    // Render prefs
    renderPreferences();
};
