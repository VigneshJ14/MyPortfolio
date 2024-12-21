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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalFeatures = document.getElementById("modal-features");
    const modalResults = document.getElementById("modal-results");
    const modalImages = document.querySelector(".modal-images");
    const modalLink = document.getElementById("modal-link");
    const closeModal = document.querySelector(".close");

    // Project-specific modal data
    const modalData = {
        "asl-recognition": {
            title: "American Sign Language Image Recognition",
            description:
                "This project aimed to develop an algorithm capable of recognizing American Sign Language (ASL) hand gestures for the alphabet. By using a robust pipeline that incorporated advanced image preprocessing and machine learning techniques, this project achieved an accuracy of up to 92%. The model can classify hand gestures under moderate noise and adverse lighting conditions, making it highly practical for real-world applications like aiding communication with the deaf or ASL transcription.",
            features: [
                "Utilized the Bag-of-Words approach adapted for image classification.",
                "Implemented Scale-Invariant Feature Transform (SIFT) for keypoint detection.",
                "Used K-means Clustering to create a visual vocabulary for feature representation.",
                "Classified gestures using a K-Nearest Neighbor (KNN) classifier.",
                "Image preprocessing included Median Filtering, Image Sharpening, and Gamma Correction.",
            ],
            results: [
                "Initial accuracy: 58%",
                "With dataset expansion: 90%",
                "After optimization: 92%",
            ],
            images: [
                "assets/images/asl-preprocessing.png",
                "assets/images/asl-pipeline.png",
                "assets/images/asl-accuracy-chart.png",
            ],
            link: "https://github.com/yourusername/project1",
        },
        "jacobian-estimation": {
            title: "Neural Network Jacobian Estimation",
            description:
                "This project uses neural networks to center Panda Robot images, optimizing performance for robotics tasks.",
            features: [
                "Integrated neural network models for estimation.",
                "Optimized for real-time robotic performance.",
            ],
            results: ["Achieved 95% estimation accuracy."],
            images: ["assets/images/jacobian.png"],
            link: "https://github.com/yourusername/project2",
        },
        // Add more project data here
    };

    // Open modal when a project card is clicked
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            const modalId = card.getAttribute("data-modal");
            const projectData = modalData[modalId];

            if (!projectData) {
                console.error(`No modal data found for ID: ${modalId}`);
                return;
            }

            // Populate modal content
            modalTitle.innerText = projectData.title;
            modalDescription.innerText = projectData.description;

            // Populate features
            modalFeatures.innerHTML = "";
            projectData.features.forEach((feature) => {
                const li = document.createElement("li");
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });

            // Populate results
            modalResults.innerHTML = "";
            projectData.results.forEach((result) => {
                const li = document.createElement("li");
                li.textContent = result;
                modalResults.appendChild(li);
            });

            // Populate images
            modalImages.innerHTML = "";
            projectData.images.forEach((imageSrc) => {
                const img = document.createElement("img");
                img.src = imageSrc;
                img.alt = "Project Image";
                modalImages.appendChild(img);
            });

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
