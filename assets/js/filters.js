document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Filter Logic
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
            if (
                selectedCategories.length === 0 ||
                selectedCategories.some((cat) => cardCategories.includes(cat))
            ) {
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

    // Modal Logic
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalFeatures = document.getElementById("modal-features");
    const modalResults = document.getElementById("modal-results");
    const modalImages = document.querySelector(".modal-images");
    const modalLink = document.getElementById("modal-link");
    const closeModal = document.querySelector(".close");

    const modalData = {
        "asl-recognition": {
            title: "American Sign Language Image Recognition",
            description:
                "This project aimed to develop an algorithm capable of recognizing American Sign Language (ASL) hand gestures...",
            features: ["Feature 1", "Feature 2"],
            results: ["Result 1"],
            images: [
                { src: "assets/images/asl-pipeline.png", caption: "Pipeline Visualization" },
            ],
            link: "https://github.com/yourusername/project1",
        },
        // Additional project data here
    };

    // Open modal when a project card is clicked
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            const modalId = card.getAttribute("data-modal");
            console.log("Modal triggered for project ID:", modalId); // Debugging

            const projectData = modalData[modalId];
            if (!projectData) {
                console.error(`No modal data found for ID: ${modalId}`);
                return;
            }

            // Populate modal content
            modalTitle.innerText = projectData.title;
            modalDescription.innerText = projectData.description;

            // Populate features
            modalFeatures.innerHTML = projectData.features
                .map((feature) => `<li>${feature}</li>`)
                .join("");

            // Populate results
            modalResults.innerHTML = projectData.results
                .map((result) => `<li>${result}</li>`)
                .join("");

            // Populate images with captions
            modalImages.innerHTML = projectData.images
                .map(
                    (image) =>
                        `<figure><img src="${image.src}" alt="${image.caption}"><figcaption>${image.caption}</figcaption></figure>`
                )
                .join("");

            // Set modal link
            modalLink.href = projectData.link;

            // Show modal
            modal.style.display = "flex";
        });
    });

    // Close modal when the close button is clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
