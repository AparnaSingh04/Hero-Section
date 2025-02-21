document.addEventListener("DOMContentLoaded", function () {
    var boxes = document.querySelectorAll(".box");
    var text = document.querySelector(".text h1");

    if (!boxes.length || !text) {
        console.error("Boxes or text element not found! Check your HTML structure.");
        return;
    }

    boxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
            boxes.forEach((otherBox) => {
                if (otherBox !== box) {
                    otherBox.classList.add("hide-image");
                }
            });

            // Bring box above the centered text
            box.style.zIndex = "100";
        });

        box.addEventListener("mousemove", (e) => {
            let boxRect = box.getBoundingClientRect();
            let x = (e.clientX - boxRect.left - boxRect.width / 2) * 0.5;
            let y = (e.clientY - boxRect.top - boxRect.height / 2) * 0.5;

            box.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            text.style.opacity = "0.5";
        });

        box.addEventListener("mouseleave", () => {
            box.style.zIndex = "1"; // Reset z-index
            box.style.transform = "translate(0,0)";

            boxes.forEach((otherBox) => {
                otherBox.classList.remove("hide-image");
            });

            text.style.opacity = "1";
        });
    });
});
