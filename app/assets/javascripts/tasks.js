// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

'use strict';

$(function() {
    let stash = null;

    const fields = [ "#task_due_date_1i", "#task_due_date_2i", "#task_due_date_3i" ];

    var hideOrShowDueDate = function() {
        const checked = $("#task_due").is(':checked');

        if (checked) {
            // If the values are empty, populate them
            if ($(fields[0]).val() === null) {
                // Try stash, resort to current date
                const date = stash || new Date();

                // Damned JavaScript dates
                $(fields[0]).val(String(1900 + date.getYear()));
                $(fields[1]).val(String(1 + date.getMonth()));
                $(fields[2]).val(String(date.getDate()));
            }

            // Show all fields
            fields.forEach(function(e) { $(e).show() });
        } else {
            // Stash the current date when hiding, if there is one
            if ($(fields[0]).val() !== null) {
                stash = new Date(fields.map(function(e) { return $(e).val(); }));
            }

            fields.forEach(function(e) { $(e).val(null) });
            fields.forEach(function(e) { $(e).hide() });
        }
    }

    var loadSelect2 = function() {
        $("#task_tag_ids").select2();
    }

    $(document).on("page:change", function() {
        $("#task_due").change(hideOrShowDueDate);
        hideOrShowDueDate();
        loadSelect2();
    });

});
