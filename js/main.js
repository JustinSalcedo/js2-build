const NAV_BAR_HEIGHT = 88

const heading1 = document.querySelector('h1')
heading1.addEventListener("click", scrollToTop)

const burgerBtn = document.querySelector('button.nav-burger')
burgerBtn.addEventListener("click", toggleSideNavbar)

const homeBtn = document.getElementById('go-home')
homeBtn.addEventListener("click", goHome)

const blackout = document.querySelector('.blackout')
blackout.addEventListener("click", toggleSideNavbar)

const sideNavbar = document.querySelector('nav.nav-content')

// addEventListener("scroll", () => console.log('scrolling'))

function goHome() {
    scrollToTop()
    toggleSideNavbar()
}

function scrollToTop() {
    window.scroll(0, 0)
}

function toggleSideNavbar() {
    const { display } = sideNavbar.style

    if (!display || display === "none") {
        sideNavbar.style.display = "initial"
        deactivateScrolling()
        blackout.classList.replace('off', 'on')
        enableTabletSide()
    }

    if (display === "initial") {
        sideNavbar.style.display = "none"
        activateScrolling()
        blackout.classList.replace('on', 'off')
        disableTableSide()
    }
}

function deactivateScrolling() {
    if (window.innerWidth < 561) {
        document.body.style.height = "100%"
        document.body.style.overflow = "hidden"
    }
}

function activateScrolling() {
    document.body.style = {}
}

function enableTabletSide() {
    if (window.innerWidth > 767) {
        document.body.classList.add("double-view")

    }
}

function disableTableSide() {
    document.body.classList.remove("double-view")
}

const themeBtns = document.querySelectorAll('.switch-theme')
Array.from(themeBtns).forEach(themeBtn => {
    themeBtn.addEventListener("click", switchDarkTheme)
})

function switchDarkTheme() {
    const { classList } = document.body
    
    if (!classList.contains("dark-theme")) {
        document.body.classList.add("dark-theme")
        addWhiteIcons()
        Array.from(themeBtns).forEach(themeBtn => {
            themeBtn.innerHTML = "☀️"
        })
    } else {
        document.body.classList.remove("dark-theme")
        addInitialIcons()
        Array.from(themeBtns).forEach(themeBtn => {
            themeBtn.innerHTML = "🌙"
        })
    }
}

function addWhiteIcons() {
    const iconsList = document.querySelectorAll('.nav-footer .social-links img, .contact-info.alt-lyt .social-links img')
    Array.from(iconsList).forEach(iconElement => {
        const originalSrc = iconElement.getAttribute('src')
        const newSrc = originalSrc.replace('.', '-white.')
        iconElement.setAttribute('src', newSrc)
    })
}

function addInitialIcons() {
    const iconsList = document.querySelectorAll('.nav-footer .social-links img, .contact-info.alt-lyt .social-links img')
    Array.from(iconsList).forEach(iconElement => {
        const originalSrc = iconElement.getAttribute('src')
        const newSrc = originalSrc.replace('-white.', '.')
        iconElement.setAttribute('src', newSrc)
    })
}

// Throttling scroll event

class ScrollingRegister {
    constructor() {
        this.lastScrollY = 0
        this.scrollDirection = null
    }

    setScrollY(scrollYPos) {
        this.lastScrollY = scrollYPos
    }

    getScrollY() {
        return lastScrollY
    }

    defineScrollDirection(scrollYPos) {
        if (scrollYPos > this.lastScrollY) {
            this.setDirection("down")
        }

        if (scrollYPos < this.lastScrollY) {
            this.setDirection("up")
        }

        this.setScrollY(scrollYPos)
    }

    setDirection(scrollDirection) {
        if (this.scrollDirection !== scrollDirection) {
            this.scrollDirection = scrollDirection

            if (this.scrollDirection === "up") {
                showNavbar()
            }

            if (this.scrollDirection === "down") {
                hideNavbar()
            }
        }
    }
}

const scrollingRegister = new ScrollingRegister()

let ticking = false

document.addEventListener("scroll", () => {
    if (window.innerWidth < 1024) {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                scrollingRegister.defineScrollDirection(window.scrollY)
                ticking = false
            })
        }
    
        ticking = true
    }
})

const navBar = document.querySelector('.nav-bar')

function showNavbar() {
    navBar.style.visibility = "visible"
}

function hideNavbar() {
    const { display } = sideNavbar.style

    if (!display || display === "none") {
        navBar.style.visibility = "hidden"
    }
}

// Intercept anchor links

const portfolioAnchorLink = document.querySelector(".nav-content a[href='index.html#portfolio']")
portfolioAnchorLink.addEventListener("click", navInnerLink)

function navInnerLink(e) {
    e.preventDefault()
    window.location.href = e.target.getAttribute("href")

    if (window.innerWidth < 560) {
        toggleSideNavbar()
    } else {
        window.scroll(0, window.scrollY - NAV_BAR_HEIGHT)
    }
}

// Setup page view when HTML content has loaded

document.addEventListener('DOMContentLoaded', setupView)

function setupView() {
    const firstJobRoles = document.querySelectorAll(".work-desc ul li:nth-child(1) details")
    Array.from(firstJobRoles).forEach(jobRole => jobRole.setAttribute("open", ""))

    let firstProjDesc = []
    if (window.innerWidth > 767) {
        firstProjDesc = Array.from(document.querySelectorAll(".proj-desc details")).slice(0, 2)
    } else {
        firstProjDesc = [ document.querySelector(".proj-desc details") ]
    }

    firstProjDesc.forEach(projDesc => projDesc.setAttribute("open", ""))
}