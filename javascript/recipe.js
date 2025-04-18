// I feel like this is both big brain and small brain
// like, there's gotta be a better way to do this, right? aha...
// alas, I coded it like this cuz it works

$(document).ready(function () {
    // variables
    // elements
    const $tabtitle = $("#tabtitle"); // title of tab
    const $menulink = $("#menulink"); // link to menu
    const $title = $("#title"); // title of recipe
    const $wlcontainer = $("#wlcontainer"); // wakelock container
    const $recipecontent = $("#recipecontent"); // content of recipe
    const $ingredients = $("#ingredients"); // recipe ingredients
    const $equipment = $("#equipment"); // recipe equipment
    const $instructions = $("#instructions"); // recipe instructions, the big boy
    // let $images = $("#images");
    let $flavortext = $("#flavortext"); // recipe...description? commentary? life story? I'll figure it out

    // iteration stuff
    let i = 0, ilen = 0;
    let j = 0, jlen = 0;

    // function that displays the recipe
    function displayRecipe(selected) {
        // recipe selection
        let recipe = recipes[selected];
        recipes = null; // it'd be weird to be able to access all recipes from one instance of the webpage, so...

        $menulink.attr("href", `../menu.html?q=${menutitle}`); // link to parent menu

        if (recipe) {
            $tabtitle.prepend(recipe.title); // tab title
            $title.text(recipe.title); // recipe title

            // ingredients
            i = 0;
            ilen = recipe.ingredients.length;
            while (i < ilen) {
                // section header
                if (recipe.ingredients[i].header.length > 0) {
                    $ingredients
                        .append($("<div>", {
                            class: "h3 riheader"
                        })
                            .text(recipe.ingredients[i].header)
                        );
                };
    
                // actual stuff
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
                // stuff (no section header needed cuz i don't think it's necessary)
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
                // section header
                if (recipe.instructions[i].header.length > 0) {
                    $instructions
                        .append($("<div>", {
                            class: "h3 riheader"
                        })
                            .text(recipe.instructions[i].header)
                        );
                };
    
                // actual stuff
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

            $flavortext.html(recipe.flavortext); // flavortext
        }
        else {
            $tabtitle.prepend("404");
            $title.text("Error 404: recipe not found"); // recipe title
            $wlcontainer.toggleClass("mobileshow");
            $("#wlcontainer>.column-100")
                .empty()
                .append($("<br>"))
                .append($("<p>")
                    .text("there's nothing here...")
                );
            $recipecontent.empty();
            return;

        }
    };

    // initialize: get selected recipe
    let urlp = gURLP("q");
    displayRecipe(urlp);

    // donestep trigger
    $("#instructions>*:not(.riheader)").on("click", function() {
        if (!$(this).hasClass("hinstructions")) $(this).toggleClass("donestep");
    });
});