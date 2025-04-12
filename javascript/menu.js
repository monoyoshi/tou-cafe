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
                            "hot": true,
                            "new": false
                        },
                        "description": "but what if it was <i>blue</i>?"
                    }
                ],
                "muffins": [
                    {
                        "title": "impostor pumpkin muffins",
                        "id": "impostor-pumpkin-muffins",
                        "attributes": {
                            "hot": false,
                            "new": false
                        },
                        "description": undefined
                    },
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
                        "description": undefined
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
    let $menulist = $(".menulist");
    let $menutitle = $("#menutitle");
    let $menucontent = $("#menucontent");
    let $mcleft = $("#mcleft");
    let $mcright = $("#mcright");

    let cm = 1;

    function loadMenu(selection = 1) {
        if (!Number.isInteger(parseInt(selection)) || selection < 0 || selection > menus.length) selection = 1;
        $(`#${menus[selection].id}`).addClass("active");

        $menutitle.text(menus[selection].name);

        if (Object.keys(menus[selection].contents[0]).length == 0) {
            $menucontent.empty();
            $menucontent.append($("<div>", {
                class: "column-100",
                css: {
                    "text-align": "center"
                }
            })
                .append($("<p>")
                    .text("there's nothing here..."))
            )
            return;
        };

        for (const [menuheader, menuitems] of Object.entries(menus[selection].contents[0])) {
            $mcleft
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

            let j = 0, jlen = menuitems.length;
            while (j < jlen) {
                $mcleft
                    .append($("<a>", {
                        class: "menuitem",
                        id: menuitems[j].id,
                        href: `${menus[selection].id}/?q=${menuitems[j].id}`,
                        target: "_blank",
                        rel: "noopener noreferrer"
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

            $mcleft.append($("<br>"));
        }

        for (const [menuheader, menuitems] of Object.entries(menus[selection].contents[1])) {
            $mcright
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

            let j = 0, jlen = menuitems.length;
            while (j < jlen) {
                $mcright
                    .append($("<a>", {
                        class: "menuitem",
                        id: menuitems[j].id,
                        href: `${menus[selection].id}/?q=${menuitems[j].id}`,
                        target: "_blank",
                        rel: "noopener noreferrer"
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

                if (menuitems[j].attributes.hot) {
                    $(`#${menuitems[j].id}>.miheader`)
                        .prepend($("<div>", {
                            class: "hot"
                        }))
                };

                if (menuitems[j].attributes.new) {
                    $(`#${menuitems[j].id}>.miheader`)
                        .prepend($("<div>", {
                            class: "new"
                        }))
                };

                ++j;
            };

            $mcright.append($("<br>"));
        };
    };

    let i = 0, ilen = menus.length;
    while (i < ilen) {
        $menulist.append($("<a>", {
            class: "button",
            id: menus[i].id,
            href: `?q=${menus[i].id}`
        })
            .text(menus[i].name)
        );
        ++i;
    };

    // initialize
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