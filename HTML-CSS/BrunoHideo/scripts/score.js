var score = JSON.parse(localStorage.getItem('scoreArray')) || [],
    list = $("<ol>"),
    item,
    text;

if (score.length > 10) {
    score.pop();
    localStorage.setItem('scoreArray', JSON.stringify(score));
}

for (var i = 0; i < score.length; i++) {
    text = score[i];
    if (text == 1)
        text += " point";
    else
        text += " points";

    item = $("<li>").text(text);
    list.append(item);
}

$("#highscore-table").html(list);