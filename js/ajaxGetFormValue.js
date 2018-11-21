var imie = false;
var nazwisko = false;
var klasa = false;
var numer = false;
var liczbaPunktow = false;
var dataObecna = false;
var maxPkt = null;

$(".formViewOfDoc").submit(function(){

    var dataOfExam = [];

    // console.log("Rozmiar: ");
    // GET VALUE OF INPUT FROM NAME
    // console.log($("input[name=rozmiarKartki]").val());

    if($("[name=imie]").is(":checked")) imie = true;
    if($("[name=nazwisko]").is(":checked")) nazwisko = true;
    if($("[name=klasa]").is(":checked")) klasa = true;
    if($("[name=numer]").is(":checked")) numer = true;
    if($("[name=data]").is(":checked")) data = true;
    if($("[name=liczbaPunktow]").is(":checked")){
        liczbaPunktow = true;
        maxPkt = $("[name=maxPkt]").val();
    }
    

    var data = {    
        'Rozmiar kartki' : $("[name=rozmiarKartki]").val(),
        'Orientacja' : $("[name=orientacja]").val(),
        'Marginesy' : $("[name=margines]").val(),
        'Imie' : imie,
        'Nazwisko' : nazwisko,
        'Data' : dataObecna,
        'Klasa' : klasa,
        'Numer' : numer,
        'Liczba punktow' : liczbaPunktow,
        'Max punktow' : maxPkt,
        'Ilosc grup' : $("[name=grupy]").val(),
        'Pytania w grupach' : $("[name=typGrupy]:checked").val()
    }
    dataOfExam.push(data);
    console.log(dataOfExam);

    $(".formViewOfDoc").css({"display":"none"});
    $(".formWriteQuestions").css({"display":"flex"});
    $(".formHeader h3").html("Krok 3");
    $(".formHeader h4").html("Treść pytań");
    $(".step2").removeClass("stepActive");
    $(".step3").addClass("stepActive");

    return false;
})