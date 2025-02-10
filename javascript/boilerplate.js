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
        contact: ["", `https://tou-cafe.bladewyrm.dev/contact.html`],
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

function tcFooter() {
    $("#tcfooter")
        .addClass("widescreen")
        .css({
            "height": "300px",
            "background-color": "var(--white)",
            "box-shadow": "0px -2px var(--shadow)"
        })
        .append($("<div>", {
            class: "column-10"
        }))
        .append($("<div>", {
            class: "column-80"
        })
            .append($("<div>", {
                class: "row"
            })
                .append($("<div>", {
                    class: "column-100",
                    css: {
                        "text-align": "right"
                    }
                })
                    .append($("<img>", {
                        src: "https://tou-cafe.bladewyrm.dev/images/logo.png",
                        height: "90px",
                        css: {
                            "max-width": "none"
                        }
                    }))
                    .append($("<br>"))
                    .append($("<div>", {
                        css: {
                            "display": "flex",
                            "justify-content": "flex-end",
                            "width": "100%"
                        }
                    })
                        .append($("<a>", {
                            "href": "https://bladewyrm.dev",
                            "target": "_blank",
                            "rel": "noopener noreferrer",
                            "css": {
                                "margin-right": "10px"
                            }
                        })
                            .html("main site")
                        )
                        .append($("<div>", {
                            "css": {
                                "margin-right": "10px"
                            }
                        })
                            .html(">")
                        )
                        .append($("<a>", {
                            "href": "https://bladewyrm.dev/projects.html",
                            "target": "_blank",
                            "rel": "noopener noreferrer"
                        })
                            .html("projects")
                        )
                    )
                )
            )
        )
        .append($("<div>", {
            class: "column-10"
        }))
}