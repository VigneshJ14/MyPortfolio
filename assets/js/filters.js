document.addEventListener("DOMContentLoaded", () => {
    const filterDropdown = document.getElementById("project-filter");
    const projectCards = document.querySelectorAll(".project-card");

    // Listen for changes in the dropdown
    filterDropdown.addEventListener("change", (event) => {
        const filter = event.target.value; // Selected value

        // Show or hide projects based on the filter
        projectCards.forEach((card) => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
