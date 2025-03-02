document.addEventListener("DOMContentLoaded", function () {
    var boxes = document.querySelectorAll(".box");
    var text = document.querySelector(".text h1");
    var hoverActive = false;

    if (!boxes.length || !text) {
        console.error("Boxes or text element not found! Check your HTML structure.");
        return;
    }

    function applyHoverEffects() {
        text.classList.add("outline-effect");
        text.style.opacity = "0.5";
    }

    function removeHoverEffects() {
        if (!hoverActive) {
            text.classList.remove("outline-effect");
            text.style.opacity = "1";
        }
    }

    boxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
            hoverActive = true;
            applyHoverEffects();
            
            boxes.forEach((otherBox) => {
                if (otherBox !== box) {
                    otherBox.classList.add("hide-image");
                }
            });

            box.style.zIndex = "100";
        });

        box.addEventListener("mousemove", (e) => {
            let boxRect = box.getBoundingClientRect();
            let x = (e.clientX - boxRect.left - boxRect.width / 2) * 0.5;
            let y = (e.clientY - boxRect.top - boxRect.height / 2) * 0.5;
            
            box.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            box.style.transition = "transform 0.1s ease-out";
        });

        box.addEventListener("mouseleave", () => {
            hoverActive = false;
            setTimeout(removeHoverEffects, 100); 
            box.style.zIndex = "1";
            box.style.transform = "translate(0,0)";

            boxes.forEach((otherBox) => {
                otherBox.classList.remove("hide-image");
            });
        });
    });

    text.addEventListener("mouseenter", () => {
        hoverActive = false;
        applyHoverEffects();
    });

    text.addEventListener("mouseleave", () => {
        hoverActive = false;
        setTimeout(removeHoverEffects, 100);
    });
});
