var imie = false;
var nazwisko = false;
var klasa = false;
var numer = false;
var liczbaPunktow = false;
var dataObecna = false;
var maxPkt = null;
var dataOfExam = [];

var home = $(".home");
var startFormBox = $(".startCreatingFormBox");
var btnStart = $(".open-creator");

btnStart.click(function(){
  home.css({"display":"none"});
  startFormBox.css({"display":"flex"});
})


function startKart(){
    // KROK 1
    checked = true;
    $(".step1").removeClass("stepActive");
    $(".step2").addClass("stepActive");
    $(".formHeader h3").html("Krok 2");
    $(".formHeader h4").html("Ustawienia wizualne");
    $(".formInFormBox").css({"display":"none"});
    $(".kartModeForm").css({"display":"flex"});
}

// EXTRA FIELDS (pkt)
$(".numberOfPoints").click(function(){
    // ADD IF STATMENT WITH ATTR CHECKED
    if(checked){
        $(".pointsToHave").css({"display":"flex"});
        checked = false;
    }
    else{
        $(".pointsToHave").css({"display":"none"});
        checked = true;
    }
    
});

$('.optionKart').click(function(){
    startKart();
});

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
        <div id='question"+n+"' class='questionBOX'>\
            <div class='oneOptionForm'>\
                <h5 id='nextQuestionHeader"+n+"'>Pytanie numer "+n+"</h5>\
                <div class='borderH5'></div>\
            </div>\
            <div class='chooseOpenOrClose'>\
                <div class='chooseOpen"+n+" chooseOpen' onclick='chooseOpen("+n+")'>Pytanie otwarte</div>\
                <div class='chooseClose"+n+" chooseClose' onclick='chooseClose("+n+")'>Pytanie zamknięte</div>\
                <div class='deleteQuestion"+n+" deleteQuestion' onclick='deleteQuestion("+n+")'>Usuń pytanie</div>\
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
                    <h6>Jak zostawisz pustą odpowiedź, nie będzie ona brana pod uwagę.</h6>\
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
                    <div class='odpowiedzForm'>\
                        <label for='answerE"+n+"'>Odpowiedź E:</label>\
                        <input placeholder='Treść odpowiedzi E' name='answerE"+n+"' type='text'>\
                        <input type='checkbox' name='correctE"+n+"'>\
                    </div>\
                    <div class='odpowiedzForm'>\
                        <label for='answerF"+n+"'>Odpowiedź F:</label>\
                        <input placeholder='Treść odpowiedzi F' name='answerF"+n+"' type='text'>\
                        <input type='checkbox' name='correctF"+n+"'>\
                    </div>\
                </div>\
                <div class='makeQuestionField pointsToGet'>\
                    <label for='pointsToGetContent"+n+"'>Liczba punktów do zdobycia:</label>\
                    <input placeholder='np. 4.5' name='pointsToGetContent"+n+"' onchange='updatePoints()' type='number' required>\
                </div>\
            </div>\
        </div>\
        <div class='flexZone'>\
            <div class='nextQuestion' onclick='clickedBtn()' id='nextQuestion"+n+"'>\
                Dodaj kolejne pytanie\
            </div>\
            <button class='submit"+n+"' type='submit'>Przejdź dalej</button>\
        </div>\
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
    $("[name=trescPytaniaOtwartego"+x+"]").attr('required', true);
    $("[name=trescPytaniaZamknietego"+x+"]").attr('required', false);
    $("[name=rowsInQuestion"+x+"]").attr('required', true);
    $("[name=answerA"+x+"]").attr('required', false);
    $("[name=answerB"+x+"]").attr('required', false);
    $(".chooseOpen"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseClose"+x).css({"background":"transparent","color":"#2f2d49"});
    if(x!=1) $(".deleteQuestion"+x).css({"display":"flex"});
}

