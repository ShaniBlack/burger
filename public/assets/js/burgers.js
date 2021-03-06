$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newdevoured = $(this).data("newdevoured");
  
      var changedDevoured = {
        devoured: newdevoured
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: changedDevoured
      }).then(
        function() {
          console.log("changed devoured to", newdevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });



$(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("line 4");
    let newBurger = {
      burger_name: $("#enter-burger").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
