$(document).ready(function() {
    //skapar alla html-element 
    productList();

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
            buy($(this)); 

        }); 

        
        //lyssnar efter varukorgen och hämtar info från local storage 
        $(".fa fa-shopping-cart").on("click", function() {
            fromLocalStorage(); 
        }); 
        
    
}); //stänger window ready 
        
    //skapar en lista med existerande produkter 
    function productList() {
        
        let product1 = new Product("Oppigårds Golden Ale", "./product_images/golden.jpg", "Ljus lager", 4.8,
        "Fruktig, något humlearomatisk smak med tydlig beska, inslag av aprikos, örter, apelsinskal och rågbröd. Serveras vid 8-10°C till husmanskost.", 
        19, 0);
        let product2 = new Product("Oppigårds Winter Ale", "./product_images/winterale.jpg", "Mörk lager", 5.0, 
        "Nyanserad, något humlearomatisk smak med tydlig beska, inslag av rågbröd, kryddor, tallkåda och apelsinskal. Serveras vid 8-10°C som sällskapsdryck, eller till rätter av lamm- och nötkött.", 
        27, 0);
        let product3 = new Product("Oppigårds Every Day Ipa", "./product_images/everydayipa.jpg", "Ipa", 4.8, 
        "Humlearomatisk smak med tydlig beska, inslag av tallbarr, tropisk frukt, grapefrukt och honung. Serveras vid 11-14°C som sällskapsdryck eller till smakrik husmanskost.", 
        19, 0);
        let product4 = new Product("Oppigårds Hedemora Porter", "./product_images/hedemoraporter.jpg", "Porter", 5.4, 
        "Maltig, rostad, nyanserad smak med inslag av kavring, choklad, hasselnötter, kaffe, smörkola och torkade dadlar. Serveras vid 10-12°C till rätter av mörkt kött.", 
        19, 0);
        let product5 = new Product("Oppigårds Single Hop", "./product_images/singlehop.jpg", "?", 5.0, 
        "Tydligt humlearomatisk smak med inslag av apelsinblom, aprikos, honung, citrusskal och knäckebröd. Serveras vid 11-13°C som sällskapsdryck, eller till rätter av fisk eller ljust kött.", 
        18, 0);
        let product6 = new Product("Oppigårds Thurbo Double", "./product_images/thurbodouble.jpg", "?", 5.4,
        "Maltig, aningen rostad smak med inslag av kavring, kaffe, mörk choklad, torkade fikon, apelsin, sirap och lakrits. Serveras vid 10-12°C till rätter av lamm- eller nötkött, eller till smakrika rätter med svamp.", 
        29, 0);
    
        let products = [product1, product2, product3, product4, product5, product6];
    
        display(products);
        toLocalStorage(products);  //(!!! funkar men fyller ingen funktion just nu !!!)

    }
    
    //skapar en objektklass för produkterna 
    function Product(name, image, type, strength, description, price, selected, id) {                         //Product Constructor
    
        this.name = name;
        this.image = image;
        this.type = type;
        this.strength = strength;
        this.description = description;
        this.price = price;
        this.selected = selected;
        this.id = id; 
    }
    
    //funktion som loopar igenom produkterna och skriver ut dem i products.html 
    function display(products) {
        
        $.each(products, function (i, product) {  // i???*
         
            product.id = i; 
            console.log(product.id);
             
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
    function buy(buttonClicked) {

        //skapa en tom lista 
        shoppingcart = [];  

        //hämtar produktlistan från localstorage och sparar i variabeln products 
        let localstorageList = localStorage.getItem("CurrentProductList"); 
        let products = JSON.parse(localstorageList); 

    
        
            $.each(products, function(i, product) {

                let buttonId = buttonClicked[0].id;
                //här inne vill vi hämta värdena från objekten som vi behöver 
                console.log(buttonId); 
        
                //skapa ett villkor för knappen som är tryckt och om id är detsamma som indexpositionen 
                if (product.id = buttonId) {

                    let newObject =  {
                        name: product.name, 
                        price: product.price,  
                        selected: product.selected 
                    }

                //pushar in listobjekt till den nya listan 
                shoppingcart.push(newObject); 
                console.log(shoppingcart);


            } 

       }); 


    } 



       /*
        //hämtar värder från input-fältet till en variabel, detta ska vara värdet på selected 
        let input = buttonClicked.prev().val();
        console.log(input); 












        //skapa en tom lista 
        shoppingcart = [];  

        //pushar in listobjekt till den nya listan 
        shoppingcart.push( den valda produkten  ); 
        console.log(shoppingcart); 
 
    }  

     









/*
    //skapar en objektklass för produkterna 
    function ShopProduct(name, price, selected) {     //Product Constructor
        this.name = name;
        this.price = price;
        this.selected = selected;
    }

    function show(shoppingcart) {
        //appendar saker till vår shoppingcart? 
        $.each(shoppingcart, function (i, product) {  

            product.name 
            product.price
            product.selected 

        }

    }

*/ 

    //hämta valt objekt från den tidigare listan? kanske använda $this? 
    //använda map() eller filter() i jquery? 


    /*
    
    

    1. Hämta det valda objektet (det som man har klickat "köp" på)
        - Hämta titel och pris från objektets egenskaper 
    2. Hämta antalet man vill ha (input-fältets value) 

    3. 

    4. 

    5. 

    6. 

    7. 

    8. Pushar in i tomma listan 
    
    ----
    här skriver vi sedan ut sakerna i html 
    
    

    
    */ 
