var n = 1;
var temp = null;

generateNextQuestion();

function generateNextQuestion(){
    $(".formWriteQuestions").append("\
        <div class='oneOptionForm'>\
            <h5 id='nextQuestionHeader"+n+"'>Pytanie numer "+n+"</h5>\
            <div class='borderH5'></div>\
        </div>\
        <div class='makeQuestionField'>\
            <label for='trescPytania"+n+"'>Treść pytania</label>\
            <input type='text' name='trescPytania"+n+"'>\
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
    console.log("click working");
    $("#nextQuestion"+temp).css({"display":"none"});
    generateNextQuestion();
}