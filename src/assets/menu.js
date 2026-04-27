const menuButton = document.querySelector('button[aria-label="Menu"]')
const menuOpenIcon = document.querySelector(".menu-open-icon")
const menuCloseIcon = document.querySelector(".menu-close-icon")
const nav = document.querySelector("nav ul")
const navLinks = document.querySelectorAll("nav ul a")

menuButton.addEventListener("click", () => {
   nav.classList.toggle("mobile-menu--open")
   nav.classList.toggle("mobile-menu--closed")
   menuOpenIcon.classList.toggle("hidden")
   menuCloseIcon.classList.toggle("hidden")
   document.querySelector("html").classList.toggle("overflow-hidden")
})

navLinks.forEach(link => {
   link.addEventListener("click", () => {
      nav.classList.remove("mobile-menu--open")
      nav.classList.add("mobile-menu--closed")
      menuOpenIcon.classList.remove("hidden")
      menuCloseIcon.classList.add("hidden")
      document.querySelector("html").classList.remove("overflow-hidden")
   })
})

window.addEventListener("resize", () => {
   if (window.innerWidth >= 768) {
      nav.classList.remove("mobile-menu--open")
      nav.classList.add("mobile-menu--closed")
      menuOpenIcon.classList.remove("hidden")
      menuCloseIcon.classList.add("hidden")
      document.querySelector("html").classList.remove("overflow-hidden")
   }
})
