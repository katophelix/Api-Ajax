
// Initial array of breeds
var breeds = ["Pug", "Yorki", "Labrador", "German Shepard", "Dachsund"];

// displaybreedInfo function re-renders the HTML to display the appropriate content
function displayBreedInfo() {

  var breed = $(this).attr("data-name");


  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=qbQytZG4v6Gc1CpCMXHuwJ9e1ewaLdB9&limit=10";




  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    var results = response.data;
    console.log(results);
    console.log('url', queryURL);

    for (var i = 0; i < results.length; i++) {

      // Creating a div to hold the breed
      var breedDiv = $("<div class='col-lg-4'>");

      // Storing the rating data
      var rating = results[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      var stillURL = results[i].images.fixed_height_small_still.url;

      // Creating an element to hold the image
      var image = $("<img>");
      image.attr("src", stillURL);
      image.attr('data-still', stillURL);
      image.attr('data-animated', results[i].images.fixed_height_small.url);
      image.attr('state', 'still');
      image.addClass('giphy');
      // Appending the image
      breedDiv.append(image);
      // Displaying the rating
      breedDiv.append(pOne);

      // Putting the entire breed above the previous breeds
      $("#breeds-view").prepend(breedDiv);
    }
  });

}

// Function for displaying breed data
function renderButtons() {

  // Deleting the breeds prior to adding new breeds
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of breeds
  for (var i = 0; i < breeds.length; i++) {

    // Then dynamicaly generating buttons for each breed in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of breed to our button
    a.addClass("breed");
    // Adding a data-attribute
    a.attr("data-name", breeds[i]);
    // Providing the initial button text
    a.addClass("col-md-2");
    a.text(breeds[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

function toggleAnimate() {

  var currState = $(this).attr('state');

  if (currState === 'still') {
    $(this).attr('src', $(this).attr('data-animated'));
    $(this).attr('state', 'animated');
  }
  else if (currState === 'animated') {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('state', 'still');
  }

}

// This function handles events where a breed button is clicked
$("#add-breed").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var breed = $("#breed-input").val().trim();

  // Adding breed from the textbox to our array
  breeds.push(breed);

  // Calling renderButtons which handles the processing of our breed array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "breed"
$(document).on("click", ".breed", displayBreedInfo);
$(document).on("click", ".giphy", toggleAnimate);
// Calling the renderButtons function to display the intial buttons
renderButtons();
