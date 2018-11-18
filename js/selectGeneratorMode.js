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