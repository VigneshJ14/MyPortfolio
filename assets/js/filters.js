document.addEventListener("DOMContentLoaded", () => {
    const filterDropdown = document.getElementById("project-filter");
    const projectCards = document.querySelectorAll(".project-card");

    // Multi-Tag Filtering Logic
    filterDropdown.addEventListener("change", (event) => {
        const filter = event.target.value;

        projectCards.forEach((card) => {
            const categories = card.getAttribute("data-category").split(" ");
            if (filter === "all" || categories.includes(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // Scroll Animation for Project Cards
    const revealCards = () => {
        projectCards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 50) {
                card.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealCards);
    revealCards(); // Trigger on page load to check initially visible cards

    // Scroll-to-Top Button Logic
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
