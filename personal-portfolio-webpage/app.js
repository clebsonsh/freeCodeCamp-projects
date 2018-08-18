
let nav = document.getElementById('navbar')
let sticky = nav.offsetTop

window.onscroll = () => {
  window.pageYOffset >= sticky
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky')
}
