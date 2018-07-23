var snakeBody = ["x1y1", "x2y1", "x3y1"],
    food,
    speed = 2,
    score = 0,
    direction = "r",
    gridSize = { height: 20, width: 20 },
    canChangeDirection = true,
    interval;

function createTable () {
    var table = $("<table>").addClass("table table-bordered");
    for(var i = 1; i <= gridSize.height; i++) {
        var tableRow = $("<tr>").addClass(i);
        for(var j = 1; j <= gridSize.width; j++) {
            var tableData = $("<td>").attr("id", "x" + j + "y" + i);
            // tableData.text("x" + j + "y" + i);
            tableRow.append(tableData);
        }
        table.append(tableRow);
    }

    $("#grid").append(table);
}

function paintBody () {
    for (var i = 0; i < snakeBody.length; i ++) {
        $("#" + snakeBody[i]).addClass("snake-body");
    }
}

function randomGridNumber () {
    return {
        x: Math.floor(Math.random() * gridSize.width + 1),
        y: Math.floor(Math.random() * gridSize.height + 1)
    };
}

function paintFood () {
    var random, foodPos;

    do {
        random = randomGridNumber(),
        foodPos = "x" + random.x + "y" + random.y;
    } while ($("#" + foodPos).hasClass("snake-body"));

    $("#" + foodPos).addClass("food");
}

function checkKey (e) {
    if (!canChangeDirection)
        return;
    
    e = e || window.event;

    if (e.keyCode == "37" && direction != "r")
        direction = "l";
    else if (e.keyCode == "38" && direction != "d")
        direction = "u";
    else if (e.keyCode == "39" && direction != "l")
        direction = "r";
    else if (e.keyCode == "40" && direction != "u")
        direction = "d";

    canChangeDirection = false;
}

function checkFood (headPos) {
    if ($("#" + headPos).hasClass("food")) {
        $("#" + headPos).removeClass("food");
        score++;
        speed += 0.5;
        clearInterval(interval);
        interval = window.setInterval(intervalFunction, 1000 / speed);
        paintFood();
    } else {
        var tail = snakeBody.shift();
        $("#" + tail).removeClass("snake-body");
    }
}

function gameOver () {
    clearInterval(interval);
    alert("Game Over\nYour score: " + score);
    updateScore();
    window.location = "snake.html";
}

function updateScore () {
    var storageScore = localStorage.getItem("scoreArray"),
        oldScore;

    if (typeof(storageScore) === "undefined" || storageScore === "") {
        oldScore = [];
    } else {
        oldScore = JSON.parse(storageScore);
    }

    oldScore.push(score);
    oldScore.sort(function (a, b) { return b - a; });
    localStorage.setItem('scoreArray', JSON.stringify(oldScore));
}

function moveSnake () {
    var newHead = snakeBody[snakeBody.length - 1],
        headX,
        headY;

    headX = newHead.match(/\d+/g)[0];
    headY = newHead.match(/\d+/g)[1];

    if (direction == "r")
        headX++;
    else if (direction == "l")
        headX--;
    else if (direction == "d")
        headY++;
    else if (direction == "u")
        headY--;

    if (headX < 1 || headX > gridSize.width || headY < 1 || headY > gridSize.height)
        gameOver();

    newHead = "x" + headX + "y" + headY;
    checkFood(newHead);
    snakeBody.push(newHead);
    $("#" + newHead).addClass("snake-body");
}

function checkBody () {
    var counts = [];
    for(var i = 0; i <= snakeBody.length; i++) {
        if(counts[snakeBody[i]] === undefined) {
            counts[snakeBody[i]] = 1;
        } else {
            return gameOver();
        }
    }
}

function intervalFunction () {
    moveSnake();
    console.log(score, speed);
    canChangeDirection = true;
    checkBody();
}

$(function() {
    createTable();
    paintBody();
    paintFood();
    document.onkeydown = checkKey;

    interval = window.setInterval(intervalFunction, 1000 / speed);
});