var imie = false;
var nazwisko = false;
var klasa = false;
var numer = false;
var liczbaPunktow = false;
var dataObecna = false;
var maxPkt = null;
var dataOfExam = [];

$(".formViewOfDoc").submit(function(e){
    e.preventDefault();

    dataOfExam = [];

    // console.log("Rozmiar: ");
    // GET VALUE OF INPUT FROM NAME
    // console.log($("input[name=rozmiarKartki]").val());

    if($("[name=imie]").is(":checked")) imie = true;
    if($("[name=nazwisko]").is(":checked")) nazwisko = true;
    if($("[name=klasa]").is(":checked")) klasa = true;
    if($("[name=numer]").is(":checked")) numer = true;
    if($("[name=data]").is(":checked")) data = true;
    if($("[name=liczbaPunktow]").is(":checked") && ($("[name=maxPkt]").val() != "" || $("[name=maxPkt]").val()>0)){
        liczbaPunktow = true;
        maxPkt = $("[name=maxPkt]").val();
        $(".pointsLeftBox").css({"display":"flex"});
    }
    else{
        maxPkt = 9999;
    }
    

    var data = {    
        'RozmiarKartki' : $("[name=rozmiarKartki]").val(),
        'Orientacja' : $("[name=orientacja]").val(),
        'Marginesy' : $("[name=margines]").val(),
        'Imie' : imie,
        'Nazwisko' : nazwisko,
        'Data' : dataObecna,
        'Klasa' : klasa,
        'Numer' : numer,
        'LiczbaPunktow' : liczbaPunktow,
        'MaxPunktow' : maxPkt,
        'IloscGrup' : $("[name=grupy]").val(),
        'PytaniaWGrupach' : $("[name=typGrupy]:checked").val()
    }
    dataOfExam.push(data);
    console.log(dataOfExam);

    $(".formViewOfDoc").css({"display":"none"});
    $(".formWriteQuestions").css({"display":"flex"});
    $(".formHeader h3").html("Krok 3");
    $(".formHeader h4").html("Treść pytań");
    $(".step2").removeClass("stepActive");
    $(".step3").addClass("stepActive");

    generateNextQuestion();
    updatePoints();
});

var n = 1;
var temp = null;

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
                <input placeholder='np. 4.5' name='pointsToGetContent"+n+"' onchange='updatePoints()' type='number' required>\
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

var questions = [];

$(".formWriteQuestions").submit(function(e){
    e.preventDefault();
    if(updatePoints()>maxPkt) alert("Za duzo przydzielonych punktów");
    else{
        questions = [];
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
                    maxPoints: p
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
        $(".step3").removeClass("stepActive");
        $(".step4").addClass("stepActive");
        $(".formHeader h3").html("Krok 4");
        $(".formHeader h4").html("Podgląd dokumentu");
        $(".formWriteQuestions").css({"display":"none"});
        $(".checkOutDoc").css({"display":"flex"});
        $(".pointsLeftBox").css({"display":"none"});
        createRaport();
    }
});

function updatePoints(){
    var actualPoints = 0;
    for(var i=1;i<n;i++){
        actualPoints += parseInt($("[name=pointsToGetContent"+i+"]").val());
    }
    if(isNaN(actualPoints)) actualPoints = 0;
    $(".pointsLeft").html(actualPoints+"/"+maxPkt);

    return actualPoints;
}

