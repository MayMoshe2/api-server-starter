$(document).ready(function () {
   
    // $("form[name='tour_form']").validate({
    //     // Specify validation rules
    //     rules: {
    //       // "name":{
    //       //   minlength: 5
    //       // },
    //       "id_field": {
    //         required: true,
    //         digits: false,
    //         minlength: 6
    //       },
          
    //     },
    //     // Specify validation error messages
    //     messages: {       
    //       // name: "Your name must be at least 5 characters long",
    //       id_field:{
    //         digits:"Please enter only digits",
    //         minlength: "Your name must be at least 6 characters long"
    //       },
          
    //     }
    //   });

    // process the form
    $('#tour_form').submit(function (event) {
        // if(!$("#tour_form").valid()) return;

        console.log("in submit");
        let guide ={
          "name": $("#guide_name").val(),
          "email": $("#guide_email").val(),
          "cellular": $("#guide_cellular").val(),
        }
        let singlePath = {
          "name": $("#site").val(),
          "country": $("#country").val(),
        }
        let path = [];
        path.push(singlePath);

        // process the form
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: '/updateTour/'+ $("#id_field").text(), // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "id": $("#id_field").text(),
                "start_date": $("#start_date").val(),
                "duration": $("#duration").val(),
                "price": $("#price").val(),
                "guide": guide,
                "path": path,             
            }),
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data ){
                console.log(data);
                location.href = "/SiteList";

            },
            error: function( errorThrown ){
                console.log( errorThrown );
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
