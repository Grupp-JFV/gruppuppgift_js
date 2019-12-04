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
    
    let product1 = new Product("Öl1", "./product_images/winterale.jpg", "Ljus lager", "Bla bla...", "10", "0");
    let product2 = new Product("Öl2", "./product_images/winterale.jpg", "Mörk lager", "Blä blä...", "15", "0");
    let product3 = new Product("Öl3", "./product_images/winterale.jpg", "Ipa", "Prat...", "20", "0");

    let products = [product1, product2, product3];

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
        $("<p>").addClass("card-text").text(product.price +" "+"Kr").appendTo(cardBody);

        //  (!!! input + knapp här !!!)

        $("<div>").addClass("product_description").text(product.description).appendTo(productContainer);

        $("#page").append(responsiveColumn);
    });
}

function toLocalStorage(products) {

    localStorage.setItem("CurrentProductList", JSON.stringify(products));

}
              


