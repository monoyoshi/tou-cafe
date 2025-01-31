// header and footer generation
// I wanna have a header and a footer I can easily update through one file
// especially since it's static across all pages

function header(active) {
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
            current.menu[0] = "active";
            current.menu[1] = undefined;
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
                class: "hamburger"
            })
                .append("<div>")
                .append("<div>")
                .append("<div>")
            )
        )
    );
};