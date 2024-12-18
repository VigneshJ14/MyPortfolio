document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.getElementById("filter-toggle");
    const filterDropdown = document.getElementById("filter-groups");
    const groupToggles = document.querySelectorAll(".group-toggle");
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const projectCards = document.querySelectorAll(".project-card");
    const resetFiltersBtn = document.getElementById("reset-filters");

    // Toggle the main dropdown
    filterToggle.addEventListener("click", () => {
        filterDropdown.classList.toggle("show");
    });

    // Collapse/Expand Group Content
    groupToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;
            content.classList.toggle("show");
        });
    });

    // Filter Projects Based on Selected Categories
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

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", filterProjects);
    });

    // Reset Filters
    resetFiltersBtn.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
        projectCards.forEach((card) => (card.style.display = "block"));
    });
});
