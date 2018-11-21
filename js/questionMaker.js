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
                <label for='trescPytaniaOtwartego"+n+"'>Treść pytania:</label>\
                <input type='text' placeholder='Podaj treść pytania otwartego' name='trescPytaniaOtwartego"+n+"'>\
            </div>\
            <div class='makeQuestionField closeQuest closeQuest"+n+"'>\
                <label for='trescPytaniaZamknietego"+n+"'>Treść pytania:</label>\
                <input type='text' placeholder='Podaj treść pytania zamkniętego' name='trescPytaniaZamknietego"+n+"'>\
            </div>\
            <div class='makeQuestionField rowsToHave rowToHave"+n+"'>\
                <label for='rowsInQuestion"+n+"'>Liczba linijek na odpowiedź:</label>\
                <input placeholder='np. 2' name='rowsInQuestion"+n+"' type='number'>\
            </div>\
            <div class='makeQuestionField openAnswers openAnswers"+n+"'>\
                <div class='odpowiedzForm'>\
                    <label for='answerA"+n+"'>Odpowiedź A:</label>\
                    <input placeholder='Treść odpowiedzi A' name='answerA"+n+"' type='text'>\
                    <input type='checkbox' name='correctA"+n+"'>\
                </div>\
                <div class='odpowiedzForm'>\
                    <label for='answerB"+n+"'>Odpowiedź B:</label>\
                    <input placeholder='Treść odpowiedzi B' name='answerB"+n+"' type='text'>\
                    <input type='checkbox' name='correctB"+n+"'>\
                </div>\
                <div class='odpowiedzForm'>\
                    <label for='answerC"+n+"'>Odpowiedź C:</label>\
                    <input placeholder='Treść odpowiedzi C' name='answerC"+n+"' type='text'>\
                    <input type='checkbox' name='correctC"+n+"'>\
                </div>\
                <div class='odpowiedzForm'>\
                    <label for='answerD"+n+"'>Odpowiedź D:</label>\
                    <input placeholder='Treść odpowiedzi D' name='answerD"+n+"' type='text'>\
                    <input type='checkbox' name='correctD"+n+"'>\
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
        <button class='submit"+n+"' type='submit'>Przejdź dalej</button>\
        ");
    console.log("Dodano "+n+" pytanie");    
    temp = n;
    n++;
}

function clickedBtn(){
    // console.log("click working");
    $("#nextQuestion"+temp).css({"display":"none"});
    $(".submit"+temp).css({"display":"none"});
    generateNextQuestion();
}

function chooseOpen(x){
    $(".openQuest"+x).css({"display":"flex"});
    $(".closeQuest"+x).css({"display":"none"});
    $(".selectOption"+x).css({"display":"none"});
    $(".openAnswers"+x).css({"display":"none"});
    $(".rowToHave"+x).css({"display":"flex"});
    $("[name=trescPytaniaZamknietego"+x+"]").val("");
    $(".chooseOpen"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseClose"+x).css({"background":"transparent","color":"#2f2d49"});
}

function chooseClose(x){
    $(".openQuest"+x).css({"display":"none"});
    $(".closeQuest"+x).css({"display":"flex"});
    $(".rowToHave"+x).css({"display":"none"});
    $(".openAnswers"+x).css({"display":"flex"});
    $(".selectOption"+x).css({"display":"none"});
    $("[name=trescPytaniaOtwartego"+x+"]").val("");
    $(".chooseClose"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseOpen"+x).css({"background":"transparent","color":"#2f2d49"});
}

$(".formWriteQuestions").submit(function(e){
    e.preventDefault();

    var questions = [];
    for(var i=1;i<n;i++){
        var tOtwarta = $("[name=trescPytaniaOtwartego"+i+"]").val();
        var tZamknieta = $("[name=trescPytaniaZamknietego"+i+"]").val();
        // console.log(tOtwarta);
        if(tOtwarta != undefined && tOtwarta != ""){
            var q = $("[name=trescPytaniaOtwartego"+i+"]").val(); // pytanie otwarte
            var l = $("[name=rowsInQuestion"+i+"]").val(); // liczba linijek na odpowiedz
            var p = $("[name=pointsToGetContent"+i+"]").val(); // liczba punktow do zdobycia
            var data = {
                questionOpen: q,
                answerOpen: l,
                maxPointsOpen: p
            }
        }
        if(tZamknieta != undefined && tZamknieta != ""){
            var cA = false;
            var cB = false;
            var cC = false;
            var cD = false;
            var q = $("[name=trescPytaniaZamknietego"+i+"]").val(); // pytanie otwarte
            if($("[name=answerA"+i+"]").val() != undefined || $("[name=answerA"+i+"]").val() != "") {
                var a = $("[name=answerA"+i+"]").val();
            } // odp A
            if($("[name=answerB"+i+"]").val() != undefined || $("[name=answerB"+i+"]").val() != "") {
                var b = $("[name=answerB"+i+"]").val();
            } // odp B
            if($("[name=answerC"+i+"]").val() != undefined || $("[name=answerC"+i+"]").val() != "") {
                var c = $("[name=answerC"+i+"]").val();
            } // odp C
            if($("[name=answerD"+i+"]").val() != undefined || $("[name=answerD"+i+"]").val() != "") {
                var d = $("[name=answerD"+i+"]").val();
            } // odp D
            if($("[name=correctA"+i+"]").is(":checked")) cA = true;
            if($("[name=correctB"+i+"]").is(":checked")) cB = true;
            if($("[name=correctC"+i+"]").is(":checked")) cC = true;
            if($("[name=correctD"+i+"]").is(":checked")) cD = true;
            var p = $("[name=pointsToGetContent"+i+"]").val(); // liczba punktow do zdobycia
            var data = {
                questionClose: q,
                answerA: a,
                answerB: b,
                answerC: c,
                answerD: d,
                maxPoints: p,
                correctA: cA,
                correctB: cB,
                correctC: cC,
                correctD: cD
            }
        }
        questions.push(data);
    }
    console.log(questions);
});

