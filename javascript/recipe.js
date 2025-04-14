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

    function displayRecipe(selected) {
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
                if (recipe.ingredients[i].header.length > 0) {
                    $ingredients
                        .append($("<div>", {
                            class: "h3 riheader"
                        })
                            .text(recipe.ingredients[i].header)
                        );
                };
    
                j = 0;
                jlen = recipe.ingredients[i].list.length;
                $ingredients.append($("<ul>"));
                while (j < jlen) {
                    $("#ingredients>ul:last-child")
                        .append($("<li>")
                            .text(recipe.ingredients[i].list[j].name)
                        );
                    if (recipe.ingredients[i].list[j].notes.length > 0) {
                        $("#ingredients>ul:last-child>li:last-child")
                            .append($("<ul>")
                                .html(`<li>${recipe.ingredients[i].list[j].notes.join("</li><li>")}</li>`)
                            );
                    };

                    if (j == jlen - 1) $ingredients.append($("<br>"));
    
                    ++j;
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

                    if (j == jlen - 1) $instructions.append($("<br>"));
    
                    ++j;
                };
    
                ++i;
            };

            // flavortext
            $flavortext.html(recipe.flavortext);
        }
        else window.location.href = "404.html";
    };

    // get selected recipe
    let urlp = gURLP("q");
    displayRecipe(urlp);

    // donestep trigger
    $("#instructions>*:not(.riheader)").on("click", function() {
        if (!$(this).hasClass("hinstructions")) $(this).toggleClass("donestep");
    });
});