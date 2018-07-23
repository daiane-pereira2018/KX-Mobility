function loadHighscore() {
    var storageScore = localStorage.getItem('scoreArray'),
        score,
        list = $("<ol>"),
        item,
        text;

    if (typeof(storageScore) === "undefined" || storageScore === "") {
        score = [];
    } else {
        score = JSON.parse(storageScore);
    }

    if (score.length > 10) {
        score.pop();
        localStorage.setItem('scoreArray', JSON.stringify(score));
    }

    for (var i = 0; i < score.length; i++) {
        text = score[i];
        if (text == 1)
            text += " ponto";
        else
            text += " pontos";

        item = $("<li>").text(text);
        list.append(item);
    }

    $("#highscore-table").html(list);
}

$(document).ready(function() {
    loadHighscore();

    $("#clear-highscore").click(function() {
        localStorage.setItem('scoreArray', JSON.stringify([]));

        loadHighscore();
    });
});
