// Yisrael Bar & May Moshe  04/05/21
let toursArray = [];

let loadPage = async function() 
{
  $("#editTour").hide();
  //get all countries from : http://localhost:3001/getTours
  let res = await getTours() ;

};
$(document).ready( loadPage);

//make an ajax call to get from the server all the tours
 function getTours(){
    let res =$.ajax({
    type: 'GET',
    url: "http://localhost:3001/getTours",
    dataType: 'json',
    success: function (data) {
      // console.log(data);
      toursArray = data;
      displayTours();
    },
    error: function (err) {
      console.log("err", err);
    }
  });
  return res;
}

//display on screen all the tours in a list with buttons that display/edit/delete
function displayTours(){
  $("#displayTours").empty();
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  closeUpdate();
  let allTours = $("<div></div>").attr('class',"allTours");

  for(let i = 0; i< toursArray.length; i++ ){
    let singleTour = $("<div></div>").attr('class',"singleTour");
    let tourName = $("<span></span>").attr('class',toursArray[i][0]).text(toursArray[i][0] + "  ");
    let displayTourBt = $("<button></button>").text("Display Tour").attr('class',toursArray[i][0]).attr('id',i);
    let editTourBt = $("<button></button>").text("Edit").attr('class',toursArray[i][0]);
    let deleteTourBt = $("<button></button>").text("Delete").attr('class',toursArray[i][0]);

    displayTourBt.click(displayTour);
    editTourBt.click(editTour);
    deleteTourBt.click(deleteTour);


    singleTour.append(tourName);
    singleTour.append(displayTourBt);
    singleTour.append(editTourBt);
    singleTour.append(deleteTourBt);
    allTours.append(singleTour);

  }
$("#displayTours").append(allTours);
}

const br =  $("<br>");
//when clicking on a tour - display on screen the tour details
function displayTour(event){
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  closeUpdate();
  let displaySingleTour = $("<div></div>").attr('class',"displaySingleTour");
  let i = event.target.id;
  let tourName = $("<br><div></div><br>").text(toursArray[i][0]);
  let start_date =$("<div></div>").text("Start date: " + toursArray[i][1].start_date);
  let duration =$("<div></div>").text("Duration: " + toursArray[i][1].duration + " Days");
  let price = $("<div></div>").text("Price: " + toursArray[i][1].price);
  let guide = $("<br><button></button>").text("Guide").attr('class',toursArray[i][0]);
  let path = $("<button></button>").text("Path").attr('class',toursArray[i][0]);
  guide.click(displayGuide);
  path.click(displayPath);

  displaySingleTour.append(br);
  displaySingleTour.append(tourName);
  displaySingleTour.append(start_date);
  displaySingleTour.append(duration);
  displaySingleTour.append(price);
  displaySingleTour.append(guide);
  displaySingleTour.append(br);
  displaySingleTour.append(path);

  $("#displayTour").append(displaySingleTour);

}

//in case we have just the class name the function return the index in toursArray
function getId(class_Name){
  let res = -1;
  for(let i =0 ; i < toursArray.length; i++){
    class_Name === toursArray[i][0] ? res= i: null;
  }
  return res;
}
//hide the edit tour fields when not needed
function closeUpdate(){
  $("#editTour").hide();
}
//put in the edit tour fields the tour content
function editTour(event){
  console.log(event.target.className);
  const i =  getId(event.target.className);
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  $("#editTour").show();
  $("#id_field").text(toursArray[i][1].id);
  $("#displayDate").empty();
  $("#displayDate").append($("<div></div>").text("The current date is: "+toursArray[i][1].start_date));
  $("#start_date").val(toursArray[i][1].start_date);
  $("#duration").val(toursArray[i][1].duration);
  $("#price").val(toursArray[i][1].price);
  $("#guide_name").val(toursArray[i][1].guide.name);
  $("#guide_email").val(toursArray[i][1].guide.email);
  $("#guide_cellular").val(toursArray[i][1].guide.cellular);
  $("#site").val(toursArray[i][1].path[0].name);
  $("#country").val(toursArray[i][1].path[0].country);




  // $("#editTour").append(editTour);

}
//make an ajax call to server to delete tour
function deleteTour(event){
  // alert("im here2");
  $.ajax({
    type: 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
    url: '/deleteTour/'+ event.target.className, // the url where we want to POST
    contentType: 'application/json',
  
    processData: false,            
   // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function(){
        // location.href = "/main";
        alert("tour: "+ event.target.className +" has been deleted" );
        let i = getId(event.target.className);
        toursArray.splice(i,1);
        
        displayTours();
    },
    error: function( errorThrown ){
        console.log( errorThrown );
    }
  });

}
//when clicking on the guide button display on screen the guide details - name/email/cellular 
function displayGuide(event){
  let i = getId(event.target.className);
  $("#displayDetailes").empty();
  let displayDetaile = $("<div></div>").attr('class',"displayDetaile");
  let name =  $("<div></div>").attr('class',"displayDetaile").text("Name: " + toursArray[i][1].guide.name);
  let email =  $("<div></div>").attr('class',"displayDetaile").text("Email: " + toursArray[i][1].guide.email);
  let cellular =  $("<div></div>").attr('class',"displayDetaile").text("Cellular: " + toursArray[i][1].guide.cellular);
  displayDetaile.append(name);
  displayDetaile.append(email);
  displayDetaile.append(cellular);
  $("#displayDetailes").append(displayDetaile);  
}
//when clicking on the path button display on screen all the sites - name/country and a delete button next to it 
function displayPath(event){
  let i = getId(event.target.className);
  $("#displayDetailes").empty();
  let displayDetaile = $("<div></div>").attr('class',"displayDetaile");
 for(let j =0 ; j < toursArray[i][1].path.length; j++){
    let displaySinglePath = $("<div></div>").attr('class',"displaySinglePath");
    let name =  $("<span></span>").attr('class',"displayDetaile").text("Name: " + toursArray[i][1].path[j].name + " ");
    let country =  $("<br><span></span>").attr('class',"displayDetaile").text("Country: " + toursArray[i][1].path[j].country);
    let delete_Site = $("<br><button></button>").text("delete Site").attr('class',toursArray[i][0]).attr('id',toursArray[i][1].path[j].name);
    
    delete_Site.click(deleteSite);
    displaySinglePath.append(name);
    displaySinglePath.append(country);
    displaySinglePath.append(delete_Site);
    displayDetaile.append(displaySinglePath);

  }
  $("#displayDetailes").append(displayDetaile);
}
//when clicking on the delete site button it will make an ajax call to server to delete the site and also remove from the toursArray
function deleteSite(event){

  $.ajax({
    type: 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
    url: '/deleteSite/'+ event.target.className+"/"+event.target.id , // the url where we want to POST
    contentType: 'application/json',
    // data: JSON.stringify({
    //     "id": $("#id_field").val(),
    //     "start_date": $("#start_date").val(),
    //     "duration": $("#duration").val(),
    //     "price": $("#price").val(),
    //     "guide": guide,
    //     "path": path,             
    // }),
    processData: false,            
   // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function(){
        // location.href = "/main";
        alert("site: "+ event.target.id +" had been delete" );
        let i = getId(event.target.className);
        for(let j= 0; j < toursArray[i][1].path.length; j++){
          toursArray[i][1].path[j].name === event.target.id ? 
          toursArray[i][1].path.splice(j,1) : null;

        }
        displayTours();
    },
    error: function( errorThrown ){
        console.log( errorThrown );
    }
  });

}

