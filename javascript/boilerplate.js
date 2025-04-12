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
        contact: ["", `https://bsky.app/profile/bladewyrm.dev`]
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
};

function header(active) {
    let current = preheader(active);

    $("header").append($("<nav>")
        .append($("<div>", {
            class: "navbar"
        })
            .append($("<div>", {
                class: "logo",
                id: current.index[0]
            })
                .append($("<a>", {
                    href: current.index[1],
                    css: {
                        "height": "56px"
                    }
                })
                    .append($("<img>", {
                        src: "https://tou-cafe.bladewyrm.dev/images/logo.svg",
                        alt: "tou café logo",
                        "css": {
                            "height": "100%"
                        }
                    }))
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
                    href: current.contact[1],
                    target: "_blank",
                    rel: "noopener noreferrer"
                })
                    .text("contact")
                )
            )
            .append($("<a>", {
                id: "burgerbox",
                onclick: `hamburger("${active}")`
            })
                .append($("<div>", {
                    class: "yesburger"
                }))
            )
        )
    );

    $("main").prepend($("<div>", {
        class: "hbmshadow",
        css: {
            "display": "none"
        }
    }));
};

function hamburger(active, close = false) {
    let current = preheader(active);

    if (close) {
        $("main").css("overflow", "visible");
        $("#burgerbox").css("pointer-events", "none");
        $(".hbmshadow").fadeOut(270);
        $(".hbmenu")
            .animate({
                right: "-100vw"
            }, 270, function () {
                $(this).remove()
                
                $("#burgerbox")
                    .attr("onclick", `hamburger("${active}")`)
                    .css("pointer-events", "auto");
                $(".noburger").toggleClass("noburger yesburger");
            });
    }
    else {
        $("#burgerbox").css("pointer-events", "none");
        $(".hbmshadow").fadeIn(270);
        $("header")
            .append($("<div>", {
                class: "hbmenu"
            })
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
        $(".hbmenu").animate({right: "0"}, 270, function () {
            $("main").css("overflow", "hidden");
            $("#burgerbox")
                .attr("onclick", `hamburger("${active}", true)`)
                .css("pointer-events", "auto");
            $(".yesburger").toggleClass("noburger yesburger");
        });
    };
}

function sFooter() {
    $("#sfooter")
        .append($("<div>", {
            class: "row center",
            css: {
                "height": "208px"
            }
        })
            .append($("<div>", {
                class: "column-90"
            })
                .append($("<div>", {
                    id: "sfmap"
                })
                    .append($("<a>", {
                        href: "https://bladewyrm.dev",
                        target: "_blank",
                        rel: "noopener noreferrer"
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
                            href: "https://bladewyrm.dev"
                        })
                            .text("main site")
                        )
                        .append($("<span>")
                            .text(" > ")
                        )
                        .append($("<a>", {
                            href: "https://bladewyrm.dev/projects.html"
                        })
                            .text("projects")
                        )
                        .append($("<span>")
                            .text(" > ")
                        )
                        .append($("<a>")
                            .text("tou café")
                        )
                    )
                )
            )
        );
}