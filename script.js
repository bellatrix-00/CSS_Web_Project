let selectedDate = null;
let selectedColor = "blue";
let tasks = {}; // Store tasks for each day
const currentDate = new Date();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Create the calendar
function createCalendar() {
    const calendar = document.getElementById("calendar");
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    if (firstDayOfMonth === 0) {
        firstDayOfMonth = 6; // Shift Sunday to be the last day
    } else {
        firstDayOfMonth -= 1; // Shift all days to match Monday-first layout
    }

    document.getElementById("current-month-year").textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendar.innerHTML = "";

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    dayNames.forEach(day => {
        const dayNameDiv = document.createElement("div");
        dayNameDiv.classList.add("day-name");
        dayNameDiv.textContent = day;
        calendar.appendChild(dayNameDiv);
    });

    // Fill empty slots before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day", "empty");
        calendar.appendChild(emptyDiv);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = day;
        dayDiv.onclick = () => openModal(day);

        // Highlight today
        const today = new Date();
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayDiv.classList.add("current-day");
        }

        calendar.appendChild(dayDiv);
        updateDayTasks(day);
    }
}

// Open the modal for a specific day
function openModal(day) {
    selectedDate = day;
    document.getElementById("selected-date").textContent = `${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
    document.getElementById("task-modal").style.display = "block";

    // Focus on the textarea and adjust its height
    const textarea = document.getElementById("task-input");
    textarea.focus();
    adjustTextareaHeight(textarea);
}

// Close the modal
function closeModal() {
    document.getElementById("task-modal").style.display = "none";
}

function saveTask() {
    if (selectedDate) {
        const taskText = document.getElementById("task-input").value.trim();
        if (taskText) {
            const taskKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`;
            if (!tasks[taskKey]) {
                tasks[taskKey] = [];
            }

            // Check if the task limit (5) is reached
            if (tasks[taskKey].length >= 5) {
                alert("You can only add up to 5 tasks per day!");
                return;
            }

            tasks[taskKey].push({ text: taskText, color: selectedColor, completed: false });
            localStorage.setItem("calendarTasks", JSON.stringify(tasks));
            createCalendar(); // Re-render the entire calendar to reflect changes
            document.getElementById("task-input").value = "";
        }
    }
    closeModal();
}


