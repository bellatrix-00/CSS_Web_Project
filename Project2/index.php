<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gamified To-Do List - Home</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <?php require_once "connect.php"; ?>

</head>
<body>

    <nav>
        <ul>
        <li><a href="/Project2/index.php">Home</a></li>
           <li> <a href="/Project2/tasks.html">Tasks</a></li>
           <li> <a href="/Project2/progress.html">Progress</a></li>
           <li> <a href="/Project2/motivation.html">Motivation</a></li>
            <li><a href="/Project2/feedback.html">Feedback</a></li>

        </ul>
    </nav>

    <header>
        <h1>Welcome to Your Gamified To-Do List <i class="fa fa-star" style="font-size:60px;color:lightblue;"></i></h1>
    </header>

    <section class="dashboard">
        <h2>Today's Tasks</h2>
        <div id="todayTasks">
            <p>No tasks for today yet!</p>
        </div>

        <h2>Upcoming Tasks</h2>
        <div id="upcomingTasks">
            <p>Plan ahead to stay productive!</p>
        </div>

        <h2>This Week at a Glance 🗓️</h2>
        <?php
        $week = date('w');
        $week_first_date = date('Y-m-d', strtotime("-$week days"));
        $week_last_date = date('Y-m-d', strtotime("+".(6-$week)." days"));

        echo "<p><strong>$week_first_date → $week_last_date</strong></p>";
        echo "<ul style='list-style:none; padding-left: 0;'>";
        for ($i = 0; $i <= 6; $i++) {
            $temp_date = date('Y-m-d', strtotime($week_first_date . "+$i days"));
            $day = date('l', strtotime($temp_date));
            echo "<li><strong>$day</strong> — $temp_date</li>";
        }
        echo "</ul>";
        ?>
    </section>

    <div class="about-panel">
        <h2 id="toggleabout" style="cursor:pointer">About Us</h2>
        <div id="aboutcontent" style="display:none; padding:50px; background-color:#e0cef0;">
            <p>This platform helps you gamify your productivity, stay focused, and collaborate with friends in real-time using <a href="https://discord.gg/DedK7jPsbn">Discord</a>.</p>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            $("#toggleabout").click(function () {
                $("#aboutcontent").slideToggle("slow");
            });
        });
    </script>


        <main>
    <h2 id="signup" style="cursor:pointer">Sign Up / Log In</h2>
    <div id="content" style="display: none; padding:50px; background-color:#e0cef0;">
        <form id="authForm">
            Email:
            <input type="email" id="email" name="email" required>
            Password:
            <input type="password" id="password" name="password" required>
            <button type="submit" name="login">Log In</button>
            <button type="submit" name="signup">Sign Up</button>
        </form>
        <div id="responseMessage" style="margin-top:10px;"></div>
    </div>
</main>

        </div>
    </main>
    <script>
$(document).ready(function () {
    $("#authForm").submit(function (event) {
        event.preventDefault();

        // Figure out which button was clicked
        let clickedButton = $(document.activeElement).attr("name");
        let formData = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        formData[clickedButton] = true;

        $.ajax({
            url: "create_profile.php",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response) {
                $("#responseMessage").css("color", response.success ? "green" : "red").text(response.message);
            },
            error: function () {
                $("#responseMessage").css("color", "red").text("Something went wrong. Try again.");
            }
        });
    });
});
</script>

    <script>
        $(document).ready(function () {
            $("#signup").click(function () {
                $("#content").slideToggle("slow");
            });
        });
    </script>
   <section class="dashboard">
    <h2>Today's Tasks</h2>
    <div id="todayTasks">
        <p>Loading...</p>
    </div>

    <h2>Upcoming Week's Tasks</h2>
    <div id="upcomingTasks">
        <p>Loading...</p>
    </div>
</section>


<script>
$(document).ready(function () {
    $.ajax({
        url: "get_home_tasks.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            // Populate today's tasks
            if (data.today.length > 0) {
                $("#todayTasks").html("<ul>" +
                    data.today.map(task => `<li>${task.task_text}</li>`).join('') +
                    "</ul>");
            } else {
                $("#todayTasks").html("<p>No tasks for today!</p>");
            }

            // Populate this week's tasks
            if (data.week.length > 0) {
                $("#upcomingTasks").html("<ul>" +
                    data.week.map(task => `<li>${task.task_text} — ${task.task_date}</li>`).join('') +
                    "</ul>");
            } else {
                $("#upcomingTasks").html("<p>No upcoming tasks this week.</p>");
            }
        },
        error: function () {
            $("#todayTasks").html("<p>Error loading today's tasks.</p>");
            $("#upcomingTasks").html("<p>Error loading weekly tasks.</p>");
        }
    });
});
</script>



    <footer>
        <p>2025 Gamified To-Do List | Stay Organized, Stay Motivated! <i class="fa fa-heart" style="font-size:30px;color:purple;"></i></p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
