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
        <div class='oneQuest oneQuest"+n+"'>\
            <div class='makeQuestionField selectOption"+n+"'>\
                <span>Wybierz opcję powyżej</span>\
            </div>\
            <div class='makeQuestionField openQuest openQuest"+n+"'>\
                <label for='trescPytania"+n+"' name='openQuestContent"+n+"'>Treść pytania:</label>\
                <input type='text' placeholder='Podaj treść pytania otwartego' name='trescPytania"+n+"' required>\
            </div>\
            <div class='makeQuestionField closeQuest closeQuest"+n+"'>\
                <label for='trescPytania"+n+"' name='closeQuestContent"+n+"'>Treść pytania:</label>\
                <input type='text' placeholder='Podaj treść pytania zamkniętego' name='trescPytania"+n+"' required>\
            </div>\
            <div class='makeQuestionField rowsToHave rowToHave"+n+"'>\
                <label for='rowsInQuestion"+n+"'>Liczba linijek na odpowiedź:</label>\
                <input placeholder='np. 2' name='rowsInQuestion"+n+"' type='number' required>\
            </div>\
            <div class='makeQuestionField openAnswers openAnswers"+n+"'>\
                <div class='odpowiedzForm'>\
                    <label for='answerA"+n+"'>Odpowiedź A:</label>\
                    <input placeholder='Treść odpowiedzi A' name='answerA"+n+"' type='text'>\
                </div>\
                <div class='odpowiedzForm'>\
                    <label for='answerB"+n+"'>Odpowiedź B:</label>\
                    <input placeholder='Treść odpowiedzi B' name='answerB"+n+"' type='text'>\
                </div>\
                <div class='odpowiedzForm'>\
                    <label for='answerC"+n+"'>Odpowiedź C:</label>\
                    <input placeholder='Treść odpowiedzi C' name='answerC"+n+"' type='text'>\
                </div>\
                <div class='odpowiedzForm'>\
                    <label for='answerD"+n+"'>Odpowiedź D:</label>\
                    <input placeholder='Treść odpowiedzi D' name='answerD"+n+"' type='text'>\
                </div>\
            </div>\
            <div class='makeQuestionField pointsToGet'>\
                <label for='pointsToGetContent"+n+"'>Liczba punktów do zdobycia:</label>\
                <input placeholder='np. 4.5' name='pointsToGetContent"+n+"' type='number' required>\
            </div>\
        </div>\
        <div class='nextQuestion' onclick='clickedBtn()' id='nextQuestion"+n+"'>\
            Dodaj kolejne pytanie\
        </div>\
        ");
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
    $(".selectOption"+x).css({"display":"none"});
    $(".openAnswers"+x).css({"display":"none"});
    $(".rowToHave"+x).css({"display":"flex"});
    $(".chooseOpen"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseClose"+x).css({"background":"transparent","color":"#2f2d49"});
}

function chooseClose(x){
    $(".openQuest"+x).css({"display":"none"});
    $(".closeQuest"+x).css({"display":"flex"});
    $(".rowToHave"+x).css({"display":"none"});
    $(".openAnswers"+x).css({"display":"flex"});
    $(".selectOption"+x).css({"display":"none"});
    $(".chooseClose"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseOpen"+x).css({"background":"transparent","color":"#2f2d49"});
}

