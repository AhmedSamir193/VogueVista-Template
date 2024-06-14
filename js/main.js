// Setting Box

let settingBox = document.querySelector(".setting-box")
let iconContainer = document.querySelector(".setting-box .setting-container")
let buttonIcon = document.querySelector(".setting-icon")


iconContainer.onclick = function () {

    buttonIcon.classList.toggle("fa-spin")

    settingBox.classList.toggle("active")

}

// Close Setting Box when clicked outside on mobile devices
document.addEventListener("click", function (event) {
    // Check if the clicked element is not the setting box or its button icon
    if (!settingBox.contains(event.target) && !buttonIcon.contains(event.target)) {
        // If the setting box is active, close it
        if (settingBox.classList.contains("active")) {
            settingBox.classList.remove("active");
            buttonIcon.classList.toggle("fa-spin")

        }
    }
});



// change colors
var ColorsLi = document.querySelectorAll(".color-lists li")

ColorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {

        addActiveClass(e)

        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)

        localStorage.setItem("color-option", e.target.dataset.color)

    })
})

// get localStorage colors

if(localStorage.getItem("color-option")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"))

    ColorsLi.forEach((li) => {

            li.classList.remove("active")

        if (li.dataset.color === localStorage.getItem("color-option")) {
            li.classList.add("active")
        }

    })
} else {
    const defaultColor = ColorsLi[0].dataset.color
    document.documentElement.style.setProperty("--main-color", defaultColor)
    ColorsLi[0].classList.add("active")
    localStorage.setItem("color-option", defaultColor)

}


// change Background Options
var backgroundspans = document.querySelectorAll(".backgrounds-container span")

backgroundspans.forEach((span) => {
    span.addEventListener("click", (e) => {


        addActiveClass(e)

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true
            ChangeBackground()

            localStorage.setItem("background-option", true)


        } else {
            clearInterval(changeInterval)

            localStorage.setItem("background-option", false)

        }

    })
})


// Progress Section
const progressSection = document.querySelector(".skill-section");
const spanProgress = Array.from(document.querySelectorAll(".skill-progress span"));

// Helper function to handle scroll event with debounce
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Function to check and set progress bars' width
function handleScroll() {
    if (window.scrollY >= progressSection.offsetTop - window.innerHeight - 400) {
        spanProgress.forEach((span) => {
            span.style.width = span.dataset.width;
        });
    }
}

// Add scroll event listener with debounce
window.addEventListener('scroll', debounce(handleScroll));



let popupImg = document.querySelectorAll(".img-container img");

popupImg.forEach((img) => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let headingImg = document.createElement("h3");
            headingImg.innerHTML = img.alt;
            headingImg.className = "headingImg";
            popupBox.appendChild(headingImg);
        }

        let image = document.createElement("img");
        image.src = img.src;
        popupBox.appendChild(image);

        document.body.appendChild(popupBox);

        let exitIcon = document.createElement("span");
        exitIcon.className = 'exit-icon';
        exitIcon.innerHTML = "X";
        popupBox.appendChild(exitIcon);

        // Trigger the transition by adding the 'active' class
        setTimeout(() => {
            overlay.classList.add('active');
            popupBox.classList.add('active');
        }, 10); // Small delay to ensure the elements are rendered
    });
});

document.addEventListener("click", (e) => {
    if (e.target.className == 'exit-icon') {
        removePopup();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        removePopup();
    }
});


function removePopup() {
    let popupBox = document.querySelector(".popup-box");
    let overlay = document.querySelector(".popup-overlay");
    if (popupBox && overlay) {
        // Remove the active Class
        popupBox.classList.remove('active');
        overlay.classList.remove('active');

        // Remove the elements after the transition ends
        setTimeout(() => {
            if (popupBox) {
                popupBox.remove();
            }
            if (overlay) {
                overlay.remove();
            }
        }, 300);
    }
}


// scrollintoView Method

let bullets = document.querySelectorAll(".nav-bullets .bullet")
let navLinks = document.querySelectorAll(".links a")

function scroolToSection (elments) {
    elments.forEach((elemnt) => {
        elemnt.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}

scroolToSection(bullets)
scroolToSection(navLinks)


function addActiveClass(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((elment) => {
        elment.classList.remove("active")
    })

    ev.target.classList.add("active")
}

// Change Background
let landingPage = document.querySelector(".landing-page")


let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

backgroundOption = true

let changeInterval

function ChangeBackground() {

    if (backgroundOption === true) {
        changeInterval = setInterval (() => {

        let random = Math.floor(Math.random() * imgsArray.length)

        landingPage.style.backgroundImage = 'url("/imgs/'+ imgsArray[random] +'")';

    }, 5000)
}
}

const bulletSpan = document.querySelectorAll(".Bullets-container span")
const navBullets = document.querySelector(".nav-bullets") 


// Background LocalStorage && State LocalStorage
function loadState () {
    const state = localStorage.getItem("localState")
    let backgroundItem = localStorage.getItem("background-option")

    if (state) {
    if (state === "show") {
        navBullets.classList.remove("hidden")
        navBullets.classList.add("show")
        document.querySelector(".Bullets-container .yes").classList.add("active")
        
    } else {
        navBullets.classList.remove("show")
        navBullets.classList.add("hidden")
        document.querySelector(".Bullets-container .no").classList.add("active")
    }

    } else {
        navBullets.classList.remove("hidden")
        navBullets.classList.add("show")
        document.querySelector(".Bullets-container .yes").classList.add("active")
    }
    
    if (backgroundItem) {
        if (backgroundItem === 'true') {
            backgroundOption = true
            document.querySelector(".yes").classList.add("active")
        } else {
            backgroundOption = false
            document.querySelector(".no").classList.add("active")
        }
            ChangeBackground();

    } else {
        backgroundOption = true
        document.querySelector(".yes").classList.add("active")
        ChangeBackground();
    }
} 

document.addEventListener("DOMContentLoaded", loadState)

// Show Bullets
bulletSpan.forEach((span) => {
    span.addEventListener("click", (e) => {

        if (e.target.dataset.bullets === "show") {
            navBullets.classList.remove("hidden")
            navBullets.classList.add("show")
            localStorage.setItem("localState", "show")
        } else {
            navBullets.classList.remove("show")
            navBullets.classList.add("hidden")
            localStorage.setItem("localState", "hidden")
        }
        addActiveClass(e)

    })
})

// Reset Button
document.querySelector(".setting-box .reset").onclick = function () {
    localStorage.setItem("localState", "show");
    localStorage.setItem("background-option", "true");
    localStorage.removeItem("color-option");

    window.location.reload();
}



// Toggle Menu

let toggleMenu = document.querySelector(".menu-container")
let links = document.querySelector(".links")


toggleMenu.onclick = function () {

    this.classList.toggle("active-menu")

    links.classList.toggle("open")

}


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        toggleMenu.classList.remove("active-menu")

        links.classList.remove("open")
    }
})


document.addEventListener("click", (e) => {
    if (!toggleMenu.contains(e.target) && !links.contains(e.target)) {
        toggleMenu.classList.remove("active-menu")

        links.classList.remove("open")
    }
})

links.onclick = function (e) {
    e.stopPropagation()
}

