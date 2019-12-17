$(document).ready(function() {

     //lyssnar efter varukorgen och hämtar info från local storage 
    $("#basketButton").on("click", function() {
        $("#basket").slideToggle(300);
        //skriv ut listan printlist
        printShoppingcart(); 


        //OKEJ DENNA FUNKAR TYP MEN FATTAR INTE VARFÖR? 
        //FRÅGA OM HJÄLP, DEN REAGERAR INTE PÅ FÖRSTA KLICKET 

        //funktion för delete-knappen för varje rad i listan
        $(".delete-button").on("click", function() {
      
        removeFromCart($(this));
        printShoppingcart();
        
        }); 
    
    });



    
}); //stänger window ready 



        
function printShoppingcart() {

    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    //tömmer innehållet i basket_content innan den skapar nytt 
    $("#basket_content").html("");

    $.each (shoppingcartList, function(i, cartitem) {

        let basketItem = $("<div>").addClass("row border-top pt-2 basket-text").appendTo("#basket_content");

        let basketName = $("<div>").addClass("col-7 col-md-2 text-left").appendTo(basketItem);
        $("<button>").addClass("delete-button").text("x").appendTo(basketName);
        $("<span>").addClass("text-left").text(cartitem.name).appendTo(basketName);

        let basketStrength = $("<div>").addClass("col-0 col-md-2 d-none d-md-inline text-center").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.strength + " %").appendTo(basketStrength);

        let basketType = $("<div>").addClass("col-0 col-md-2 d-none d-md-inline text-center").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.type).appendTo(basketType);

        let basketPrice = $("<div>").addClass("col-0 col-md-2 d-none d-md-inline text-center").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.price + " kr").appendTo(basketPrice);

        //lägg in så att basket-amount uppdateras med villkor om id för produkten matchar ett som redan finns i varukorgen
        //dvs. om samma produkt läggs till, lägg inte till en ny rad utan uppdatera bara cartitem.amount!

        let basketAmount = $("<div>").addClass("col-2 col-md-2 p-0 text-center").appendTo(basketItem);
        $("<button>").addClass("amount-button").text("-").appendTo(basketAmount);
        $("<span>").addClass("basket-text").text(cartitem.amount).appendTo(basketAmount);
        $("<button>").addClass("amount-button").text("+").appendTo(basketAmount);


        let basketTotal = $("<div>").addClass("col-3 col-md-2 text-right").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.price * cartitem.amount + " kr").appendTo(basketTotal);

    }); 
} 

function removeFromCart(deleteItem) {

    console.log(deleteItem); 
     
    //hämta listan från local storage 
    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    //loopa igenom listan för att hitta objektet 

    $.each(shoppingcartList, function(i, deleteMe) {
        console.log(shoppingcartList); 
        console.log(deleteMe); 
        
        shoppingcartList.splice(i, 1);
          
        localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcartList));
        console.log(shoppingcartList); 

    }); 

}   
