let files = [];
let totalStorage = 0;

const maxStorage = 1000; // MB

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}

function uploadFiles() {
    const input = document.getElementById("fileInput");

    if (input.files.length === 0) {
        alert("Please select a file first.");
        return;
    }

    for (const file of input.files) {
        const sizeMB = file.size / (1024 * 1024);

        if (totalStorage + sizeMB > maxStorage) {
            alert("Not enough cloud storage available.");
            continue;
        }

        files.push({
            name: file.name,
            size: sizeMB
        });

        totalStorage += sizeMB;
    }

    displayFiles();
    updateDashboard();

    input.value = "";
}

function displayFiles() {
    const fileList = document.getElementById("fileList");

    fileList.innerHTML = "";

    files.forEach((file, index) => {
        const fileElement = document.createElement("div");
        fileElement.className = "file";

        fileElement.innerHTML = `
            <span>📄 ${file.name}</span>
            <span>${file.size.toFixed(2)} MB</span>
            <button onclick="deleteFile(${index})">Delete</button>
        `;

        fileList.appendChild(fileElement);
    });
}

function deleteFile(index) {
    totalStorage -= files[index].size;
    files.splice(index, 1);

    displayFiles();
    updateDashboard();
}

function updateDashboard() {
    document.getElementById("fileCount").textContent = files.length;

    document.getElementById("storage").textContent =
        `${totalStorage.toFixed(2)} MB / ${maxStorage} MB`;

    const percentage = (totalStorage / maxStorage) * 100;

    document.getElementById("progressBar").style.width =
        percentage + "%";
}