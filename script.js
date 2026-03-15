if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("intro-active");
    window.scrollTo(0, 0);

    const intro = document.getElementById("intro");
    const floatingMenuBtn = document.getElementById("floatingMenuBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuClose = document.getElementById("menuClose");
    const mainNavbar = document.getElementById("mainNavbar");

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

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

    function handleReveal() {
        if (document.body.classList.contains("intro-active")) return;

        const triggerBottom = window.innerHeight * 0.82;

        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();

            if (rect.top < triggerBottom && rect.bottom > 80) {
                el.classList.add("show");
            } else {
                el.classList.remove("show");
            }
        });
    }
    const params = new URLSearchParams(window.location.search);
    const skipIntro = params.get("skipIntro") === "1";

    if (intro) {
        if (skipIntro) {
            intro.style.display = "none";
            document.body.classList.remove("intro-active");
            handleReveal();
            handleScrollMenu();
            history.replaceState({}, "", "index.html#home");
        } else {
            setTimeout(() => {
                intro.style.display = "none";
                document.body.classList.remove("intro-active");
                window.scrollTo(0, 0);
                handleReveal();
                handleScrollMenu();
            }, 3000);
        }
    }

    window.addEventListener("scroll", handleScrollMenu);
    window.addEventListener("scroll", handleReveal);
    window.addEventListener("resize", handleReveal);

    handleScrollMenu();
    handleReveal();

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
});