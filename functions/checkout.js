$(document).ready(function(){

    //skriver ut varukorgen     
    printCart(); 

    //klarna syns som default 
    $("#klarna_radiobutton").change( function(){
        $("#klarna_input").show(); 
        //dölj de andra betalsätten 
        $("#swish_input").hide();
        $("#credit_input").hide();
    }); 
 
    //visa kreditkort
    $("#credit_radiobutton").on("click", function(){
        $("#credit_input").show(); 
        //göm de andra alternativen 
        $("#swish_input").hide();
        $("#klarna_input").hide();
    }); 
 
    //visa swish
    $("#swish_radiobutton").on("click", function(){
        $("#swish_input").show(); 
        //göm de andra alternativen 
        $("#credit_input").hide();
        $("#klarna_input").hide();  
    });


    $("#send_order_btn").click(function() {
        let shoppingcartList = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
        let good = true;
        $(".form-control").each(function() {
            if ($(this).val() == "") {
                good = false;
                //validering, t.ex. focus() för att fokusera på det felaktga elementet 
                //förhindrar att fönstret laddas om
                return false;
            }
        });
        
        if (good && shoppingcartList.length > 0) {
            //låter modalen visas 
            $("#modal").show();
            showReceipt(); 
        }
        
        //förhindrar att fösntret laddas om 
        return false; 

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
            totalCost += cost;

        });

    $("#sumtotal").html("Summa: " +  String(totalCost) + " kr");

}


function showReceipt() {
    //hämta innehåll från local storage 
    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    if (shoppingcartList.length > 0) {
        let value = $("#firstname").val();
        $("#customersname").text("Tack för ditt köp " + value + "!");
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
        
        //töm fält 
        $(".form-control input").val("");
        //tömmer localSTorage när man trycker på OK i modalen
        shoppingcartList = [];
        localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcartList));
    }
}
