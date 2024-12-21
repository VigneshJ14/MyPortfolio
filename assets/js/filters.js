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
    if (modal) {
        modal.style.display = "none";
    }
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
                { src: "assets/images/asl-pipeline.png", caption: "Bag-of-Words Pipeline Visualization" },
                { src: "assets/images/asl-accuracy-chart.png", caption: "Accuracy Comparison Chart" },
            ],
            link: "https://github.com/yourusername/project1",
        },
        "jacobian-estimation": {
            title: "Neural Network Jacobian Estimation",
            description:
                "This project compares two methods for Jacobian estimation in visual servoing: analytical computation and a neural network-based approach. The Franka Emika Panda robot was used to center its camera view on a red box in a simulated environment, highlighting the trade-offs between accuracy and computational efficiency.",
            features: [
                "Analytical Jacobian computation combines kinematic and camera Jacobians.",
                "Neural network trained on model-informed data, predicting Jacobian matrices from robot states.",
                "Simulation performed in PyBullet environment with real-time visual feedback.",
                "Evaluated computation time and task performance for both methods.",
            ],
            results: [
                "Analytical Jacobian: Average computation time ~3.51s.",
                "Neural Network Jacobian: Average computation time ~2.80s.",
                "Both methods achieved comparable accuracy in centering the red box.",
            ],
            images: [
                { src: "assets/images/jacobian-accuracy.png", caption: "Analytical control camera view on left, neural network control camera view on right" },
                { src: "assets/images/servoing-simulation.png", caption: "Simulation Environment of Franka Emika Panda Robot" },
                { src: "assets/images/computation-time.png", caption: "Computation Time for Analytical vs Neural Network Jacobians" }
            ]
            ,
            link: "https://github.com/yourusername/project2",
            reportLink: "assets/documents/ECE276C_Report.pdf",
        },
        "financial-optimizer": {
            title: "Personal Financial Literacy Optimizer",
            description:
                "This project explores the relationship between various personal financial habits and their effects on credit scores. By analyzing over 100,000 data points from a credit score classification dataset, the model predicts credit scores and suggests personalized changes to improve them. It includes insights into payment behavior, outstanding debt, credit utilization, and financial habits to help users optimize their finances.",
            features: [
                "Utilized a Kaggle credit score dataset with 100,000 data points and 28 features.",
                "Performed extensive data preprocessing and feature extraction.",
                "Developed a reverse optimization pipeline for actionable insights.",
                "Selected an ExtraTreeClassifier with an accuracy and F1 score of over 85%.",
                "Integrated user-friendly suggestions to optimize credit scores."
            ],
            results: [
                "Identified key predictors of credit score: Payment of minimum amount, number of credit inquiries, delay from due date, and number of credit cards.",
                "Provided actionable insights: Reducing credit cards and outstanding debt improves credit scores, and avoiding hard inquiries leads to better credit behavior."
            ],
            images: [
                { src: "assets/images/credit-correlation-heatmap.png", caption: "Correlation heatmap showing key financial behaviors affecting credit scores." },
                { src: "assets/images/credit-best-model.png", caption: "Model selection results with ExtraTreeClassifier achieving highest accuracy and F1 score." },
                { src: "assets/images/website-view.png", caption: "Website view for the Financial Literacy Optimizer tool." }
            ],
            link: "https://github.com/yourusername/financial-optimizer",
            reportLink: "assets/documents/Personal_Financial_Literacy_Optimizer.pdf"
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

            // Populate images with captions
            modalImages.innerHTML = "";
            projectData.images.forEach((image) => {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = image.src;
                img.alt = image.caption;

                const caption = document.createElement("figcaption");
                caption.textContent = image.caption;

                figure.appendChild(img);
                figure.appendChild(caption);
                modalImages.appendChild(figure);
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