function chooseClose(x){
    $(".openQuest"+x).css({"display":"none"});
    $(".closeQuest"+x).css({"display":"flex"});
    $(".rowToHave"+x).css({"display":"none"});
    $(".openAnswers"+x).css({"display":"flex"});
    $(".selectOption"+x).css({"display":"none"});
    $("[name=trescPytaniaOtwartego"+x+"]").attr('required', false);
    $("[name=rowsInQuestion"+x+"]").attr('required', false);
    $("[name=trescPytaniaZamknietego"+x+"]").attr('required', true);
    $("[name=answerA"+x+"]").attr('required', true);
    $("[name=answerB"+x+"]").attr('required', true);
    $("[name=trescPytaniaOtwartego"+x+"]").val("");
    $(".chooseClose"+x).css({"border":"2px solid #2f2d49","background":"#2f2d49","color":"white"});
    $(".chooseOpen"+x).css({"background":"transparent","color":"#2f2d49"});
    if(x!=1) $(".deleteQuestion"+x).css({"display":"flex"});
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
                var cE = false;
                var cF = false;
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
                if($("[name=answerE"+i+"]").val() != undefined || $("[name=answerE"+i+"]").val() != "") {
                    var e = $("[name=answerE"+i+"]").val();
                } // odp E
                if($("[name=answerF"+i+"]").val() != undefined || $("[name=answerF"+i+"]").val() != "") {
                    var f = $("[name=answerF"+i+"]").val();
                } // odp F
                if($("[name=correctA"+i+"]").is(":checked")) cA = true;
                if($("[name=correctB"+i+"]").is(":checked")) cB = true;
                if($("[name=correctC"+i+"]").is(":checked")) cC = true;
                if($("[name=correctD"+i+"]").is(":checked")) cD = true;
                if($("[name=correctE"+i+"]").is(":checked")) cE = true;
                if($("[name=correctF"+i+"]").is(":checked")) cF = true;
                var p = $("[name=pointsToGetContent"+i+"]").val(); // liczba punktow do zdobycia
                var data = {
                    questionClose: q,
                    answerA: a,
                    answerB: b,
                    answerC: c,
                    answerD: d,
                    answerE: e,
                    answerF: f,
                    maxPoints: p,
                    correctA: cA,
                    correctB: cB,
                    correctC: cC,
                    correctD: cD,
                    correctE: cE,
                    correctF: cF
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
            <h6>(Aby zmienić pytanie lub odpowiedź kliknij w treść.)</h6>\
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
            if(questions[temp].correctE) var e = '<span class="correctAnswer">'+questions[temp].answerE+'</span>';
            else var e = '<span>'+questions[temp].answerE+'</span>';
            if(questions[temp].correctF) var f = '<span class="correctAnswer">'+questions[temp].answerF+'</span>';
            else var f = '<span>'+questions[temp].answerF+'</span>';
            $(".checkOutDoc").append("\
                <div class='raportBlock'>\
                    <span>Treść pytania zamkniętego: <span class='raportQ' id='raportQ"+temp+"' onclick='changeQuestion("+temp+")'>"+questions[temp].questionClose+"</span></span>\
                    <span id='spanAnswerA"+temp+"'>Odpowiedź A: <span class='raportA' id='raportQA"+temp+"' onclick='editCloseQuestion(1,"+temp+")'>"+a+"</span></span>\
                    <span id='spanAnswerB"+temp+"'>Odpowiedź B: <span class='raportA' id='raportQB"+temp+"' onclick='editCloseQuestion(2,"+temp+")'>"+b+"</span></span>\
                    <span id='spanAnswerC"+temp+"'>Odpowiedź C: <span class='raportA' id='raportQC"+temp+"' onclick='editCloseQuestion(3,"+temp+")'>"+c+"</span></span>\
                    <span id='spanAnswerD"+temp+"'>Odpowiedź D: <span class='raportA' id='raportQD"+temp+"' onclick='editCloseQuestion(4,"+temp+")'>"+d+"</span></span>\
                    <span id='spanAnswerE"+temp+"'>Odpowiedź E: <span class='raportA' id='raportQE"+temp+"' onclick='editCloseQuestion(5,"+temp+")'>"+e+"</span></span>\
                    <span id='spanAnswerF"+temp+"'>Odpowiedź F: <span class='raportA' id='raportQF"+temp+"' onclick='editCloseQuestion(6,"+temp+")'>"+f+"</span></span>\
                    <span>Punkty do zdobycia: "+questions[temp].maxPoints+"\
                </div>\
            ");
            if(questions[temp].answerA == undefined || questions[temp].answerA == ""){
                $("#spanAnswerA"+temp).css({"display":"none"});
            }
            if(questions[temp].answerB == undefined || questions[temp].answerB == ""){
                $("#spanAnswerB"+temp).css({"display":"none"});
            }
            if(questions[temp].answerC == undefined || questions[temp].answerC == ""){
                $("#spanAnswerC"+temp).css({"display":"none"});
            }
            if(questions[temp].answerD == undefined || questions[temp].answerD == ""){
                $("#spanAnswerD"+temp).css({"display":"none"});
            }
            if(questions[temp].answerE == undefined || questions[temp].answerE == ""){
                $("#spanAnswerE"+temp).css({"display":"none"});
            }
            if(questions[temp].answerF == undefined || questions[temp].answerF == ""){
                $("#spanAnswerF"+temp).css({"display":"none"});
            }
        }
        else{
            $(".checkOutDoc").append("\
            <div class='raportBlock'>\
                <span>Treść pytania otwartego: <span class='raportQ' id='raportQ"+temp+"' onclick='changeQuestionOpen("+temp+")'>"+questions[temp].questionOpen+"</span></span>\
                <span>Liczba linijek: "+questions[temp].answerOpen+"</span>\
                <span>Punkty do zdobycia: "+questions[temp].maxPoints+"</span>\
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

function changeQuestion(id){
    $("#raportQ"+id).attr("onclick", "");
    $("#raportQ"+id).html("\
        <div class='changeQuestionInputBox' id='cQIB"+id+"'>\
            <input type='text' name='newQuestion"+id+"' class='changeQuestionInput' value='"+questions[id].questionClose+"'>\
            <i class='fas fa-check-circle' onclick='changeQuestionCloseAccept("+id+")'></i>\
            <i class='fas fa-times-circle' onclick='anulujEditQuestionClose("+id+")'></i>\
        </div>\
    ");
}

function changeQuestionOpen(id){
    $("#raportQ"+id).attr("onclick", "");
    $("#raportQ"+id).html("\
        <div class='changeQuestionInputBox' id='cQIB"+id+"'>\
            <input type='text' name='newQuestion"+id+"' class='changeQuestionInput' value='"+questions[id].questionOpen+"'>\
            <i class='fas fa-check-circle' onclick='changeQuestionOpenAccept("+id+")'></i>\
            <i class='fas fa-times-circle' onclick='anulujEditQuestionOpen("+id+")'></i>\
        </div>\
    ");
}

function changeQuestionCloseAccept(idQ){
    // console.log('changed questions : '+idQ);
    questions[idQ].questionClose = $("[name=newQuestion"+idQ+"]").val();
    $('#cQIB'+idQ).css({"display":"none"});
    $('#raportQ'+idQ).html("<span onclick='changeQuestion("+idQ+")' id='raportQ'"+idQ+">"+questions[idQ].questionClose+"</span>");
}

function changeQuestionOpenAccept(idQ){
    // console.log('changed questions : '+idQ);
    questions[idQ].questionOpen = $("[name=newQuestion"+idQ+"]").val();
    $('#cQIB'+idQ).css({"display":"none"});
    $('#raportQ'+idQ).html("<span onclick='changeQuestionOpen("+idQ+")' id='raportQ'"+idQ+">"+questions[idQ].questionOpen+"</span>");
}

function anulujEditQuestionClose(idQ){
    $('#raportQ'+idQ).html("<span onclick='changeQuestion("+idQ+")' id='raportQ'"+idQ+">"+questions[idQ].questionClose+"</span>");
}

function anulujEditQuestionOpen(idQ){
    $('#raportQ'+idQ).html("<span onclick='changeQuestionOpen("+idQ+")' id='raportQ'"+idQ+">"+questions[idQ].questionOpen+"</span>");
}

function editCloseQuestion(litera,idQ){
    var wynik = null;
    var literaTemp = null;
    if(litera==1){
        literaTemp = 'A';
        wynik = questions[idQ].answerA;
        $("#raportQ"+literaTemp+idQ).attr("onclick", "");
        if(questions[idQ].correctA){
            $("#raportQ"+literaTemp+idQ).html("\
                <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                    <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                    <input type='checkbox' name='correctEA"+idQ+"' checked>\
                    <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                    <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
                </div>\
            ");
        }
        else{
            $("#raportQ"+literaTemp+idQ).html("\
            <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                <input type='checkbox' name='correctEA"+idQ+"'>\
                <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
            </div>\
        ");
        }
    } 
    else if(litera==2){
        literaTemp = 'B';
        wynik = questions[idQ].answerB;
        $("#raportQ"+literaTemp+idQ).attr("onclick", "");
        if(questions[idQ].correctB){
            $("#raportQ"+literaTemp+idQ).html("\
                <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                    <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                    <input type='checkbox' name='correctEB"+idQ+"' checked>\
                    <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                    <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
                </div>\
            ");
        }
        else{
            $("#raportQ"+literaTemp+idQ).html("\
            <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                <input type='checkbox' name='correctEB"+idQ+"'>\
                <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
            </div>\
        ");
        }
    } 
    //oomom
    else if(litera==3){
        literaTemp = 'C';
        wynik = questions[idQ].answerC;
        $("#raportQ"+literaTemp+idQ).attr("onclick", "");
        if(questions[idQ].correctC){
            $("#raportQ"+literaTemp+idQ).html("\
                <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                    <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                    <input type='checkbox' name='correctEC"+idQ+"' checked>\
                    <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                    <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
                </div>\
            ");
        }
        else{
            $("#raportQ"+literaTemp+idQ).html("\
            <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                <input type='checkbox' name='correctEC"+idQ+"'>\
                <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
            </div>\
        ");
        }
    } 
    else if(litera==4){
        literaTemp = 'D';
        wynik = questions[idQ].answerD;
        $("#raportQ"+literaTemp+idQ).attr("onclick", "");
        if(questions[idQ].correctD){
            $("#raportQ"+literaTemp+idQ).html("\
                <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                    <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                    <input type='checkbox' name='correctED"+idQ+"' checked>\
                    <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                    <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
                </div>\
            ");
        }
        else{
            $("#raportQ"+literaTemp+idQ).html("\
            <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                <input type='checkbox' name='correctED"+idQ+"'>\
                <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
            </div>\
        ");
        }
    }
    else if(litera==5){
        literaTemp = 'E';
        wynik = questions[idQ].answerE;
        $("#raportQ"+literaTemp+idQ).attr("onclick", "");
        if(questions[idQ].correctE){
            $("#raportQ"+literaTemp+idQ).html("\
                <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                    <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                    <input type='checkbox' name='correctEE"+idQ+"' checked>\
                    <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                    <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
                </div>\
            ");
        }
        else{
            $("#raportQ"+literaTemp+idQ).html("\
            <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                <input type='checkbox' name='correctEE"+idQ+"'>\
                <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
            </div>\
        ");
        }
    } 
    else if(litera==6){
        literaTemp = 'F';
        wynik = questions[idQ].answerF;
        $("#raportQ"+literaTemp+idQ).attr("onclick", "");
        if(questions[idQ].correctF){
            $("#raportQ"+literaTemp+idQ).html("\
                <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                    <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                    <input type='checkbox' name='correctEF"+idQ+"' checked>\
                    <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                    <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
                </div>\
            ");
        }
        else{
            $("#raportQ"+literaTemp+idQ).html("\
            <div class='changeQuestionInputBox' id='cQIB"+literaTemp+idQ+"'>\
                <input type='text' name='newQuestion"+literaTemp+idQ+"' class='changeQuestionInput' value='"+wynik+"'>\
                <input type='checkbox' name='correctEF"+idQ+"'>\
                <i class='fas fa-check-circle' onclick='acceptEditCloseQuestion("+litera+","+idQ+")'></i>\
                <i class='fas fa-times-circle' onclick='anulujEditCloseQuestion("+litera+","+idQ+")'></i>\
            </div>\
        ");
        }
    } 
}

function acceptEditCloseQuestion(litera,idQ){
    var literaTemp = null;
    if(litera==1){
        literaTemp = 'A';
        if($("[name=correctEA"+idQ+"]").is(":checked")){
            questions[idQ].correctA = true;
            if(questions[idQ].answerA != '') questions[idQ].answerA = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerA = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerA+"</span>");
        }
        else{
            questions[idQ].correctA = false;
            if(questions[idQ].answerA != '') questions[idQ].answerA = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerA = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerA+"</span>");
        }
    } 
    else if(litera==2){
        literaTemp = 'B';
        if($("[name=correctEB"+idQ+"]").is(":checked")){
            questions[idQ].correctB = true;
            if(questions[idQ].answerB != '') questions[idQ].answerB = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerB = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerB+"</span>");
        }
        else{
            questions[idQ].correctB = false;
            if(questions[idQ].answerB != '') questions[idQ].answerB = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerB = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerB+"</span>");
        }
    } 
    else if(litera==3){
        literaTemp = 'C';
        if($("[name=correctEC"+idQ+"]").is(":checked")){
            questions[idQ].correctC = true;
            if(questions[idQ].answerC != '') questions[idQ].answerC = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerC = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerC+"</span>");
        }
        else{
            questions[idQ].correctC = false;
            if(questions[idQ].answerC != '') questions[idQ].answerC = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerC = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerC+"</span>");
        }
    } 
    else if(litera==4){
        literaTemp = 'D';
        if($("[name=correctED"+idQ+"]").is(":checked")){
            questions[idQ].correctD = true;
            if(questions[idQ].answerD != '') questions[idQ].answerD = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerD = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerD+"</span>");
        }
        else{
            questions[idQ].correctD = false;
            if(questions[idQ].answerD != '') questions[idQ].answerD = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerD = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerD+"</span>");
        }
    } 
    else if(litera==5){
        literaTemp = 'E';
        if($("[name=correctEE"+idQ+"]").is(":checked")){
            questions[idQ].correctE = true;
            if(questions[idQ].answerE != '') questions[idQ].answerE = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerE = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerE+"</span>");
        }
        else{
            questions[idQ].correctE = false;
            if(questions[idQ].answerE != '') questions[idQ].answerE = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerE = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerE+"</span>");
        }
    }
    else if(litera==6){
        literaTemp = 'F';
        if($("[name=correctEF"+idQ+"]").is(":checked")){
            questions[idQ].correctF = true;
            if(questions[idQ].answerF != '') questions[idQ].answerF = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerF = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerF+"</span>");
        }
        else{
            questions[idQ].correctF = false;
            if(questions[idQ].answerF != '') questions[idQ].answerF = $("[name=newQuestion"+literaTemp+idQ+"]").val();
            else questions[idQ].answerF = '(brak)';
            $('#cQIB'+literaTemp+idQ).css({"display":"none"});
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerF+"</span>");
        }
    }    
}

function anulujEditCloseQuestion(litera,idQ){
    var literaTemp = null;
    if(litera==1){
        literaTemp = 'A';
        if(questions[idQ].correctA){
            $('#raportQ'+literaTemp+idQ).html("<span  class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerA+"</span>");
        }
        else{
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerA+"</span>");
        }
    } 
    else if(litera==2){
        literaTemp = 'B';
        if(questions[idQ].correctB){
            $('#raportQ'+literaTemp+idQ).html("<span  class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerB+"</span>");
        }
        else{
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerB+"</span>");
        }
    } 
    else if(litera==3){
        literaTemp = 'C';
        if(questions[idQ].correctC){
            $('#raportQ'+literaTemp+idQ).html("<span  class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerC+"</span>");
        }
        else{
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerC+"</span>");
        }
    } 
    else {
        literaTemp = 'D';
        if(questions[idQ].correctD){
            $('#raportQ'+literaTemp+idQ).html("<span  class='correctAnswer' onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerD+"</span>");
        }
        else{
            $('#raportQ'+literaTemp+idQ).html("<span onclick='editCloseQuestion("+litera+","+idQ+")' id='raportQ"+literaTemp+idQ+"'>"+questions[idQ].answerD+"</span>");
        }
    } 
    // console.log('#raportQ ' + literaTemp + " " + idQ);
    // $('#raportQ'+literaTemp+idQ).html("ooo");
}

function deleteQuestion(id){
    alert("Kiedys bedzie działać :)");
}

function generujPDF(){
    console.log('generowanie PDF');
    $(".step4").removeClass("stepActive");
    $(".step5").addClass("stepActive");
    $(".formHeader h3").html("Krok 5");
    $(".formHeader h4").html("Generowanie pliku");
    $(".pdfBox").css({"display":"flex"});
    $(".checkOutDoc").css({"display":"none"});
    console.log(questions);

    // GENEROWANIE PDFA
    var pdfOrientacja = null; 
    if(dataOfExam[0].Orientacja == "pionowa") pdfOrientacja = 'p';
    else pdfOrientacja = 'l';
    var doc = new jsPDF({
        orientation: pdfOrientacja
    });
    doc.text(questions[0].questionOpen, 10, 10);
    doc.save('a4.pdf');
};