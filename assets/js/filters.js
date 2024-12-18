document.addEventListener("DOMContentLoaded", () => {
    const filterDropdown = document.getElementById("project-filter");
    const projectCards = document.querySelectorAll(".project-card");

    // Filter functionality
    filterDropdown.addEventListener("change", (event) => {
        const filter = event.target.value;

        projectCards.forEach((card) => {
            const category = card.getAttribute("data-category");
            card.style.display = filter === "all" || category === filter ? "block" : "none";
        });
    });

    // Scroll animations for project cards
    const revealCards = () => {
        projectCards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 50) {
                card.classList.add("visible");
            }
        });
    };

    // Reveal cards on scroll
    window.addEventListener("scroll", revealCards);
    revealCards(); // Initial check on page load

    // Scroll-to-Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
