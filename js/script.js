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

//скрипт для поиска 
const searchInput = document.querySelector('.search__input'),
      searchResult = document.querySelector('.search__result-list')


const api = `
https://gist.githubusercontent.com/dreamprogrammin/
6fd488a88223921fccb0d0ec2e464e74/raw/61f96a1576f25eb3d393aa035b1f7b114946367c/data-kmf.json`

const dataResults = []

fetch(api)
.then(res => res.json()
.then(data => data.forEach(result => dataResults.push(result)))
)

function getResult (word, dataResults) {
    return dataResults.filter(s=> {
        const regex = new RegExp(word, 'gi')

        return s.name.match(regex)
    })
}


function displayResults () {

    const dataResult = data => `<li class="search__result-item"><p class="result__item-data">${data}</p></li>`
    
    const results = getResult(this.value, dataResults)

    const html = results.map(s=> {

        const regex = new RegExp(this.value, 'gi')
        const resultsName = s.name.replace(regex,`<strong class="font__weight">${this.value}</strong>`)

        return `
        <li class="search__result-item">${resultsName}</li>
        `
    }).join('')

    searchResult.innerHTML = !this.value == '' ? dataResult(`Найдено ${results.length} результата поиска`) + html : ''
}

searchInput.addEventListener('change', displayResults)
searchInput.addEventListener('keyup', displayResults)