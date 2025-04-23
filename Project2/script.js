
let selectedDate = null;
let selectedColor = "blue";
let tasks = {}; // Will be populated from MySQL
let currentDate = new Date();
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    fetchAndRenderTasks();
}

function fetchAndRenderTasks() {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    $.get("fetch_tasks.php", { month, year }, function (data) {
        tasks = {};
        data.forEach(task => {
            const key = task.task_date;
            if (!tasks[key]) tasks[key] = [];
            tasks[key].push(task);
        });
        renderCalendar();
    }, 'json');
}

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    if (firstDayOfMonth === 0) firstDayOfMonth = 7;
    firstDayOfMonth -= 1;

    document.getElementById("current-month-year").textContent =
        `${monthNames[month]} ${year}`;

    const today = new Date(); // ✅ Needed for highlighting today

    // Fill in empty slots before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day", "empty");
        calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = day;

        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // ✅ Render tasks for this day
        if (tasks[dateKey]) {
            tasks[dateKey].forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.textContent = task.task_text;
                taskDiv.style.backgroundColor = task.color || "#d0e0f0";

                const removeBtn = document.createElement("span");
                removeBtn.textContent = " ×";
                removeBtn.style.cursor = "pointer";
                removeBtn.style.marginLeft = "5px";
                removeBtn.style.color = "red";

                taskDiv.appendChild(removeBtn);
                dayDiv.appendChild(taskDiv);
            });
        }

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("current-day");
        }

        dayDiv.onclick = () => openModal(day);
        calendar.appendChild(dayDiv);
    }
}


function openModal(day) {
    selectedDate = day;
    document.getElementById("selected-date").textContent =
        `${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;

    const textarea = document.getElementById("task-input");
    textarea.value = ""; // clear input

    // Show the modal and focus
    document.getElementById("task-modal").style.display = "block";
    textarea.focus();
    adjustTextareaHeight(textarea);
}

function closeModal() {
    document.getElementById("task-modal").style.display = "none";
}

function saveTask() {
    alert("Save button clicked!");
    const taskText = document.getElementById("task-input").value.trim();
    if (taskText && selectedDate) {
        const taskDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;

        $.post("save_task.php", {
            task_date: taskDate,
            task_text: taskText,
            color: selectedColor
        }, function (response) {
            if (response.success) {
                alert("Task saved!");
                document.getElementById("task-input").value = "";
                fetchAndRenderTasks(); // refresh calendar
            } else {
                alert("Failed to save task: " + (response.message || "Unknown error"));
            }
        }, 'json');
    }
    closeModal();
}

function adjustTextareaHeight(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

document.getElementById("task-input").addEventListener("input", function () {
    adjustTextareaHeight(this);
});

window.onload = () => {
    fetchAndRenderTasks();
};
