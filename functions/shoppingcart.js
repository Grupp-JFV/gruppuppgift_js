$(document).ready(function() {

    getAmount();

    /*let shoppingcart = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
    if (shoppingcart.length > 0) {
        $("#basket_button").on("click", function() {
            $("#basket").slideToggle(300);
            //skriv ut listan printlist
            printShoppingcart(); 
        });
    }*/
  
}); //stänger window ready

function getAmount() {
    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    let totalAmount = 0;

    $.each (shoppingcartList, function(i, cartitem) {
        totalAmount += cartitem.amount;
    });

    updateCartDisplay(totalAmount);
}
    
function deleteBasketItem(buttonClicked) {

    let shoppingcart = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
    let buttonId = buttonClicked[0].id.substring(11);

    shoppingcart.splice(buttonId, 1);

    localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcart));
}

function increaseBasketItem(buttonClicked) {

    let shoppingcart = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
    let buttonId = buttonClicked[0].id.substring(13);

    shoppingcart[buttonId].amount += 1;

    localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcart));
}

function decreaseBasketItem(buttonClicked) {

    let shoppingcart = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
    let buttonId = buttonClicked[0].id.substring(13);

    shoppingcart[buttonId].amount -= 1;

    if (shoppingcart[buttonId].amount === 0) {
        shoppingcart.splice(buttonId, 1);
    }

    localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcart));
}

function printShoppingcart() {

    let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
    let shoppingcartList = JSON.parse(localstorageList);

    //tömmer innehållet i basket_content innan den skapar nytt 
    $("#basket_content").html("");

    let totalCost = 0;
    let totalAmount = 0;

    $.each (shoppingcartList, function(i, cartitem) {

        let basketItem = $("<div>").addClass("row border-top basket-text").appendTo("#basket_content");

        let basketName = $("<div>").addClass("col-7 col-md-2 text-left").appendTo(basketItem);
        
        //"ta-bort"-funktionen för varukorgen (tar bort valt item)
        $("<button>").attr("id", "delete_btn_" + i).addClass("delete-button").text("x").on("click",function() {
            deleteBasketItem($(this));
            printShoppingcart();
        }).appendTo(basketName);

        $("<span>").addClass("text-left").text(cartitem.name).appendTo(basketName);

        let basketStrength = $("<div>").addClass("col-0 col-md-2 d-none d-md-inline text-center").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.strength + " %").appendTo(basketStrength);

        let basketType = $("<div>").addClass("col-0 col-md-2 d-none d-md-inline text-center").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.type).appendTo(basketType);

        let basketPrice = $("<div>").addClass("col-0 col-md-2 d-none d-md-inline text-center").appendTo(basketItem);
        $("<span>").addClass("basket-text").text(cartitem.price + " kr").appendTo(basketPrice);

        let basketAmount = $("<div>").addClass("col-2 col-md-2 p-0 text-center").appendTo(basketItem);
        $("<button>").attr("id", "decrease_btn_" + i).addClass("amount-button").text("-").on("click",function() {
            decreaseBasketItem($(this));
            printShoppingcart();
        }).appendTo(basketAmount);

        $("<span>").addClass("basket-text").text(cartitem.amount).appendTo(basketAmount);

        $("<button>").attr("id", "increase_btn_" + i).addClass("amount-button").text("+").on("click",function() {
            increaseBasketItem($(this));
            printShoppingcart();
        }).appendTo(basketAmount);

        let basketTotal = $("<div>").addClass("col-3 col-md-2 text-right").appendTo(basketItem);
        let cost = cartitem.price * cartitem.amount;
        $("<span>").addClass("basket-text").text(cost + " kr").appendTo(basketTotal);

        totalCost += cost;
        totalAmount += cartitem.amount;
    });

    $("#total_cost").html(String(totalCost) + "kr");
    let shippingCost = 99;
    $("#shipping_cost").html(String(shippingCost) + "kr)");
    let totalPayment = totalCost + shippingCost;
    $("#total_payment").html(String(totalPayment) + "kr");

    updateCartDisplay(totalAmount);
}

function updateCartDisplay(totalAmount) {
    $("#basket_button").off( "click");

    $("#basket_button").on("click", function() {
        $("#basket").slideToggle(300);
        //skriv ut listan printlist
        printShoppingcart(); 
    });

    if (totalAmount < 1) {
        $("#basket_button").off( "click");
        $("#basket").hide(300);
    }

    $("#display_basket").html(String(totalAmount));
}
