import { db, storage } from "./firebase.js";
import {
    doc,
    setDoc,
    getDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const USER_ID = "device-user";

/* Image Upload */
function resizeImage(file, maxWidth = 300, maxHeight = 300) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let { width, height } = img;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.7)); // compressed
        };
        img.src = URL.createObjectURL(file);
    });
}

document.getElementById("profile-upload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const profilePic = document.getElementById("profile-pic");

    const previewURL = URL.createObjectURL(file);
    profilePic.src = previewURL;

    try {
        console.log("Converting image to Base64...");

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64Image = await resizeImage(file);

            // Save Base64 string to Firestore
            await setDoc(
                doc(db, "users", USER_ID),
                {
                    profileImage: base64Image,
                    updatedAt: Timestamp.now()
                },
                { merge: true }
            );

            console.log("Profile image saved as Base64 in Firestore");
        };

        reader.readAsDataURL(file); // triggers onload

    } catch (err) {
        console.error("Profile upload failed:", err);
        alert("Upload failed. Check console.");
    } finally {
        URL.revokeObjectURL(previewURL);
    }
});



/* Preferences */
const ALL_PREFS = ["Sports", "Arts", "Tech", "Workshops", "Volunteering", "Fitness"];
let selectedPrefs = [];

const prefsBox = document.getElementById("prefs-box");
const availableBox = document.getElementById("available-prefs");

function renderPreferences() {
    prefsBox.innerHTML = "";
    availableBox.innerHTML = "";

    ALL_PREFS.forEach(pref => {
        const isSelected = selectedPrefs.includes(pref);

        const chip = document.createElement("div");
        chip.className = "pref-chip";
        chip.innerHTML = `
            <span>${pref}</span>
            <img class="pref-icon ${isSelected ? "x-icon" : "plus-icon"}"
                 src="icons/${isSelected ? "x" : "plus"}.svg">
        `;

        chip.onclick = () => togglePreference(pref);
        (isSelected ? prefsBox : availableBox).appendChild(chip);
    });
}

function togglePreference(pref) {
    selectedPrefs = selectedPrefs.includes(pref)
        ? selectedPrefs.filter(p => p !== pref)
        : [...selectedPrefs, pref];

    renderPreferences();
}

/* Save Profile */
const saveBtn = document.getElementById("save-changes-btn");

saveBtn.addEventListener("click", async () => {
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;

    if (!name || !email) {
        alert("Please fill out name and email fields.");
        return;
    }

    await setDoc(doc(db, "users", USER_ID), {
        name,
        email,
        preferences: selectedPrefs,
        updatedAt: Timestamp.now()
    }, { merge: true });

    saveBtn.textContent = "Changes Saved!";
    saveBtn.disabled = true;

    setTimeout(() => {
        saveBtn.textContent = "Save Changes";
        saveBtn.disabled = false;
    }, 1500);
});

/* Load Profile */
async function loadProfile() {
    const snap = await getDoc(doc(db, "users", USER_ID));
    if (!snap.exists()) {
        renderPreferences();
        return;
    }

    const data = snap.data();

    if (data.name) document.getElementById("name-input").value = data.name;
    if (data.email) document.getElementById("email-input").value = data.email;
    if (data.preferences) selectedPrefs = data.preferences;
    if (data.profileImage) document.getElementById("profile-pic").src = data.profileImage;

    renderPreferences();
}

loadProfile();

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

exitBtn.addEventListener("click", hideCard);

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon === profileIcon) {
            showCard();
            return;
        }
        hideCard();
        icon.classList.add("selected");
    });
});

/* Sidebar Toggle */
const sidebar = document.getElementById('sidebar');
const sidebarHidden = document.getElementById('sidebar-hidden');
const sidebarLogo = document.getElementById('sidebar-logo');
const showSidebarBtn = document.getElementById('show-sidebar');

// Hide full sidebar, show collapsed version
sidebarLogo.addEventListener('click', () => {
    sidebar.classList.add('hidden');        
    sidebarHidden.style.display = 'flex';   
});

// Show full sidebar, hide collapsed version
showSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('hidden');   
    sidebarHidden.style.display = 'none';   
});