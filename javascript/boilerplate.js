// header generation
// I wanna have a header I can easily manipulate through one file
// especially since it's static across all pages

function preheader(active) {
    // active = active "section" of the website
    // my funny workaround is just an array
    let current = {
        index: ["", `https://tou-cafe.bladewyrm.dev`],
        menu: ["", `https://tou-cafe.bladewyrm.dev/menu.html`],
        about: ["", `https://tou-cafe.bladewyrm.dev/about.html`],
        shop: ["", `https://tou-cafe.bladewyrm.dev/shop.html`],
        contact: ["", `https://tou-cafe.bladewyrm.dev/contact.html`]
    };

    switch (active) {
        case "index": {
            current.index[0] = "active";
            current.index[1] = undefined;
            break;
        };
        case "menu": {
            current.menu[1] = undefined;
        }
        case "recipe": {
            current.menu[0] = "active";
            break;
        };
        case "about": {
            current.about[0] = "active";
            current.about[1] = undefined;
            break;
        };
        case "shop": {
            current.shop[0] = "active";
            current.shop[1] = undefined;
            break;
        };
        case "contact": {
            current.contact[0] = "active";
            current.contact[1] = undefined;
            break;
        };
    };

    return current;
}

function header(active) {
    let current = preheader(active);

    $("header").append($("<nav>")
        .append($("<div>", {
            class: "navbar"
        })
            
            .append($("<a>", {
                    class: "logo",
                    id: current.index[0],
                    href: current.index[1]
                })
                .append($("<img>", {
                    src: "https://tou-cafe.bladewyrm.dev/images/logo.png",
                    alt: "tou café logo",
                    height: 45,
                    "css": {
                        "max-width": "none"
                    }
                }))
            )
            .append($("<div>", {
                id: current.menu[0]
            })
                .append($("<a>", {
                    href: current.menu[1]
                })
                    .text("menu")
                )
            )
            .append($("<div>", {
                id: current.about[0]
            })
                .append($("<a>", {
                    href: current.about[1]
                })
                    .text("about")
                )
            )
            .append($("<div>", {
                id: current.shop[0]
            })
                .append($("<a>", {
                    href: current.shop[1]
                })
                    .text("shop")
                )
            )
            .append($("<div>", {
                id: current.contact[0]
            })
                .append($("<a>", {
                    href: current.contact[1]
                })
                    .text("contact")
                )
            )
            .append($("<a>", {
                class: "hamburger",
                onclick: `hamburger("${active}")`
            })
                .append($("<div>"))
                .append($("<div>"))
                .append($("<div>"))
            )
        )
    );
};

function hamburger(active, close) {
    let current = preheader(active);

    if (close) {
        $(".hbmenu").animate({right: "-100vw"}, 150, function () {
            $(this).remove()
        });
    }
    else {
        $("header")
            .append($("<div>", {
                class: "hbmenu"
            })
                .append($("<div>")
                    .append($("<a>", {
                        class: "hamburger",
                        onclick: `hamburger("${active}", true)`
                    })
                        .append($("<div>"))
                        .append($("<div>"))
                    )
                )
                .append($("<a>", {
                    id: current.menu[0],
                    href: current.menu[1]
                })
                        .text("menu")
                )
                .append($("<a>", {
                    id: current.about[0],
                    href: current.about[1]
                })
                    .text("about")
                )
                .append($("<a>", {
                    id: current.shop[0],
                    href: current.shop[1]
                })
                    .text("shop")
                )
                .append($("<a>", {
                    id: current.contact[0],
                    href: current.contact[1]
                })
                    .text("contact")
                )
            );
        $(".hbmenu").animate({right: "0"}, 150);
    };
}

function sFooter() {
    $("#sfooter")
        .append($("<div>", {
            class: "row",
            css: {
                "height": "45px",
                "background-color": "var(--a_lightblue)"
            }
        }))
        .append($("<div>", {
            class: "row center",
            css: {
                "height": "225px",
                "background-color": "var(--white)"
            }
        })
            .append($("<div>", {
                class: "column-10"
            }))
            .append($("<div>", {
                class: "column-80"
            })
                .append($("<div>", {
                        id: "sfmap"
                    })
                        .append($("<a>", {
                            "href": "https://bladewyrm.dev",
                            "target": "_blank",
                            "rel": "noopener noreferrer"
                        })
                            .append($("<img>", {
                                src: "https://cdn.bladewyrm.dev/images/logo.svg",
                                height: "90px",
                                alt: "bladewyrm logo"
                            }))
                        )
                        .append($("<br>"))
                        .append($("<div>")
                            .append($("<a>", {
                                "href": "https://bladewyrm.dev",
                                "target": "_blank",
                                "rel": "noopener noreferrer"
                            })
                                .text("main site")
                            )
                            .append($("<span>")
                                .text(" > ")
                            )
                            .append($("<a>", {
                                "href": "https://bladewyrm.dev/projects.html",
                                "target": "_blank",
                                "rel": "noopener noreferrer"
                            })
                                .text("projects")
                            )
                            .append($("<span>")
                                .text(" > ")
                            )
                            .append($("<a>", {
                                "href": "https://tou-cafe.bladewyrm.dev/",
                                "target": "_blank",
                                "rel": "noopener noreferrer"
                            })
                                .text("tou café")
                            )
                        )
                )
            )
        );
}