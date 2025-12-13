/* Upload Image */
const fileInput = document.getElementById('file-input');
const uploadBtn = document.querySelector('.upload-img-btn');
const uploadFileName = document.querySelector('.upload-file-name');
const removeBtn = document.querySelector('.remove-file-btn');

let uploadedFile = null;

// Function to enable/disable upload button
function updateUploadButtonState() {
    if (uploadedFile) {
        uploadBtn.style.cursor = 'not-allowed';
    } else {
        uploadBtn.style.cursor = 'pointer';
    }
}

// Click handler
uploadBtn.addEventListener('click', () => {
    if (!uploadedFile) {
        fileInput.click();
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('Only PNG or JPEG allowed.');
        return;
    }

    uploadedFile = file;

    let fileName = file.name.length > 15 ? file.name.slice(0, 12) + '...' : file.name;
    uploadFileName.textContent = fileName;
    removeBtn.style.display = 'inline';

    // Disable the upload button after one file
    updateUploadButtonState();
});

removeBtn.addEventListener('click', () => {
    uploadedFile = null;
    fileInput.value = '';
    uploadFileName.textContent = '';
    removeBtn.style.display = 'none';

    // Re-enable the upload button
    updateUploadButtonState();
});

// Initial state
updateUploadButtonState();


/* Post Event */
const postBtn = document.getElementById('post-event-btn');

postBtn.addEventListener('click', () => {
    // Get input values
    const org = document.getElementById('org-input').value;
    const name = document.getElementById('name-input').value;
    const desc = document.getElementById('desc-input').value;
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const loc = document.getElementById('loc-input').value;

    // Basic validation
    if (!org || !name || !desc || !date || !time || !loc) {
        alert('Please fill out all fields.');
        return;
    }

    // Save event to local storage
    const events = JSON.parse(localStorage.getItem('Events') || '[]');

    events.push({
        org,
        name,
        desc,
        date,
        time,
        loc,
        image: uploadedFile ? uploadedFile.name : null
    });

    localStorage.setItem('Events', JSON.stringify(events));

    // Animate button text
    postBtn.textContent = 'Event Posted!';
    postBtn.disabled = true;

    setTimeout(() => {
        postBtn.textContent = 'Post Event';
        postBtn.disabled = false;

        // Clear inputs
        document.getElementById('org-input').value = '';
        document.getElementById('name-input').value = '';
        document.getElementById('desc-input').value = '';
        document.getElementById('date-input').value = '';
        document.getElementById('time-input').value = '';
        document.getElementById('loc-input').value = '';

        // Clear uploaded image
        uploadedFile = null;
        fileInput.value = '';
        uploadFileName.textContent = '';
        removeBtn.style.display = 'none';
    }, 1500); // 1.5 seconds
});

/* Navigation */
const card = document.getElementById("card");
const exitBtn = document.getElementById("exit-btn");
const icons = document.querySelectorAll(".side-icon");
const addIcon = document.getElementById("sidebar-add");

function deselectAllIcons() {
    icons.forEach(icon => icon.classList.remove("selected"));
}

function showCard() {
    card.style.display = "block";
    deselectAllIcons();
    addIcon.classList.add("selected");
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

        // ADD button: show card
        if (icon === addIcon) {
            showCard();
            return;
        }

        // Any other icon: hide card + select that icon
        hideCard();
        icon.classList.add("selected");
    });
});