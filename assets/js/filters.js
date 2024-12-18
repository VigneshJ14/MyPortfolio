document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.getElementById("filter-toggle");
    const filterDropdown = document.getElementById("filter-checkboxes");
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const projectCards = document.querySelectorAll(".project-card");

    // Toggle Dropdown Visibility
    filterToggle.addEventListener("click", () => {
        filterDropdown.classList.toggle("show");
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (event) => {
        if (!filterDropdown.contains(event.target) && event.target !== filterToggle) {
            filterDropdown.classList.remove("show");
        }
    });

    // Filter projects based on selected categories
    const filterProjects = () => {
        const selectedCategories = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        projectCards.forEach((card) => {
            const cardCategories = card.getAttribute("data-category").split(" ");
            if (selectedCategories.length === 0 || selectedCategories.some((cat) => cardCategories.includes(cat))) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    };

    // Add event listeners to checkboxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", filterProjects);
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
    revealCards(); // Initial load animation

    // Scroll-to-Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
