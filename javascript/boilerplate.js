// generate html elements
function generateElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.children[0];
};

// header and footer generation
// I wanna have a header and a footer I can easily update through one file
// especially since it's static across all pages

function preheader(active) {
    // active = active "section" of the website
    // my funny workaround is just an array
    let current = {
        index: ["", "/"],
        menu: ["", "/menu.html"],
        about: ["", "/about.html"],
        shop: ["", "/shop.html"],
        contact: ["", "https://bsky.app/profile/bladewyrm.dev"]
    };

    switch (active) {
        case "index": {
            current.index[0] = "active";
            current.index[1] = "";
            break;
        };
        case "menu": {
            current.menu[1] = "";
        }
        case "recipe": {
            current.menu[0] = "active";
            break;
        };
        case "about": {
            current.about[0] = "active";
            current.about[1] = "";
            break;
        };
        case "shop": {
            current.shop[0] = "active";
            current.shop[1] = "";
            break;
        };
        case "contact": {
            current.contact[0] = "active";
            current.contact[1] = "";
            break;
        };
    };

    return current;
};

function header(active) {
    const current = preheader(active);

    document.body.prepend(generateElement(`
<header>
    <div class="navbar">
        <div class="logo" id="${current.index[0]}">
            <a href="${current.index[1]} style="height: 56px;"><img src="/images/logo.svg" alt="tou café logo" style="height: 100%;"></a>
        </div>
        <div id="${current.menu[0]}">
            <a href="${current.menu[1]}">menu</a>
        </div>
        <div id="${current.about[0]}">
            <a href="${current.about[1]}">about</a>
        </div>
        <div id="${current.shop[0]}">
            <a href="${current.shop[1]}">shop</a>
        </div>
        <div id="${current.contact[0]}">
            <a href="${current.contact[1]}" target="_blank" rel="noopener noreferrer">contact</a>
        </div>
        <a id="burgerbox" onclick="hamburger('${active}')">
            <div class="yesburger"></div>
        </a>
    </div>
    <div id="hbmenu">
        <a id="${current.menu[0]}" href="${current.menu[1]}">menu</a>
        <a id="${current.about[0]}" href="${current.about[1]}">about</a>
        <a id="${current.shop[0]}" href="${current.shop[1]}">shop</a>
        <a id="${current.contact[0]}" href="${current.contact[1]}" target="_blank" rel="noopener noreferrer">contact</a>
    </div>
</header>
    `));
    document.getElementsByTagName("main")[0].prepend(generateElement(`<div class="hide" id="hbmshadow"></div>`));
};

function hamburger(active, close = false) {
    const MainElement = document.getElementsByTagName("main")[0];
    const BurgerBox = document.getElementById("burgerbox");
    const HBMShadow = document.getElementById("hbmshadow");
    const HBMenu = document.getElementById("hbmenu");

    if (close) {
        MainElement.style.overflow = "visible";
        HBMShadow.classList.replace("show", "hide");
        HBMenu.animate([
                {},
                {
                    right: "-100vw"
                },
            ], {
                duration: 270,
                fill: "forwards"
            }
        );
        setTimeout(() => {
            BurgerBox.setAttribute("onclick", `hamburger("${active}")`);

            document.getElementsByClassName("noburger")[0].classList.replace("noburger", "yesburger");

        }, 270);
    }
    else {
        HBMShadow.classList.replace("hide", "show");

        HBMenu.animate([
                {},
                {
                    right: 0
                },
            ], {
                duration: 270,
                fill: "forwards"
        });
        setTimeout(() => {
            MainElement.style.overflow ="hidden";
            
            BurgerBox.setAttribute("onclick", `hamburger("${active}", true)`);
            BurgerBox.pointerEvents = "auto";

            document.getElementsByClassName("yesburger")[0].classList.replace("yesburger", "noburger");

        }, 270);
    };
};

function sHeader() {
    const LocalHeader = generateElement(`
<section id="sheader" style="background-color: var(--a_lightpink);">
    <div class="row center">
        <div class="column-70 hfont h1" style="margin-bottom: 1rem; text-align: center;">this website is no longer up to date</div>
    </div>
    <div class="row center">
        <div class="column-75" style="margin-bottom: 1rem; text-align: center;">
            <p>tou café has evolved, and by evolved I mean shedding that hyphen (not really, it's just a redirect now)</p>
            <p>click <a href="toucafe.bladewyrm.dev">here</a> to go to the new and improved site. there's bread!</p>
            <p>these pages will remain as proof that it once existed. throwback to the days...</p>
        </div>
    </div>
</section>
    `);

    document.getElementsByTagName("main")[0].prepend(LocalHeader);
};

function footer() {
    const FooterElement = generateElement(`
<footer>
    <div>made with love and pure hyperfixation from <b>kyu(ren)</b></div>
    <img src="https://cdn.bladewyrm.dev/images/kyurem/sprite-animated_kyurem.png" height=32 width=32>
</footer>
    `);

    document.body.append(FooterElement);
};

function sFooter() {
    const LocalFooter = generateElement(`
<section id="sfooter">
    <div class="row center" style="height: 208px;">
        <div class="column-90" id="sfmap">
            <a href="https://bladewyrm.dev" target="_blank" rel="noopener noreferrer"><img src="https://cdn.bladewyrm.dev/images/logo.svg" alt="bladewyrm logo" style="height: 90px;"></a>
        </div>
    </div>
</section>
    `);

    document.getElementsByTagName("main")[0].append(LocalFooter);
};

// "get url parameters" but I think it's funny to keep everything as one letter
// *gurlp* t-they're right behind me, isn't it
function gURLP(p) {
    return new URLSearchParams(document.location.search).get(p);
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
});