// Update tasks for a specific day
function updateDayTasks(day) {
    const taskKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    const dayDivs = document.querySelectorAll(".day:not(.empty)");
    const dayDiv = [...dayDivs].find(div => div.textContent == day);

    if (dayDiv) {
        dayDiv.innerHTML = day; // Reset the day content

        if (tasks[taskKey]) {
            tasks[taskKey].forEach((task, index) => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.textContent = task.text;
                taskDiv.style.backgroundColor = task.color;

                if (task.completed) {
                    taskDiv.style.textDecoration = "line-through";
                }

                // Mark task as completed
                taskDiv.onclick = function (event) {
                    event.stopPropagation();
                    task.completed = !task.completed;
                    taskDiv.style.textDecoration = task.completed ? "line-through" : "none";
                    localStorage.setItem("calendarTasks", JSON.stringify(tasks));
                    updateDayTasks(day); // Re-render tasks for the day
                };

                const removeBtn = document.createElement("span");
                removeBtn.textContent = "×";
                removeBtn.className = "remove-task";
                removeBtn.onclick = function (event) {
                    event.stopPropagation();
                    tasks[taskKey].splice(index, 1);
                    localStorage.setItem("calendarTasks", JSON.stringify(tasks));
                    createCalendar(); // Re-render the entire calendar to reflect changes
                };

                // Add the remove button to the taskDiv
                taskDiv.appendChild(removeBtn);

                dayDiv.appendChild(taskDiv); // Add taskDiv to the dayDiv
            });
        }
    }
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem("calendarTasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Adjust textarea height dynamically
function adjustTextareaHeight(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

// Event listener for textarea input
document.getElementById("task-input").addEventListener("input", function () {
    adjustTextareaHeight(this);
});

// Initialize the calendar
loadTasks();
createCalendar();
// Function to update progress
function updateProgress() {
    const totalTasks = parseInt(document.getElementById('totalTasks').value);
    const completedTasks = parseInt(document.getElementById('completedTasks').value);

     // Ensure completedTasks is never greater than totalTasks
     if (completedTasks > totalTasks) {
        completedTasks = totalTasks; 
        alert("Completed tasks cannot exceed total tasks. Adjusting to total tasks.");
    }
    // Calculate progress
    const progress = (completedTasks / totalTasks) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressBar').textContent = Math.round(progress) + '%';

    // Show a success message based on the progress
if (progress === 100) {
    alert("Congratulations! You made it!!");
} else if (progress >= 70) {
    alert("Congratulations! You're almost there!!");
}


}
// Function to handle image upload
function handleImageUpload(event) {
    const files = event.target.files;
    const moodBoard = document.getElementById("mood-board");
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("mood-image");
            moodBoard.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}



  // Function to submit bug report
function submitBugReport() {
    const bugReport = document.getElementById("bug-report").value;
    if (bugReport) {
        alert("Thank you for your feedback!");
        document.getElementById("bug-report").value = "";
    }
}



// Form validation for feedback
document.getElementById("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const rating = document.getElementById("feedback-rating").value;
    const suggestions = document.getElementById("feedback-suggestions").value;

    if (rating && suggestions) {
        alert("Thank you for your feedback!");
        this.reset();
    } else {
        alert("Please fill out all fields.");
    }
});
// Save data to localStorage
function saveData() {
    const whyInput = document.querySelector("#why-section textarea").value;
    const intentionInput = document.querySelector("#daily-intention textarea").value;
    const wentWellInput = document.querySelector("#reflection-section textarea:nth-of-type(1)").value;
    const improveInput = document.querySelector("#reflection-section textarea:nth-of-type(2)").value;
    const gratitudeInput = document.querySelector("#gratitude-section textarea").value;
    const quoteInput = document.querySelector("#quotes-section textarea").value;

    localStorage.setItem("whyInput", whyInput);
    localStorage.setItem("intentionInput", intentionInput);
    localStorage.setItem("wentWellInput", wentWellInput);
    localStorage.setItem("improveInput", improveInput);
    localStorage.setItem("gratitudeInput", gratitudeInput);
    localStorage.setItem("quoteInput", quoteInput);
}

// Load data from localStorage
function loadData() {
    const whyInput = localStorage.getItem("whyInput");
    const intentionInput = localStorage.getItem("intentionInput");
    const wentWellInput = localStorage.getItem("wentWellInput");
    const improveInput = localStorage.getItem("improveInput");
    const gratitudeInput = localStorage.getItem("gratitudeInput");
    const quoteInput = localStorage.getItem("quoteInput");

    if (whyInput) document.querySelector("#why-section textarea").value = whyInput;
    if (intentionInput) document.querySelector("#daily-intention textarea").value = intentionInput;
    if (wentWellInput) document.querySelector("#reflection-section textarea:nth-of-type(1)").value = wentWellInput;
    if (improveInput) document.querySelector("#reflection-section textarea:nth-of-type(2)").value = improveInput;
    if (gratitudeInput) document.querySelector("#gratitude-section textarea").value = gratitudeInput;
    if (quoteInput) document.querySelector("#quotes-section textarea").value = quoteInput;
}

// Clear all saved data
function clearData() {
    localStorage.removeItem("whyInput");
    localStorage.removeItem("intentionInput");
    localStorage.removeItem("wentWellInput");
    localStorage.removeItem("improveInput");
    localStorage.removeItem("gratitudeInput");
    localStorage.removeItem("quoteInput");

    // Clear textareas
    document.querySelectorAll(".motivation-textarea").forEach(textarea => {
        textarea.value = "";
    });

    alert("All data cleared!");
}

// Add event listeners to save data when textareas change
document.querySelectorAll(".motivation-textarea").forEach(textarea => {
    textarea.addEventListener("input", saveData);
});

// Load saved data when the page loads
window.addEventListener("load", loadData);
