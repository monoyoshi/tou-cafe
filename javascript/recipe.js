$(document).ready(function () {
    $("#instructions>*").on("click", function() {
        if (!$(this).hasClass("hinstructions")) $(this).toggleClass("donestep");
    })
});