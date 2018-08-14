let menuToggle = document.querySelector('.menu-toggle')
let navWrapper = document.querySelector('.nav-wrapper')

menuToggle.addEventListener('click', () => {
  navWrapper.classList.toggle('show-menu')
})
