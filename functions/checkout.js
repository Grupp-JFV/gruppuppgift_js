$(document).ready(function(){

    //när man väljer betalsätt, kör denna funktion: 
    $(".form-check-input").change(function(){
        $(".paymentinput").slideToggle(300);
    }); 


    });

    //visar tack för ditt köp-diven
    $(document).ready(function(){
        $("#sendorderbtn").click(function(){
          $("#demo").show();
        });
      });


    // Skickar värdet från first name-inputfältet till modalens Tack för ditt köp-rubrik.
    $("#sendorderbtn").click(function(){
        let value = $("#firstname").val();
        $("#customersname").text(value);
        
    });

    
    printCart(); 

});



function printCart() {

    //hämta innehåll från local storage 
    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    subtotal = 0; 
    $("#sumtotal").text("Totalt: " + subtotal + " kr"); 

    
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

        
        
                //skriver in det senaste totalavärdet ???? va 

                    //längden på listan x antalet av varje produkt varukorgen 
                    let itemTotal = cartitem.amount = shoppingcartList.length; 
                    console.log(itemTotal);

                    let amountTotal = cartitem.price * shoppingcartList.length


                let subtotal = amountTotal * itemTotal; 
                $("#sumtotal").text("Totalt: " + subtotal + " kr");
    





        });

            

       

        

}