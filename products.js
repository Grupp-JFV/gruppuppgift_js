$(document).ready(function() {
//togglar filterfunktionen mellan hide/show 
    $(".sorthead").on("click", function() {
        $(".categories").toggle();
    }); 
     
//togglar beskrivningen 
    $(".btn").on("click", function() {
        $(".product_description").toggle();
    }); 

          
}); //stänger jquery 