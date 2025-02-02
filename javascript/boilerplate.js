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
                    height: 45
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

    let $hamburger = $(".navbar > .hamburger");
    if (close) {
        $(".hbmenu").animate({right: "-50vh"}, 150, function () {
            $(this).remove()
        });
    }
    else {
        $("header")
            .append($("<div>", {
                class: "hbmenu"
            })
                .append($("<div>", {
                    
                })
                    .append($("<a>", {
                        class: "hamburger",
                        onclick: `hamburger("${active}", true)`
                    })
                        .append($("<div>"))
                        .append($("<div>"))
                        .append($("<div>"))
                    )
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
            );
        $(".hbmenu").animate({right: "0"}, 150);
    };

}