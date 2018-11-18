var imie = false;

$(".formViewOfDoc").submit(function(){

    var dataOfExam = [];

    // console.log("Rozmiar: ");
    // GET VALUE OF INPUT FROM NAME
    // console.log($("input[name=rozmiarKartki]").val());

    if($("[name=imie]").is(":checked")) imie = true;

    var data = {    
        'Rozmiar kartki' : $("[name=rozmiarKartki]").val(),
        'Orientacja' : $("[name=orientacja]").val(),
        'Marginesy' : $("[name=margines]").val(),
        'Imie' : imie
    }
    dataOfExam.push(data);
    console.log(dataOfExam);

    return false;
})