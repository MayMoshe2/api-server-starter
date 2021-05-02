let toursArray = [];

let loadPage =  function() 
{
  alert("im here");
  //get all countries from : http://localhost:3001/getTours
  getTours() ;

};

$(document).ready(loadPage);


function getTours(){
  // $.ajax({
  //   type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
  //   url: 'localhost:3001/createTour/'+"id", // the url where we want to POST
  //   contentType: 'application/json',
  //   data: JSON.stringify({
  //       "name":"df",
  //       "password": "jdj",
  //       "profession": "sss",
  //       "id": "dddss"
  //   })});
  $.ajax({
    type: 'GET',
    url: "http://localhost:3001/getTours",
    dataType: 'json',
    success: function (data) {
      console.log(data);
      toursArray = data;
      $("#displayTours").html(JSON.stringify(data));
    },
    error: function (err) {
      console.log("err", err);
    }
  });
    // $.ajax( 
    // {
    //   url: "http://localhost:3001/getTours",
    //   // dataType: 'json', // type of response data
    //   // async: false,
    //   success: function (data) {   // success callback function
    //     console.log(data);
    //     toursArray = data;
    //     $("#displayTours").append(data);
    //     return data;
    //   },
    //   error: function (jqXhr, textStatus, errorMessage) { // error callback 
    //     alert('Error: ' + errorMessage);
    //     // $('p').append('Error: ' + errorMessage);
    //   }
    // });
    return "failed";
}








/*
function getTourData(event){
    // console.log(event.target.id);
    let data0;
    $.ajax( 
      {
        url: event.target.id,
        dataType: 'json', // type of response data
        async: false,
        success: function (data) {   // success callback function
          data0 = data;
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
          alert('Error: ' + errorMessage);
        }
      });

      
    // console.log(data0);
  let br = $("<br>");
  let table = $("<table></table>");
  let tr = $("<tr></tr>");
  let firstTd = $("<td></td>").text(data0.names.name);
  tr.append(firstTd);
    //languages
  let languages =  $("<div></div>").attr('class',"box");
  let title = $("<div></div>").text("Languages").attr('class',"title");
  languages.append(title);
  let ul = $("<ul></ul>");
  for (let index = 0; index < data0.language.length; index++) {
    ul.append($("<li></li>").text(data0.language[index].language));
  }
  languages.append(ul);
  //currency
  let currency =  $("<div></div>").attr('class',"box");
  title = $("<div></div>").text("Currency").attr('class',"title");
  currency.append(title);
  currency.append( $("<div></div>").text(data0.currency.name));
  currency.append( $("<div></div>").text(data0.currency.symbol));
  currency.append( $("<div></div>").text(data0.currency.rate));
  currency.append(br);
  //get current month
  let month = "";
  month = getCurrentMonth();
  let weather =  $("<div></div>").attr('class',"box");
  title = $("<div></div>").text("Weather").attr('class',"title");
  weather.append(title);
  weather.append($("<div></div>").text(data0.weather[month].tAvg));

  //neighbors
  let neighbors =  $("<div></div>").attr('class',"box");
  title = $("<div></div>").text("Neighbors").attr('class',"title");
  neighbors.append(title);
  ul = $("<ul></ul>");
  for (let index = 0; index < data0.neighbors.length; index++) {
    ul.append($("<li></li>").text(data0.neighbors[index].name));
  }
  neighbors.append(ul);
  let secondTd = $("<td></td>");
  secondTd.append(languages);
  secondTd.append(currency);
  secondTd.append(weather);
  secondTd.append(neighbors);
  
  
  tr.append(secondTd);
  table.append(tr);
  
 
  $("#displayDetailes").empty();
  $("#displayDetailes").append(table);
}

function letters(event){
    $("#displayDetailes").empty();
  
    if(countriesArray.length == 0)
      alert("didnt find countries");
  
      let countriesByLatter = getCountriesByLetter(event.target.id);
  
    let sumOfCountries = countriesByLatter.length;  
    let table = $("<table></table>");
    for (let index = 0; index < sumOfCountries; index++) {
      let tr = $("<tr></tr>");
      let firstTd = $("<td></td>").text(countriesByLatter[index].name);
      tr.append(firstTd);
      let secondTd = $("<td></td>").text("Click for details").attr('id',countriesByLatter[index].url).attr('class',"detalis");
      secondTd.click(getCountryData);
      tr.append(secondTd);
      table.append(tr);
    }
  
    $("#displayCountry").empty();
    $("#displayCountry").append(table);
}

*/