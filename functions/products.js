$(document).ready(function() {
    //skapar alla html-element 
    productList();
    
    //lyssnar efter läggtill i varukorg 
    $(".purchase-button").on("click",function() {
        addToCart($(this));
        printShoppingcart();
    });

    //togglar filterfunktionen mellan hide/show 
    $("#sortheadline").on("click", function() {
        $("#sort_categories_container").slideToggle(300);
    }); 
  
    //togglar läs mer-knappen
    $(".readmore_button").on("click",function() {
        $(this).siblings(".product_description").slideToggle(300);
    }); 
}); 
    
//skapar en lista med existerande produkter 
function productList() {
    
    let product1 = new Product("Oppigårds Golden Ale", "../product_images/golden.jpg", "Ale", 4.8,
    "Fruktig, något humlearomatisk smak med tydlig beska, inslag av aprikos, örter, apelsinskal och rågbröd. Serveras vid 8-10°C till husmanskost.", 
    19, "0");
    let product2 = new Product("Oppigårds Winter Ale", "../product_images/winterale.jpg", "Ale", 5.0, 
    "Nyanserad, något humlearomatisk smak med tydlig beska, inslag av rågbröd, kryddor, tallkåda och apelsinskal. Serveras vid 8-10°C som sällskapsdryck, eller till rätter av lamm- och nötkött.", 
    27, "1");
    let product3 = new Product("Oppigårds Every Day Ipa", "../product_images/everydayipa.jpg", "Ipa", 4.8, 
    "Humlearomatisk smak med tydlig beska, inslag av tallbarr, tropisk frukt, grapefrukt och honung. Serveras vid 11-14°C som sällskapsdryck eller till smakrik husmanskost.", 
    19, "2");
    let product4 = new Product("Oppigårds Hedemora Porter", "../product_images/hedemoraporter.jpg", "Porter", 5.4, 
    "Maltig, rostad, nyanserad smak med inslag av kavring, choklad, hasselnötter, kaffe, smörkola och torkade dadlar. Serveras vid 10-12°C till rätter av mörkt kött.", 
    19, "3");
    let product5 = new Product("Oppigårds Single Hop", "../product_images/singlehop.jpg", "Ale", 5.0, 
    "Tydligt humlearomatisk smak med inslag av apelsinblom, aprikos, honung, citrusskal och knäckebröd. Serveras vid 11-13°C som sällskapsdryck, eller till rätter av fisk eller ljust kött.", 
    18, "4");
    let product6 = new Product("Oppigårds Thurbo Double", "../product_images/thurbodouble.jpg", "Ipa", 5.4,
    "Maltig, aningen rostad smak med inslag av kavring, kaffe, mörk choklad, torkade fikon, apelsin, sirap och lakrits. Serveras vid 10-12°C till rätter av lamm- eller nötkött, eller till smakrika rätter med svamp.", 
    29, "5");

    let products = [product1, product2, product3, product4, product5, product6];

    display(products);
    toLocalStorage(products);

}

//skapar en objektsklass för produkterna
function Product(name, image, type, strength, description, price, id) {                         //Product Constructor

    this.name = name;
    this.image = image;
    this.type = type;
    this.strength = strength;
    this.description = description;
    this.price = price;
    this.id = id;
}

function filterDisplay(checkmark) {
    let products = JSON.parse(localStorage.getItem("CurrentProductList"));
    if (checkmark.id = "ipa-checkmark") {
        products = jQuery.grep(products, function( a ) {
            return a.type === "Ipa";
          });
    }
}

//funktion som loopar igenom produkterna och skriver ut dem i products.html
function display(products) {

    $.each(products, function (i, product) {
         
        let responsiveColumn = $("<div>").addClass("col-12"+" "+"col-md-6"+" "+"col-lg-4");
        let productContainer = $("<div>").addClass("card"+" "+"container"+" "+" "+"text-center").appendTo(responsiveColumn);
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
        $("<button>").addClass("btn purchase-button").attr("type", "button").attr("id", "button_" + i).append("Köp").appendTo(input);

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

        let shoppingcart = JSON.parse(localStorage.getItem("CurrentShoppingcartList"));
        if (shoppingcart === null) {
            shoppingcart = [];
        }

        //hämtar produktlistan från localstorage och sparar listan i variabeln products 
        let products = JSON.parse(localStorage.getItem("CurrentProductList"));
    
        $.each(products, function(i, product) {
            let buttonId = buttonClicked[0].id.substring(7);

            if (product.id == buttonId) {
                //hämtar värder från input-fältet till en variabel
                let input = buttonClicked.prev().val();

                let newObject =  {
                    name: product.name,
                    image: product.image, 
                    strength: product.strength,
                    type: product.type,
                    price: product.price,  
                    amount: Number(input),
                    id: product.id
                }
                
                //kollar om den redan finns i "shopping cart"
                let duplicate = false;
                let cartIndex = 0;

                $.each(shoppingcart, function(j, cartObject) {
                    if (product.id === cartObject.id) {
                        duplicate = true;
                        cartIndex = j;
                        return false; //jquery break om den hittat det den söker
                    }
                });
                if (duplicate) {
                    // lägger till amount till en produkt som redan finns i "shoppingcart"
                    shoppingcart[cartIndex].amount += newObject.amount;
                }
                else {
                    //pushar in listobjekt till den nya listan 
                    shoppingcart.push(newObject);
                }
                //tömmer inputfältet 
                $(".input-group input").val("");
            }  
        }); 
        //sparar produkterna som finns i listan i localstorage 
        localStorage.setItem("CurrentShoppingcartList", JSON.stringify(shoppingcart));
    } 
    else {
        alert("Välj ett antal innan du köper!");
    }
}