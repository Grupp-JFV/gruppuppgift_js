$(document).ready(function() {
//togglar filterfunktionen mellan hide/show 
    $(".sorthead").on("click", function() {
        $(".categories").toggle();
    }); 

    productList();
    
    //togglar läs mer knappen
    $(".btn").on("click",function() {
        $(".product_description").toggle(); 

    }); 

});
    

function productList() {
    
    let product1 = new Product("Oppigårds Golden Ale", "./product_images/golden.jpg", "Ljus lager", 
    "Fruktig, något humlearomatisk smak med tydlig beska, inslag av aprikos, örter, apelsinskal och rågbröd. Serveras vid 8-10°C till husmanskost.", 
    "19", "0");
    let product2 = new Product("Oppigårds Winter Ale", "./product_images/winterale.jpg", "Mörk lager", 
    "Nyanserad, något humlearomatisk smak med tydlig beska, inslag av rågbröd, kryddor, tallkåda och apelsinskal. Serveras vid 8-10°C som sällskapsdryck, eller till rätter av lamm- och nötkött.", 
    "27", "0");
    let product3 = new Product("Oppigårds Every Day Ipa", "./product_images/everydayipa.jpg", "Ipa", 
    "Humlearomatisk smak med tydlig beska, inslag av tallbarr, tropisk frukt, grapefrukt och honung. Serveras vid 11-14°C som sällskapsdryck eller till smakrik husmanskost.", 
    "19", "0");
    let product4 = new Product("Oppigårds Hedemora Porter", "./product_images/hedemoraporter.jpg", "Porter", 
    "Maltig, rostad, nyanserad smak med inslag av kavring, choklad, hasselnötter, kaffe, smörkola och torkade dadlar. Serveras vid 10-12°C till rätter av mörkt kött.", 
    "19", "0");
    let product5 = new Product("Oppigårds Single Hop", "./product_images/singlehop.jpg", "?", 
    "Tydligt humlearomatisk smak med inslag av apelsinblom, aprikos, honung, citrusskal och knäckebröd. Serveras vid 11-13°C som sällskapsdryck, eller till rätter av fisk eller ljust kött.", 
    "18", "0");
    let product6 = new Product("Oppigårds Thurbo Double", "./product_images/thurbodouble.jpg", "?", 
    "Maltig, aningen rostad smak med inslag av kavring, kaffe, mörk choklad, torkade fikon, apelsin, sirap och lakrits. Serveras vid 10-12°C till rätter av lamm- eller nötkött, eller till smakrika rätter med svamp.", 
    "29", "0");

    let products = [product1, product2, product3, product4, product5, product6];

    display(products);
    // toLocalStorage(products);  //(!!! funkar men fyller ingen funktion just nu !!!)
}

function Product(name, image, type, description, price, selected) {                         //Product Constructor

    this.name = name;
    this.image = image;
    this.type = type;
    this.description = description;
    this.price = Number(price);
    this.selected = Number(selected);
}

function display(products) {

    console.log(products);

    $.each(products, function (i, product) {  // i???
        let responsiveColumn = $("<div>").addClass("col-12"+" "+"col-lg-4");
        let productContainer = $("<div>").addClass("card"+" "+"container"+" "+"mb-4").appendTo(responsiveColumn);
        $("<img>").addClass("card-img-top").attr("src", product.image).attr("alt", "Ölflaska").appendTo(productContainer);
        let cardBody = $("<div>").addClass("card-body"+" "+"row"+" "+ "justify-content-center").appendTo(productContainer);
        $("<h5>").addClass("card-title").text(product.name).appendTo(cardBody);
        $("<p>").addClass("card-text").text(product.price+" "+"Kr").appendTo(cardBody);

        //  (!!! input + knapp här !!!)

        $("<div>").addClass("product_description").text(product.description).appendTo(productContainer);

        $("#page").append(responsiveColumn);
    });
}

function toLocalStorage(products) {

    localStorage.setItem("CurrentProductList", JSON.stringify(products));

}
              