function createRaport(){
    console.log('generowanie raportu');
    if(dataOfExam[0].Imie) var raportImie = 'TAK';
    else raportImie = 'NIE';
    if(dataOfExam[0].Nazwisko) var raportNazwisko = 'TAK';
    else raportNazwisko = 'NIE';
    if(dataOfExam[0].Klasa) var raportKlasa = 'TAK';
    else raportKlasa = 'NIE';
    if(dataOfExam[0].Data) var raportData = 'TAK';
    else raportData = 'NIE';
    if(dataOfExam[0].Numer) var raportNumer = 'TAK';
    else raportNumer = 'NIE';
    if(dataOfExam[0].LiczbaPunktow) var raportPkt = dataOfExam[0].MaxPunktow;
    else raportPkt = 'NIE';
    if(dataOfExam[0].IloscGrup>1) var typGrup = dataOfExam[0].PytaniaWGrupach;
    else typGrup = 'BRAK';
    $(".checkOutDoc").append("\
        <div class='raportBlock firstRaportBlock'>\
            Rozmiar kartki: "+dataOfExam[0].RozmiarKartki+"<br>\
            Orientacja: "+dataOfExam[0].Orientacja+"<br>\
            Marginesy: "+dataOfExam[0].Marginesy+"<br>\
        </div>\
        <div class='raportBlock'>\
            Imię: "+raportImie+"<br>\
            Nazwisko: "+raportNazwisko+"<br>\
            Klasa: "+raportKlasa+"<br>\
            Data: "+raportData+"<br>\
            Numer z dziennika: "+raportNumer+"<br>\
            Liczba puntków: "+raportPkt+"<br>\
        </div>\
        <div class='raportBlock'>\
            Ilość grup: "+dataOfExam[0].IloscGrup+"<br>\
            Pytania w grupach: "+typGrup+"<br>\
        </div>\
    ");
    for(var i=1; i<n; i++){
        var temp = i-1;
        $(".checkOutDoc").append("\
            <div class='linijka'></div>\
            <h5>Pytanie "+i+"</h5>\
        ");
        // console.log('zamk'+questions[temp].questionClose);
        // console.log('otw'+questions[temp].questionOpen);
        if(questions[temp].questionClose != null){
            if(questions[temp].correctA) var a = '<span class="correctAnswer">'+questions[temp].answerA+'</span>';
            else var a = '<span>'+questions[temp].answerA+'</span>';
            if(questions[temp].correctB) var b = '<span class="correctAnswer">'+questions[temp].answerB+'</span>';
            else var b = '<span>'+questions[temp].answerB+'</span>';
            if(questions[temp].correctC) var c = '<span class="correctAnswer">'+questions[temp].answerC+'</span>';
            else var c = '<span>'+questions[temp].answerC+'</span>';
            if(questions[temp].correctD) var d = '<span class="correctAnswer">'+questions[temp].answerD+'</span>';
            else var d = '<span>'+questions[temp].answerD+'</span>';
            $(".checkOutDoc").append("\
            <div class='raportBlock'>\
                <span>Treść pytania zamkniętego: <span class='raportQ' id='raportQ"+temp+"' onclick='changeQuestion("+temp+")'>"+questions[temp].questionClose+"</span></span>\
                <span>Odpowiedź A: "+a+"</span>\
                <span>Odpowiedź B: "+b+"</span>\
                <span>Odpowiedź C: "+c+"</span>\
                <span>Odpowiedź D: "+d+"</span>\
                <span>Punkty do zdobycia: "+questions[temp].maxPoints+"\
            </div>\
        ");
        }
        else{
            $(".checkOutDoc").append("\
            <div class='raportBlock'>\
                Treść pytania otwartego: "+questions[temp].questionOpen+"<br>\
                Liczba linijek: "+questions[temp].answerOpen+"<br>\
                Punkty do zdobycia: "+questions[temp].maxPoints+"\
            </div>\
        ");
        }
        // console.log(questions[temp-1]);
    }
    $(".checkOutDoc").append("\
        <div class='generateDoc' onclick='generujPDF()'>Generuj plik</div>\
    ");
}

function typeOfQuestionsSelect(){
    if($("[name=grupy]").val()>1) $(".typeOfQuestions").css({"display":"flex"});
    else $(".typeOfQuestions").css({"display":"none"});
}

function generujPDF(){
    console.log('generowanie PDF');
    $(".step4").removeClass("stepActive");
    $(".step5").addClass("stepActive");
    $(".formHeader h3").html("Krok 5");
    $(".formHeader h4").html("Generowanie pliku");
    $(".pdfBox").css({"display":"flex"});
    $(".checkOutDoc").css({"display":"none"});
};

function changeQuestion(id){
    console.log('I want to change content of question number: '+id);
    $("#raportQ"+id).attr("onclick", "");
    $("#raportQ"+id).html("\
        <div class='changeQuestionInputBox' id='cQIB"+id+"'>\
            <input type='text' name='newQuestion"+id+"' class='changeQuestionInput' value='"+questions[id].questionClose+"'>\
            <i class='fas fa-check-circle' onclick='changeQuestionCloseAccept("+id+")'></i>\
            <i class='fas fa-times-circle'></i>\
        </div>\
    ");
}

function changeQuestionCloseAccept(idQ){
    console.log('changed questions : '+idQ);
    questions[idQ].questionClose = $("[name=newQuestion"+idQ+"]").val();
    $('#cQIB'+idQ).css({"display":"none"});
    $('#raportQ'+idQ).html(questions[idQ].questionClose);
}
