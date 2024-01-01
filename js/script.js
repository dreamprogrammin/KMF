const btnSearch = document.querySelector('.search__box-button'),
      searchContainer = document.querySelector('.search__container'),
      seacrgBtnInput = document.querySelector('.search__button-input')

btnSearch.addEventListener('click', e => {
    e.preventDefault()
    searchContainer.classList.add('active')
})
seacrgBtnInput.addEventListener('click', () => {
    if(searchContainer.classList.contains('active')){
        searchContainer.classList.remove('active')
    }
})

//Burger animation

const actionBurger = document.querySelector('.action__burger'),
      burgerMenu = document.querySelector('.burger__menu')
      


actionBurger.addEventListener('click', () => burgerMenu.classList.toggle('active'))