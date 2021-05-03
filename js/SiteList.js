let toursArray = [];

let loadPage = async function() 
{
  //get all countries from : http://localhost:3001/getTours
  let res = await getTours() ;

};
$(document).ready( loadPage);


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


function displayTours(){
  $("#displayTours").empty();
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  let allTours = $("<div></div>").attr('class',"allTours");

  for(let i = 0; i< toursArray.length; i++ ){
    let singleTour = $("<div></div>").attr('class',"singleTour");
    let tourName = $("<span></span>").attr('class',toursArray[i][0]).text(toursArray[i][0]);
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
function displayTour(event){
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  // console.log(event.target.className );

  let displaySingleTour = $("<div></div>").attr('class',"displaySingleTour");
  let i = event.target.id;
  let tourName = $("<div></div>").text(toursArray[i][0]);
  let start_date =$("<div></div>").text(toursArray[i][1].start_date);
  let duration =$("<div></div>").text(toursArray[i][1].duration);
  let price = $("<div></div>").text(toursArray[i][1].price);
  let guide = $("<button></button>").text("guide").attr('class',toursArray[i][0]);
  let path = $("<button></button>").text("path").attr('class',toursArray[i][0]);
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
function getId(class_Name){
  let res = -1;
  for(let i =0 ; i < toursArray.length; i++){
    class_Name === toursArray[i][0] ? res= i: null;
  }
  return res;
}



function editTour(event){
  console.log(event.target.value);
  alert("im here1");
  
}

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
        alert("tour: "+ event.target.className +" had been delete" );
        let i = getId(event.target.className);
        toursArray.splice(i,1);
        
        displayTours();
    },
    error: function( errorThrown ){
        console.log( errorThrown );
    }
  });

}


function displayGuide(event){
  let i = getId(event.target.className);
  $("#displayDetailes").empty();
  let displayDetaile = $("<div></div>").attr('class',"displayDetaile");
  let name =  $("<div></div>").attr('class',"displayDetaile").text(toursArray[i][1].guide.name);
  let email =  $("<div></div>").attr('class',"displayDetaile").text(toursArray[i][1].guide.email);
  let cellular =  $("<div></div>").attr('class',"displayDetaile").text(toursArray[i][1].guide.cellular);
  displayDetaile.append(name);
  displayDetaile.append(email);
  displayDetaile.append(cellular);
  $("#displayDetailes").append(displayDetaile);  
}

function displayPath(event){
  let i = getId(event.target.className);
  $("#displayDetailes").empty();
  let displayDetaile = $("<div></div>").attr('class',"displayDetaile");
 for(let j =0 ; j < toursArray[i][1].path.length; j++){
    let displaySinglePath = $("<div></div>").attr('class',"displaySinglePath");
    let name =  $("<span></span>").attr('class',"displayDetaile").text(toursArray[i][1].path[j].name);
    let country =  $("<span></span>").attr('class',"displayDetaile").text(toursArray[i][1].path[j].country);
    let delete_Site = $("<button></button>").text("delete Site").attr('class',toursArray[i][0]).attr('id',toursArray[i][1].path[j].name);
    
    delete_Site.click(deleteSite);
    displaySinglePath.append(name);
    displaySinglePath.append(country);
    displaySinglePath.append(delete_Site);
    displayDetaile.append(displaySinglePath);

  }


  $("#displayDetailes").append(displayDetaile);
}

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

