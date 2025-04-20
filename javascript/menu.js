// I feel like this is both big brain and small brain
// like, there's gotta be a better way to do this, right? aha...
// alas, I coded it like this cuz it works
// (recipe.js is even worse)
const menus = [
    {
        "name": "shef kyuri",
        "id": "shef-kyuri",
        "contents": [
            {},
            {}
        ]
    },
    {
        "name": "bakyuri",
        "id": "bakyuri",
        "contents": [
            {
                "cookies": [
                    {
                        "title": "red velvet cookies",
                        "id": "red-velvet-cookies",
                        "attributes": {
                            "hot": false,
                            "new": false
                        },
                        "description": "but what if it was <i>blue</i>?"
                    }
                ],
                "muffins": [
                    {
                        "title": "dog muffins",
                        "id": "dog-muffins",
                        "attributes": {
                            "hot": false,
                            "new": false
                        },
                        "description": ""
                    },
                    {
                        "title": "impostor pumpkin muffins",
                        "id": "impostor-pumpkin-muffins",
                        "attributes": {
                            "hot": false,
                            "new": false
                        },
                        "description": ""
                    },
                    {
                        "title": "lemon blueberry muffins",
                        "id": "lemon-blueberry-muffins",
                        "attributes": {
                            "hot": false,
                            "new": true
                        },
                        "description": ""
                    }
                ]
            },
            {
                "cakes": [
                    {
                        "title": "banana bread",
                        "id": "banana-bread",
                        "attributes": {
                            "hot": true,
                            "new": false
                        },
                        "description": "it's banana. it's bread. it's banana bread."
                    },
                    {
                        "title": "crêpe cake",
                        "id": "crepe-cake",
                        "attributes": {
                            "hot": false,
                            "new": false
                        },
                        "description": ""
                    },
                    {
                        "title": "sachertorte",
                        "id": "sachertorte",
                        "attributes": {
                            "hot": false,
                            "new": false
                        },
                        "description": "rizz your partner with this ONE simple trick!"
                    },
                ]
            }
        ]
    },
    {
        "name": "kyurista",
        "id": "kyurista",
        "contents": [
            {},
            {}
        ]
    }
];

$(document).ready(function() {
    // variables
    // elements
    const $menulist = $(".menulist"); // list of menus
    const $menutitle = $("#menutitle"); // title of menu
    const $menucontent = $("#menucontent"); // content of menu
        const columns = [$mcleft = $("#mcleft"), $mcright = $("#mcright")]; // columns of said content; put in an array for later :)


    let cm = 1; // current menu (0 = shef-kyuri, 1 = bakyuri, 2 = kyurista)

    // function that loads the menu
    function loadMenu(selection = 1) {
        // default menu is bakyuri cuz it's the one im most familiar with AHAHAHA
        if (!Number.isInteger(parseInt(selection)) || selection < 0 || selection > menus.length) selection = 1;

        $(`#${menus[selection].id}`).addClass("active"); // highlight button on menulist

        $menutitle.text(menus[selection].name); // menu title

        // menu contents
        // special empty menu output
        if (menus[selection].contents.length == 0 || (jQuery.isEmptyObject(menus[selection].contents[0]) && jQuery.isEmptyObject(menus[selection].contents[1]))) {
            $menucontent.empty();
            $menucontent
                .append($("<div>", {
                    class: "row"
                })
                    .append($("<div>", {
                        class: "column-100",
                        css: {
                            "text-align": "center"
                        }
                    })
                        .append($("<p>")
                            .text("there's nothing here..."))
                    )
                );
            return;
        };

        // iterate through two objects (the content for the left and right columns of the menu) and populate them accordingly
        columns.forEach(($element, index) => {
            // iterate through items in that column
            for (const [menuheader, menuitems] of Object.entries(menus[selection].contents[index])) {
                // menu section header
                $element
                    .append($("<div>", {
                        class: "menuheader"
                    })
                        .append($("<div>", {
                            class: "h2 mhtext"
                        })
                            .text(menuheader)
                        )
                        .append($("<hr>", {
                            class: "hrright"
                        }))
                    );

                // menu items
                let j = 0, jlen = menuitems.length;
                while (j < jlen) {
                    // main
                    $element
                        .append($("<a>", {
                            class: "menuitem",
                            id: menuitems[j].id,
                            href: `${menus[selection].id}/?q=${menuitems[j].id}`
                        })
                            .append($("<div>", {
                                class: "miheader"
                            })
                                .text(menuitems[j].title)
                            )
                            .append($("<div>")
                                .html(menuitems[j].description)
                            )
                        );

                    // tags
                    if (menuitems[j].attributes.hot) {
                        $(`#${menuitems[j].id}>.miheader`)
                            .prepend($("<div>", {
                                class: "hot"
                            }));
                    };

                    if (menuitems[j].attributes.new) {
                        $(`#${menuitems[j].id}>.miheader`)
                            .prepend($("<div>", {
                                class: "new"
                            }));
                    };

                    ++j;
                };

                $element.append($("<br>")); // spacing
            };
        });
    };

    // populate list of menus
    let i = 0, ilen = menus.length;
    while (i < ilen) {
        $menulist
            .append($("<a>", {
                class: "button",
                id: menus[i].id,
                href: `?q=${menus[i].id}`
            })
                .text(menus[i].name)
        );
        ++i;
    };

    // initialize: get selected menu
    let urlp = gURLP("q");
    if (urlp) {
        i = 0;
        ilen = menus.length;
        while (i < ilen) {
            if (urlp == menus[i].id) cm = i;
            ++i;
        };
    };

    loadMenu(cm);
});