/* ================= MOOD ================= */

let selectedMood = "";

function selectMood(mood, element) {
    selectedMood = mood;

    document.querySelectorAll(".mood-card").forEach(card => {
        card.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    let message = "";

    if (mood.includes("Happy")) {
        message = "That's wonderful! Keep enjoying this positive moment. 🌸";
    } else if (mood.includes("Good")) {
        message = "Glad to hear that! Keep taking care of yourself. 🌿";
    } else if (mood.includes("Okay")) {
        message = "It's okay to simply feel okay. Take things one step at a time. 💚";
    } else if (mood.includes("Sad")) {
        message = "Be gentle with yourself today. Give yourself some time and space. 💙";
    } else {
        message = "Take a slow breath. You don't have to solve everything at once. 🌿";
    }

    const moodMessage = document.getElementById("moodMessage");
    const dashboardMood = document.getElementById("dashboardMood");

    if (moodMessage) {
        moodMessage.innerText = message;
    }

    if (dashboardMood) {
        dashboardMood.innerText = mood;
    }

    updateProgress();
}


/* ================= BREATHING ================= */

let breathingInterval = null;
let breathingRunning = false;

function startBreathing() {

    if (breathingRunning) {
        return;
    }

    const circle = document.getElementById("breathingCircle");
    const text = document.getElementById("breathingText");

    if (!circle || !text) {
        console.error("Breathing elements not found.");
        return;
    }

    breathingRunning = true;

    circle.classList.add("breathing");

    const phases = [
        "Breathe In",
        "Hold",
        "Breathe Out",
        "Relax"
    ];

    let index = 0;

    text.innerText = phases[index];

    breathingInterval = setInterval(() => {

        index++;

        if (index >= phases.length) {
            index = 0;
        }

        text.innerText = phases[index];

    }, 2000);

    setTimeout(() => {

        clearInterval(breathingInterval);
        breathingInterval = null;

        circle.classList.remove("breathing");

        text.innerText = "Complete ✓";

        breathingRunning = false;

        updateProgress();

    }, 16000);
}


/* ================= RANDOM ACTIVITY ================= */

const activities = [
    "Take 5 slow breaths. 🌬️",
    "Write down 3 things you are grateful for. ✍️",
    "Drink a glass of water. 💧",
    "Stretch for 2 minutes. 🧘",
    "Take a short walk. 🚶",
    "Put your phone away for 10 minutes. 📱",
    "Listen to your favourite relaxing song. 🎵",
    "Write one positive thing about yourself. 💚"
];

function randomActivity() {

    const activityText = document.getElementById("activityText");

    if (!activityText) {
        console.error("activityText element not found.");
        return;
    }

    const randomIndex =
        Math.floor(Math.random() * activities.length);

    activityText.innerText = activities[randomIndex];
}


/* ================= TIMER ================= */

let timerSeconds = 25 * 60;
let timerInterval = null;

function updateTimerDisplay() {

    const timer = document.getElementById("timer");

    if (!timer) {
        return;
    }

    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    timer.innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        if (timerSeconds <= 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            alert("Focus session completed! 🎉");

            return;
        }

        timerSeconds--;

        updateTimerDisplay();

    }, 1000);
}

function pauseTimer() {

    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 25 * 60;

    updateTimerDisplay();
}


/* ================= REFLECTION ================= */

function saveReflection() {

    const reflection1Element =
        document.getElementById("reflection1");

    const reflection2Element =
        document.getElementById("reflection2");

    const reflection3Element =
        document.getElementById("reflection3");

    const message =
        document.getElementById("reflectionMessage");

    if (!reflection1Element ||
        !reflection2Element ||
        !reflection3Element ||
        !message) {

        console.error("Reflection elements not found.");
        return;
    }

    const reflection1 =
        reflection1Element.value.trim();

    const reflection2 =
        reflection2Element.value.trim();

    const reflection3 =
        reflection3Element.value.trim();

    if (
        reflection1 === "" ||
        reflection2 === "" ||
        reflection3 === ""
    ) {

        message.innerText =
            "Please answer all three questions.";

        message.style.color = "#c77";

        return;
    }

    localStorage.setItem("reflection1", reflection1);
    localStorage.setItem("reflection2", reflection2);
    localStorage.setItem("reflection3", reflection3);

    message.innerText =
        "Your reflection has been saved successfully. 🌿";

    message.style.color = "#659476";

    updateProgress();
}


/* ================= COMMUNICATION CHALLENGE ================= */

let challengeCompleted = 0;

