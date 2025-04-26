# Project 2 - Gamified To-Do List and Calendar

This project extends the Phase 1 front-end website by integrating full back-end functionality with **MySQL**, **PHP**, and **AJAX** technologies, making the platform fully operational and dynamic.

The website helps users manage tasks and schedules through a gamified interface and includes a motivational section, progress tracking, and feedback forms.

---

### Changes on the Index Page

- Removed the **Sign Up** and **Login** buttons, as they were unnecessary for the To-Do List functionality.
- Added a **To-Do List** box directly on the homepage, allowing users to immediately add tasks.
  - Improved the **user interface (UI)** by making the website's purpose immediately clear.
- Implemented an **"About Us" toggle** to show or hide additional information without reloading the page.
- Created a **Discord study room**:
  - Added a link for users to join a Discord server for collaborative study.
  - Integrated a **tooltip** over the Discord link explaining the redirection.
- To-Do list functionality was inspired by:
  - [How to Create a Simple To-Do List with PHP & MySQL (YouTube)](https://youtu.be/K7PxsuZtlD4?si=yjW2Rkc61OQluxIk)
- Updated CSS to include a **To-Do List container** matching the website’s aesthetic.
- Renamed `index.html` to `index.php` to enable dynamic PHP functionality.

### Changes on the Tasks Page

- Updated the calendar to allow users to navigate between months using **Next** and **Previous** buttons.
- Integrated dynamic event management using FullCalendar.js, based on:
  - [How to Add Events Dynamically in FullCalendar with PHP and MySQL (ShinerWeb)](https://shinerweb.com/how-to-add-event-dynamically-in-fullcalendar-with-php-and-mysql-live-example/#google_vignette)
- Applied custom CSS to:
  - Match FullCalendar’s styling with the website's design.
  - Ensure visual consistency between calendar, To-Do List, and navbar.
- Added inline `<style>` tags inside tasks page to override FullCalendar default styles.
- Enhanced UI/UX by allowing users to add events flexibly by selecting dates.

### Changes on the Progress Page

- Added a short descriptive `<p>` tag to explain the purpose of the Progress page to users.

### Changes on the Motivation Page

- Redesigned the page to be **completely static** with no user interaction.
- Added external links and images allowing users to:
  - Watch motivational videos.
  - Read from trusted productivity sources.
  - Play brain-training games (e.g., NeuroNation).
- Ensured all images and videos have proper **`alt` attributes** for accessibility.

### Changes on the Feedback Page

- Made the feedback form **functional** using PHP.
- When users submit the form, data is processed and a confirmation message is shown.
- Submission process inspired by:
  - [Simple Feedback Form with DB Connectivity using XAMPP (YouTube)](https://youtu.be/YGaArt-ed6s?si=rvBCFzm8iWfECvUA)

---

### PHP Pages and Database Integration

- **General Logic**:
  - `save_event.php`, `delete_event.php`, and `display_event.php` follow a similar PHP-MySQL interaction pattern:
    - Connect to the database.
    - Prepare and execute queries (INSERT, DELETE, SELECT).
    - Return structured responses via AJAX.

- **List of PHP Files**:
  - `connect.php`: Establishes the connection to MySQL database (`project2_web`).
  - `save_event.php`: Handles inserting new calendar events.
  - `delete_event.php`: Handles deleting calendar events.
  - `display_event.php`: Retrieves events and sends them to the frontend.
  - `save_feedback.php`: Saves user feedback into the database.

- **Page Renaming**:
  - `index.html` → `index.php` for dynamic To-Do List tasks.
  - `tasks.html` → `tasks.php` for dynamic calendar event handling.

- **PHP Purpose Summary**:
  - `index.php`: Manages dynamic To-Do List tasks.
  - `tasks.php`: Handles calendar event interactions.

---

### jQuery and AJAX Integration

AJAX and jQuery were used to allow **smooth, asynchronous communication** between the client-side and the server, improving user experience by avoiding full page reloads.

**Where and how they were used:**

- **Index Page (`index.php`)**:
  - AJAX sends new tasks to `save_task.php` and updates the To-Do List dynamically.
  - jQuery toggles "About Us" section and shows a tooltip for the Discord link.

- **Tasks Page (`tasks.php`)**:
  - AJAX handles adding, deleting, and fetching calendar events.
  - Connected with `save_event.php`, `delete_event.php`, and `display_event.php`.

- **Feedback Page**:
  - AJAX submits feedback to `save_feedback.php` without reloading the page.

**Benefits Achieved:**

- Instant, seamless user experience.
- Reduced page reloads and faster navigation.
- Silent, background updates to the database.

---

### JavaScript (JS) File Updates

- **LocalStorage Removal**:
  - Old functions loading tasks from LocalStorage were removed.
  - Task management now fully handled by PHP and MySQL dynamically.

- **Calendar JavaScript Changes**:
  - Old static calendar creation functions were removed.
  - Integrated dynamic FullCalendar.js linked to a database.

- **Motivation Page Changes**:
  - Previous multiple interactive buttons were removed.
  - Page is now fully static with links to external resources.

---

### CSS Styling Updates

- Unified layout using card-based design with rounded corners and modern gradients.
- Applied **maximum width limits** to navbar, calendar, and cards.
- Added **media queries** for responsive mobile-friendly layout.
- Overrode FullCalendar default styles to blend with overall theme.
- Added tooltip styling for Discord hover effect.
- Improved UI consistency across all pages (Tasks, Progress, Motivation, Feedback).

---

### Database Structure (`project2_web`)

- **tasks Table**:
  - Stores To-Do List items (`id`, `task`, `status`).

- **events Table**:
  - Stores calendar events (`event_id`, `title`, `start`, `end`, `color`, optional `url`).

- **feedback Table**:
  - Stores user feedback (`id`, `name`, `email`, `subject`, `message`).

---

### Resources Referenced

- [Simple Feedback Form with DB Connectivity using XAMPP (YouTube)](https://youtu.be/YGaArt-ed6s?si=rvBCFzm8iWfECvUA)
- [How to Create a Simple To-Do List with PHP & MySQL (YouTube)](https://youtu.be/K7PxsuZtlD4?si=yjW2Rkc61OQluxIk)
- [How to Add Events Dynamically in FullCalendar with PHP and MySQL (ShinerWeb)](https://shinerweb.com/how-to-add-event-dynamically-in-fullcalendar-with-php-and-mysql-live-example/#google_vignette)

---

# End of README.

