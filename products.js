$(document).ready(function() {
//togglar filterfunktionen mellan hide/show 
    $(".sorthead").on("click", function() {
        $(".categories").toggle();
    }); 

    $(".btn").click(function() {
        $(this).siblings().toggle();
    });

}); //stänger jquery 