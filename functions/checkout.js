$(document).ready(function(){



        $(".sendorderbtn").click(function() {
            let value = $("#firstname").val();
            $("#thankyoucustomer").text(value);
        }); 
    
        $(".show-modal").click(function(){
            let value = $("#firstname").val();
            $("#thankyoucustomer").text(value);

            $("#exampleModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        });
    
});