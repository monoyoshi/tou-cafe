$(document).ready(function () {
    const $tabtitle = $("#tabtitle");
    const $title = $("#title");
    const $ingredients = $("#ingredients");
    const $equipment = $("#equipment");
    const $instructions = $("#instructions");
    // let $images = $("#images");
    let $flavortext = $("#flavortext");

    let i = 0, ilen = 0;
    let j = 0, jlen = 0;

    function displayRecipe(selected = "") {
        // recipe selection
        let recipe = recipes[selected];
        recipes = null; // it'd be weird to be able to access all recipes from one instance of the webpage, so...

        if (recipe) {
            $tabtitle.prepend(recipe.title);
            $title.text(recipe.title);

            // ingredients
            i = 0;
            ilen = recipe.ingredients.length;
            while (i < ilen) {
                $ingredients
                    .append($("<li>")
                        .text(recipe.ingredients[i].name)
                    );
                if (recipe.ingredients[i].notes.length > 0) {
                    $("#ingredients>li:last-child")                
                        .append($("<ul>")
                            .html(`<li>${recipe.ingredients[i].notes.join("</li><li>")}</li>`)
                        );
                };

                ++i;
            };

            // equipment
            i = 0;
            ilen = recipe.equipment.length;
            while (i < ilen) {
                $equipment
                    .append($("<li>")
                        .text(recipe.equipment[i].name)
                    );
                if (recipe.equipment[i].notes.length > 0) {
                    $("#equipment>li:last-child")                
                        .append($("<ul>")
                            .html(`<li>${recipe.equipment[i].notes.join("</li><li>")}</li>`)
                        );
                };

                ++i;
            };

            // instructions
            i = 0;
            ilen = recipe.instructions.length;
            while (i < ilen) {
                if (recipe.instructions[i].header.length > 0) {
                    $instructions
                        .append($("<div>", {
                            class: "h3 riheader"
                        })
                            .text(recipe.instructions[i].header)
                        );
                };
    
                j = 0;
                jlen = recipe.instructions[i].list.length;
                while (j < jlen) {
                    $instructions
                        .append($("<div>")
                            .text(recipe.instructions[i].list[j].base)
                        );
                    if (recipe.instructions[i].list[j].notes.length > 0) {
                        $("#instructions>div:last-child")                
                            .append($("<ul>")
                                .html(`<li>${recipe.instructions[i].list[j].notes.join("</li><li>")}</li>`)
                            );
                    };
    
                    ++j;
                };
    
                ++i;
            };

            // flavortext
            $flavortext.html(recipe.flavortext);
        }
        else {
            $tabtitle.prepend("non-existent item");
            $title.text("non-existent item");
            $ingredients
                .append($("<li>")
                    .text("curiosity")
                );
            $equipment
                .append($("<li>")
                    .text("address bar")
                )
                .append($("<li>")
                    .text("keyboard")
                );
            $instructions
                .append($("<div>")
                    .text("be lost and confused")
                );
            $flavortext.html(`there's nothing here...<br>(go back to the homepage with <a href="https://tou-cafe.bladewyrm.dev">this link</a>)`);
        };
    };

    // get selected recipe
    let urlp = gURLP("q");
    displayRecipe(urlp);

    // donestep trigger
    $("#instructions>*:not(.riheader)").on("click", function() {
        if (!$(this).hasClass("hinstructions")) $(this).toggleClass("donestep");
    });
});