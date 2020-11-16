/* eslint-disable no-undef */
$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        if (data.username) {
            $(".member-name").text(data.username);
            $("#logout").show();
        } else {
            $("#logout").hide();
        }
    });
});