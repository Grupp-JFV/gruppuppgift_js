$(document).ready(function() {
    
    //skapar alla html-element 
    productList();
    //skapa en tom lista för varukorgen (alltid tillgänglig onload)
    shoppingcart = []; 

    //lyssnar efter varukorgen och hämtar info från local storage 
    $("#basketButton").on("click", function() {
        $("#basket").slideToggle(300);
                        //skriv ut listan printlist 
                        printShoppingcart();

    }); 

    //togglar filterfunktionen mellan hide/show 
    $("#sortheadline").on("click", function() {
        $(".sortcategories").slideToggle(300);
    }); 

    
    //togglar läs mer-knappen
    $(".readmore_button").on("click",function() {
        $(this).siblings(".product_description").slideToggle(300); 
    });
    
    //lyssnar efter köpknappen 
    $(".btn").on("click",function() {
        addToCart($(this)); 
    }); 
        
}); //stänger window ready 
        
    //skapar en lista med existerande produkter 
    function productList() {
        
        let product1 = new Product("Oppigårds Golden Ale", "./product_images/golden.jpg", "Ljus lager", 4.8,
        "Fruktig, något humlearomatisk smak med tydlig beska, inslag av aprikos, örter, apelsinskal och rågbröd. Serveras vid 8-10°C till husmanskost.", 
        19, "0");
        let product2 = new Product("Oppigårds Winter Ale", "./product_images/winterale.jpg", "Mörk lager", 5.0, 
        "Nyanserad, något humlearomatisk smak med tydlig beska, inslag av rågbröd, kryddor, tallkåda och apelsinskal. Serveras vid 8-10°C som sällskapsdryck, eller till rätter av lamm- och nötkött.", 
        27, "1");
        let product3 = new Product("Oppigårds Every Day Ipa", "./product_images/everydayipa.jpg", "Ipa", 4.8, 
        "Humlearomatisk smak med tydlig beska, inslag av tallbarr, tropisk frukt, grapefrukt och honung. Serveras vid 11-14°C som sällskapsdryck eller till smakrik husmanskost.", 
        19, "2");
        let product4 = new Product("Oppigårds Hedemora Porter", "./product_images/hedemoraporter.jpg", "Porter", 5.4, 
        "Maltig, rostad, nyanserad smak med inslag av kavring, choklad, hasselnötter, kaffe, smörkola och torkade dadlar. Serveras vid 10-12°C till rätter av mörkt kött.", 
        19, "3");
        let product5 = new Product("Oppigårds Single Hop", "./product_images/singlehop.jpg", "?", 5.0, 
        "Tydligt humlearomatisk smak med inslag av apelsinblom, aprikos, honung, citrusskal och knäckebröd. Serveras vid 11-13°C som sällskapsdryck, eller till rätter av fisk eller ljust kött.", 
        18, "4");
        let product6 = new Product("Oppigårds Thurbo Double", "./product_images/thurbodouble.jpg", "?", 5.4,
        "Maltig, aningen rostad smak med inslag av kavring, kaffe, mörk choklad, torkade fikon, apelsin, sirap och lakrits. Serveras vid 10-12°C till rätter av lamm- eller nötkött, eller till smakrika rätter med svamp.", 
        29, "5");
    
        let products = [product1, product2, product3, product4, product5, product6];
    
        display(products);
        toLocalStorage(products);  

    }
    
    //skapar en objektklass för produkterna 
    function Product(name, image, type, strength, description, price, id) {                     
    
        this.name = name;
        this.image = image;
        this.type = type;
        this.strength = strength;
        this.description = description;
        this.price = price;
        this.id = id; 
    }
    
    //funktion som loopar igenom produkterna och skriver ut dem i products.html 
    function display(products) {
        
        $.each(products, function (i, product) {
    
            let responsiveColumn = $("<div>").addClass("col-12"+" "+"col-md-6"+" "+"col-lg-4");
            let productContainer = $("<div>").addClass("card"+" "+"container"+" "+"mb-4"+" "+"text-center").appendTo(responsiveColumn);
            $("<img>").addClass("card-img-top").attr("src", product.image).attr("alt", "Ölflaska").appendTo(productContainer);
            let cardBody = $("<div>").addClass("card-body"+" "+"row"+" "+"justify-content-center").appendTo(productContainer);
            $("<h5>").addClass("card-title").text(product.name + " " + "(" + product.strength + "%" + ")").appendTo(cardBody);
            $("<p>").addClass("card-text").text(product.price+" "+"kr").appendTo(cardBody);
    
            //skapa en läs-mer-knapp         
            $("<button>").addClass("readmore_button").attr("type", "button").append("Läs mer").appendTo(cardBody);
            
            //skapa en div för beskrivningen
            let descriptionDiv = $("<div>").addClass("product_description").appendTo(cardBody);        
            $(descriptionDiv).text(product.description).appendTo(descriptionDiv);
    
            //skapa en input-group + lägger in input-group i card-body  
            let input = $("<div>").addClass("input-group").appendTo(cardBody);
            $("<input>").attr("type", "number").appendTo(input).attr("placeholder", "Välj antal"); 
    
            //skapa en köp-knapp         
            $("<button>").addClass("btn").attr("type", "button").attr("id", i).append("Köp").appendTo(input);

            $("#page").append(responsiveColumn);
        });

    } 

    //sparar produkterna som finns i listan i localstorage 
    function toLocalStorage(products) {
        localStorage.setItem("CurrentProductList", JSON.stringify(products));

    }

 
    //funktionen som är kopplad till köpknappen 
    function addToCart(buttonClicked) {

        //hämta input-fältets värde och använd som villkor
        let input = buttonClicked.prev().val();

        //sätt ett villkor så att när input är tomt så görs inget
        if ( input > 0 ) {

        //hämtar produktlistan från localstorage och sparar listan i variabeln products 
        let localstorageList = localStorage.getItem("CurrentProductList"); 
        let products = JSON.parse(localstorageList); 
        
            $.each(products, function(i, product) {
                
                let buttonId = buttonClicked[0].id;
                if (product.id == buttonId) {
                    //hämtar värder från input-fältet till en variabel
                    let input = buttonClicked.prev().val();

                    let newObject =  {
                        name: product.name,
                        strength: product.strength,
                        type: product.type,
                        price: product.price,  
                        amount: input,
                        id: product.id
                    }

                    //pushar in listobjekt till den nya listan 
                    shoppingcart.push(newObject);
    
                    //tömmer inputfältet 
                    $(".input-group input").val("");

                    //sparar produkterna som finns i listan i localstorage 
                    localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcart));
                }  

            }); //stänger each-loop 
       
        } else {

            //FUNKAR INTE EFTERSOM INGET LÄGGS TILL I SHOPPINGCART
          //  alert("Välj ett antal innan du köper!");

        }
    } //stänger buy
 
        

    function printShoppingcart() {

        let localstorageList = localStorage.getItem("CurrentShoppingcartList"); 
        let shoppingcartList = JSON.parse(localstorageList);

        //tömmer varukorgens html 
        $("#basket_content").html("");

        $.each (shoppingcartList, function(i, cartitem) {

            //skriver ut listan i html 
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
    
            let basketAmount = $("<div>").addClass("col-2 col-md-2 p-0 text-center").appendTo(basketItem);
            $("<button>").addClass("amount-button").text("-").appendTo(basketAmount);
            $("<span>").addClass("basket-text").text(cartitem.amount).appendTo(basketAmount);
            $("<button>").addClass("amount-button").text("+").appendTo(basketAmount);
    
            let basketTotal = $("<div>").addClass("col-3 col-md-2 text-right").appendTo(basketItem);
            $("<span>").addClass("basket-text").text(cartitem.price * cartitem.amount + " kr").appendTo(basketTotal);


        }); 
    } 
 
    //sparar produkterna som finns i listan i localstorage 
    localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcart));

    //delete-funktion ej klar 
    function showDeleteOption() {
        alert("funkar");
    }
