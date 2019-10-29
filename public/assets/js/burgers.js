// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour").on("click", function(event) {
        var id = $(this).data("id");
        console.log(id);
        var newDevouredState = {
            devoured: true
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function() {
            console.log("changed devoured to");
            // Reload the page to get the updated list
            location.reload();
        });
    });
  
    $(".add-burger").on("submit", function(event) {
        console.log("submit")
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bn").val().trim()
        };

        console.log(newBurger);

        // Send the POST request.
        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Created new burger");
            // Reload the page to get the updated list
            location.reload();
        });
    });
});  