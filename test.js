$(document).ready(function(){

    //skriver ut varukorgen     
    printCart(); 

    //när man väljer betalsätt, kör denna funktion: 
    $(".form-check-input").change(function(){
        $(".paymentinput").slideToggle(300);
    }); 

    //klarna syns som default 
    $("input#klarnaradiobutton").change( function(){
        $("#klarna-input").show(); 
        //dölj de andra betalsätten 
        $("#swish-input").hide();
        $("#credit-input").hide();
    }); 
 
    //visa kreditkort
    $("input#creditradiobutton").on("click", function(){
        $("#credit-input").show(); 
        //göm de andra alternativen 
        $("#swish-input").hide();
        $("#klarna-input").hide();
    }); 
 
    //visa swish
    $("input#swishradiobutton").on("click", function(){
        $("#swish-input").show(); 
        //göm de andra alternativen 
        $("#credit-input").hide();
        $("#klarna-input").hide();  
    });

});

function printCart() {

    //hämta innehåll från local storage 
    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    let totalCost = 0; 
    
        //kör en loop som skriver ut rätt innehåll på rätt plats i shoppingcarten 
        $.each (shoppingcartList, function(i, cartitem) {

            //skapa en row till produkten 
            let newRow = $("<div>").addClass("row shoppingcart-div align-items-center").appendTo(".purchase-info"); 

            //innuti row, skapa upp en bildtagg med col-3
            $("<img>").addClass("text-left purchaseditem-image col-3 pb-2").attr("src", cartitem.image).appendTo(newRow);

            //innuti row, skapa upp en h-tagg med col-3 för titeln 
            $("<h4>").addClass("shoppingcart-item-titel col-3").text(cartitem.name).appendTo(newRow);

            //innuti row, skapa en p-tagg med col-3, placera ut priset 
            $("<p>").addClass("text-center purchase-item-amount col-2 text-nowrap").text(cartitem.amount + " st").appendTo(newRow);

            //skapa en p-tagg, placera ut antalet 
            $("<p>").addClass("text-center purchase-item-price col-2 text-nowrap").text(cartitem.price + " kr/st").appendTo(newRow);


            //bestämmer totalsumman utifrån varukorgen 
            let cost = cartitem.price * cartitem.amount;
            //hämta sumtotal-taggen från javascript och sätt värdet 
            totalCost += cost;

        });

    $("#sumtotal").html("Summa: " +  String(totalCost) + " kr");

}

function showReceipt() {
    let value = $("#firstname").val();
    $("#customersname").text("Tack för ditt köp " + value + "!"); 

    //hämta innehåll från local storage 
    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    let totalCost = 0; 

        $.each(shoppingcartList, function(i, cartitem) {

            let recieptrow = $("<div>").addClass("row").appendTo(".reciept");

            //diven som vi vill stoppa in allt innehåll i
            let title = cartitem.name; 
            $("<p/>").addClass("col-6").attr("id", "#reciept_title").html(title).appendTo(recieptrow);
        
            $("<span/>").addClass("col-2").text("x").appendTo(recieptrow); 

            let amount = cartitem.amount;
            $("<p/>").addClass("col-3").attr("id", "#reciept_amount").html(amount).appendTo(recieptrow); 

            //bestämmer totalsumman utifrån varukorgen 
            let cost = cartitem.price * cartitem.amount;
            //hämta sumtotal-taggen från javascript och sätt värdet 
            totalCost += cost;
    }); 

    $("#receipt_totalsum").html("Total summa: " +  String(totalCost) + " kr");

    //tömmer localSTorage när man trycker på OK i modalen 

}

//funktion som körs när sidan laddas 
$(function() {
   
    $("#sendorderbtn").click(function() {
        //validate form here
          
          $('.error').hide();
            let name = $("#firstname").val();
            // let lastname = $("#lastname").val();
            // let adress = $("#adress").val();
            // let city = $("#city_zip").val(); 
            // let email = $("#email").val();
            // let tel = $("#tel").val();
            
            
            
            
            if  (name == "") { 
            //&& (lastname == "") 
            //&& (adress == "") 
            //&& (city == "") 
            //&& (email == "") 
            //&& (tel == "") ) 
            
             
                //felmeddelande som ev. ska visas 
                // $("label#name_error").show();
                
                $("#name").focus();
                return false;
            } 
            else {
                //tömmer input-fälten 
                $(".form-control").val() = ""; 

                //visar tack för ditt köp-diven
                $("#modal").show();
                showReceipt(); 

            }

          //prevents reload 
          return false;

    }); 
}); 




    $.each( function(i, value) {

    let text = ""
    var i;  

        //om det finns ett värde, break ur loopen 
        if (i == "") {
            break;
        }

        //kör denna kod om värdena finns 
        //visar tack för ditt köp-diven
        $("#modal").show();
        showReceipt(); 

    }); 