$(document).ready(function(){
    

    $("input#klarnaradiobutton.form-check-input").on("click", function(){
        $("#klarna-input").slideToggle(300);

    }); 

    $("input#creditradiobutton.form-check-input").on("click", function(){
        $("#credit-input").slideToggle(300);

    }); 

    $("input#swishradiobutton.form-check-input").on("click", function(){
        $("#swish-input").slideToggle(300);

    }); 
    
    /* //om inputfältet förändras, enablea skicka beställning-knappen.
    if ( input > 0 ) {
        let shoppingcart = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
        if (shoppingcart === null) {
            shoppingcart = [];
        }
        else {
            alert("Välj ett antal innan du köper!");
        }*/

    // Skickar värdet från first name-inputfältet till modalens Tack för ditt köp-rubrik.
    $(".show-modal").click(function(){
        let value = $("#firstname").val();
        $("#thankyoucustomer").text(value);


        // Avaktiverar möjligheten att klicka utanför modalen för att stänga den.
        $("#exampleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    
});