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
const progressSection = document.querySelector(".most-sales-section");
const spanProgress = Array.from(document.querySelectorAll(".sales-progress span"));

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


// popup img

let popupImg = document.querySelectorAll(".gallery div img");

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

        
        
    

    overlay.addEventListener("click", () => {
        removePopup()
    })
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


function addActiveClass(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((elment) => {
        elment.classList.remove("active")
    })

    ev.target.classList.add("active")
}

// Change Background
let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

let backgroundOption = true;

let changeInterval;

function changeBackground() {
    if (backgroundOption === true) {
        changeInterval = setInterval(() => {
            let random = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.cssText = `background-image: url('imgs/${imgsArray[random]}')`;
        }, 5000);
    }
}

// Call the function to start changing the background
changeBackground();


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


// Scroll Header
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header")
    header.classList.toggle("active", scrollY > 0)
})



// Scroll Section
const gallery = document.querySelector(".gallery")
const nextButtn = document.querySelector("#nextbtn")
const backButtn = document.querySelector("#backbtn")


gallery.addEventListener("wheel", (e) => {
    e.preventDefault()
    gallery.scrollLeft += e.deltaY
    gallery.style.scrollBehavior = "auto"
})


nextButtn.addEventListener("click", () => {
    gallery.style.scrollBehavior = "smooth"
    gallery.scrollLeft += 900;
})

backButtn.addEventListener("click", () => {
    gallery.style.scrollBehavior = "smooth"
    gallery.scrollLeft -= 900;
})



    let sections = document.querySelectorAll(".section");
    let headerLinksA = document.querySelectorAll(".header a");

    window.addEventListener("scroll", () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset - 100 && top < offset + height) {
        headerLinksA.forEach((a) => {
            a.classList.remove("active");
            document
            .querySelector(".header a[href*=" + id + "]")
            .classList.add("active");
        });
        }
    });
    });


    // Scroll To UP

    const upIcon = document.querySelector(".up-icon")

    window.addEventListener("scroll", (e) => {
        if (scrollY >= 400) {
            upIcon.classList.add("show")
        } else {
            upIcon.classList.remove("show")
        }
    })


    upIcon.addEventListener("click", () => {
        scrollTo({top: 0, behavior: "smooth"})
    })


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("move");
            } else {
                entry.target.classList.remove("move");
            }
        });
    });
    
    let sections2 = document.querySelectorAll(".hidden");
    sections2.forEach((section) => observer.observe(section));
    