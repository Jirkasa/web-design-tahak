const demoButton = document.getElementById("microinteraction-demo");
const demoButtonText = demoButton.querySelector(".microinteraction-demo__text");
const progressText = demoButton.querySelector(".microinteraction-demo__progress-number");
let isUploading = false;
let progress = 0;
let uploadIntervalId = null;

const startUpload = () => {
    if (isUploading) return;
    isUploading = true;
    demoButton.classList.add("microinteraction-demo--uploaded");
    demoButtonText.classList.add("microinteraction-demo__text--hidden")
    progressText.classList.add("microinteraction-demo__progress-number--visible");
    uploadIntervalId = setInterval(animateUpload, 40);
}

const animateUpload = () => {
    progress++;
    progressText.innerText = `${progress}%`;
    if (progress === 100) {
        clearInterval(uploadIntervalId);
        setTimeout(resetUploadDemo, 1000);
    }
}

const resetUploadDemo = () => {
    demoButton.classList.remove("microinteraction-demo--uploaded");
    demoButtonText.classList.remove("microinteraction-demo__text--hidden")
    progressText.classList.remove("microinteraction-demo__progress-number--visible");
    progress = 0;
    progressText.innerText = "0%";
    isUploading = false;
}

demoButton.addEventListener("click", startUpload)