function completeChallenge() {

    if (challengeCompleted === 1) {
        return;
    }

    challengeCompleted = 1;

    const button =
        document.getElementById("challengeBtn");

    const count =
        document.getElementById("challengeCount");

    if (button) {
        button.innerHTML =
            '<i class="fa-solid fa-check"></i> Challenge Completed';

        button.style.background = "#567c63";
    }

    if (count) {
        count.innerText = "1";
    }

    updateProgress();
}


/* ================= GOALS ================= */

let goals = [];

function addGoal() {

    const input =
        document.getElementById("goalInput");

    if (!input) {
        console.error("goalInput not found.");
        return;
    }

    const goalText = input.value.trim();

    if (goalText === "") {

        alert("Please enter a goal.");

        return;
    }

    const goal = {
        text: goalText,
        completed: false
    };

    goals.push(goal);

    input.value = "";

    displayGoals();

    updateProgress();
}


function displayGoals() {

    const goalList =
        document.getElementById("goalList");

    if (!goalList) {
        return;
    }

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {

        const div = document.createElement("div");

        div.className = "goal-item";

        if (goal.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = `
            <input
                type="checkbox"
                ${goal.completed ? "checked" : ""}
                onchange="completeGoal(${index})">

            <span>${goal.text}</span>

            <button
                class="delete-goal"
                onclick="deleteGoal(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;

        goalList.appendChild(div);
    });

    const goalCount =
        document.getElementById("goalCount");

    const completedGoals =
        document.getElementById("completedGoals");

    if (goalCount) {
        goalCount.innerText = goals.length;
    }

    const completed =
        goals.filter(goal => goal.completed).length;

    if (completedGoals) {
        completedGoals.innerText = completed;
    }
}


function completeGoal(index) {

    if (!goals[index]) {
        return;
    }

    goals[index].completed =
        !goals[index].completed;

    displayGoals();

    updateProgress();
}


function deleteGoal(index) {

    if (!goals[index]) {
        return;
    }

    goals.splice(index, 1);

    displayGoals();

    updateProgress();
}


/* ================= JOURNAL ================= */

function saveJournal() {

    const journal =
        document.getElementById("journalText");

    const message =
        document.getElementById("journalMessage");

    if (!journal || !message) {
        console.error("Journal elements not found.");
        return;
    }

    const text = journal.value.trim();

    if (text === "") {

        message.innerText =
            "Please write something before saving.";

        return;
    }

    localStorage.setItem("journal", text);

    message.innerText =
        "Your journal entry has been saved. 🔒";

    updateProgress();
}


function clearJournal() {

    const journal =
        document.getElementById("journalText");

    const message =
        document.getElementById("journalMessage");

    if (journal) {
        journal.value = "";
    }

    if (message) {
        message.innerText = "";
    }
}


/* ================= DASHBOARD ================= */

function updateProgress() {

    let progress = 0;

    if (selectedMood !== "") {
        progress += 20;
    }

    if (localStorage.getItem("journal")) {
        progress += 20;
    }

    if (localStorage.getItem("reflection1")) {
        progress += 20;
    }

    if (challengeCompleted === 1) {
        progress += 20;
    }

    if (goals.length > 0) {
        progress += 20;
    }

    const progressPercent =
        document.getElementById("progressPercent");

    const progressFill =
        document.getElementById("progressFill");

    if (progressPercent) {
        progressPercent.innerText =
            progress + "%";
    }

    if (progressFill) {
        progressFill.style.width =
            progress + "%";
    }
}


/* ================= DARK MODE ================= */

function setupDarkMode() {

    const themeBtn =
        document.getElementById("themeBtn");

    if (!themeBtn) {
        console.warn("themeBtn not found.");
        return;
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const icon =
            themeBtn.querySelector("i");

        if (!icon) {
            return;
        }

        if (document.body.classList.contains("dark")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}


/* ================= LOAD SAVED DATA ================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Website JavaScript loaded successfully.");

    const savedJournal =
        localStorage.getItem("journal");

    const journalText =
        document.getElementById("journalText");

    if (savedJournal && journalText) {
        journalText.value = savedJournal;
    }


    const savedReflection1 =
        localStorage.getItem("reflection1");

    const savedReflection2 =
        localStorage.getItem("reflection2");

    const savedReflection3 =
        localStorage.getItem("reflection3");


    const reflection1 =
        document.getElementById("reflection1");

    const reflection2 =
        document.getElementById("reflection2");

    const reflection3 =
        document.getElementById("reflection3");


    if (savedReflection1 && reflection1) {
        reflection1.value = savedReflection1;
    }

    if (savedReflection2 && reflection2) {
        reflection2.value = savedReflection2;
    }

    if (savedReflection3 && reflection3) {
        reflection3.value = savedReflection3;
    }


    updateTimerDisplay();

    displayGoals();

    setupDarkMode();

    updateProgress();
});
