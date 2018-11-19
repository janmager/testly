var n = 1;
var temp = null;

generateNextQuestion();

function generateNextQuestion(){
    $(".formWriteQuestions").append("\
        <div class='oneOptionForm'>\
            <h5 id='nextQuestionHeader"+n+"'>Pytanie numer "+n+"</h5>\
            <div class='borderH5'></div>\
        </div>\
        <div class='chooseOpenOrClose'>\
            <div class='chooseOpen"+n+" chooseOpen' onclick='chooseOpen("+n+")'>Pytanie otwarte</div>\
            <div class='chooseClose"+n+" chooseClose' onclick='chooseClose("+n+")'>Pytanie zamknięte</div>\
        </div>\
        <div class='makeQuestionField openQuest openQuest"+n+"'>\
            <label for='trescPytania"+n+"'>Treść pytania:</label>\
            <input type='text' placeholder='Podaj treść pytania otwartego' name='trescPytania"+n+"'>\
        </div>\
        <div class='makeQuestionField closeQuest closeQuest"+n+"'>\
            <label for='trescPytania"+n+"'>Treść pytania:</label>\
            <input type='text' placeholder='Podaj treść pytania zamkniętego' name='trescPytania"+n+"'>\
        </div>\
        <div class='nextQuestion' onclick='clickedBtn()' id='nextQuestion"+n+"'>\
            Dodaj kolejne pytanie\
        </div>\
        ");
    // $(".formWriteQuestions").append("<h5 id='nextQuestionHeader"+n+"'>Pytanie no."+n+"</h5>");
    // $(".formWriteQuestions").append("<div class='borderH5'></div>");
    // $(".formWriteQuestions").append("</div>");
    // $(".formWriteQuestions").append("<div class='nextQuestion' id='nextQuestion"+n+"'>Dodaj kolejne pytanie</div>");
    console.log("Dodano "+n+" pytanie");    
    temp = n;
    n++;
}

function clickedBtn(){
    // console.log("click working");
    $("#nextQuestion"+temp).css({"display":"none"});
    generateNextQuestion();
}

function chooseOpen(x){
    $(".openQuest"+x).css({"display":"flex"});
    $(".closeQuest"+x).css({"display":"none"});
    $(".chooseOpen"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseClose"+x).css({"background":"transparent","color":"#2f2d49"});
}

function chooseClose(x){
    $(".openQuest"+x).css({"display":"none"});
    $(".closeQuest"+x).css({"display":"flex"});
    $(".chooseClose"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseOpen"+x).css({"background":"transparent","color":"#2f2d49"});
}

