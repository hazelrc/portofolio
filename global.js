const revealElements = document.querySelectorAll(".reveal");
const githubBtn = document.getElementById("githubBtn");
const contactBottom = document.querySelector(".contact-bottom-reveal");

const floatingMenuBtn = document.getElementById("floatingMenuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");
const mainNavbar = document.getElementById("mainNavbar");

function handleReveal() {
    const triggerBottom = window.innerHeight * 0.65;

    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (rect.top < triggerBottom && rect.bottom > -40) {
            el.classList.add("show");
        } else {
            el.classList.remove("show");
        }
    });

    if (contactBottom) {
        const rect = contactBottom.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.92 && rect.bottom > -100) {
            contactBottom.classList.add("show");
        } else {
            contactBottom.classList.remove("show");
        }
    }
}

function handleGithubButton() {
    if (!githubBtn) return;

    if (window.scrollY > 80) {
        githubBtn.classList.add("hide-on-scroll");
    } else {
        githubBtn.classList.remove("hide-on-scroll");
    }
}

function handleScrollMenu() {
    if (!floatingMenuBtn || !mainNavbar || !menuOverlay) return;

    if (window.scrollY > 80) {
        mainNavbar.classList.add("nav-hidden");

        if (!menuOverlay.classList.contains("open")) {
            floatingMenuBtn.classList.add("show");
            floatingMenuBtn.classList.remove("hide");
        }
    } else {
        mainNavbar.classList.remove("nav-hidden");
        floatingMenuBtn.classList.remove("show");
        floatingMenuBtn.classList.remove("hide");
    }
}

function handleAll() {
    handleReveal();
    handleGithubButton();
    handleScrollMenu();
}

window.addEventListener("scroll", handleAll);
window.addEventListener("resize", handleAll);
window.addEventListener("load", handleAll);

if (floatingMenuBtn && menuOverlay) {
    floatingMenuBtn.addEventListener("click", () => {
        menuOverlay.classList.add("open");
        document.body.classList.add("menu-open");
        floatingMenuBtn.classList.add("hide");
    });
}

if (menuClose && menuOverlay && floatingMenuBtn) {
    menuClose.addEventListener("click", () => {
        menuOverlay.classList.remove("open");
        document.body.classList.remove("menu-open");

        if (window.scrollY > 80) {
            floatingMenuBtn.classList.remove("hide");
            floatingMenuBtn.classList.add("show");
        }
    });
}

document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (menuOverlay) menuOverlay.classList.remove("open");
        document.body.classList.remove("menu-open");

        if (window.scrollY > 80 && floatingMenuBtn) {
            floatingMenuBtn.classList.remove("hide");
            floatingMenuBtn.classList.add("show");
        }
    });
});