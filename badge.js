    //kör funktionen som skriver ut innehållet i listan bredvid varukorgsikonen 
    writecontent(); 

    /* lägg en funktion som skriver ut antalet produkter i local storage 
    (dvs. längden på listan!) bredvid varukorgens ikon */
        function writecontent() {

            //hämta varukorglistan i local storage
            let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
            let shoppingcartList = JSON.parse(localstorageList);

                    //loopa igenom shoppingcartlist och addera varje amount med varandra? 
                    $.each (shoppingcartList, function(i, cartitem) {

                       let lengg=  shoppingcartList.length; 
                        console.log(lengg); 

                    //lägg in så att basket-amount uppdateras med villkor om id för produkten matchar ett som redan finns i varukorgen
                    //dvs. om samma produkt läggs till, lägg inte till en ny rad utan uppdatera bara cartitem.amount!


                        //skriv ut längden på listan + antal produkter  
                        $("#shoppingcart_content").html("+" + lengg * cartitem.amount); 


                    });  //stänger each-loop 

        } //stänger writecontent()