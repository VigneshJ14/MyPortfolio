document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.getElementById("filter-toggle");
    const filterDropdown = document.getElementById("filter-groups");
    const groupToggles = document.querySelectorAll(".group-toggle");
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const projectCards = document.querySelectorAll(".project-card");
    const resetFilters = document.getElementById("reset-filters");

    // Toggle the main dropdown
    filterToggle.addEventListener("click", () => {
        filterDropdown.classList.toggle("show");
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", (event) => {
        if (!filterDropdown.contains(event.target) && event.target !== filterToggle) {
            filterDropdown.classList.remove("show");
        }
    });

    // Toggle individual groups
    groupToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;
            content.classList.toggle("show");
        });
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

    // Reset all filters
    resetFilters.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
        projectCards.forEach((card) => (card.style.display = "block"));
    });
});
