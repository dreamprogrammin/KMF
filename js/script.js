const btnSearch = document.querySelector('.search__box-button'),
	searchContainer = document.querySelector('.search__container'),
	seacrgBtnInput = document.querySelector('.search__button-input')

btnSearch.addEventListener('click', e => {
	e.preventDefault()
	searchContainer.classList.add('active')
})
seacrgBtnInput.addEventListener('click', () => {
	if (searchContainer.classList.contains('active')) {
		searchContainer.classList.remove('active')
	}
})

//Burger animation

const actionBurger = document.querySelector('.action__burger'),
	burgerMenu = document.querySelector('.burger__menu')

actionBurger.addEventListener('click', () =>
	burgerMenu.classList.toggle('active')
)

//скрипт для поиска
const searchInput = document.querySelector('.search__input'),
	searchResult = document.querySelector('.search__result-list')

const api = `
https://gist.githubusercontent.com/dreamprogrammin/
6fd488a88223921fccb0d0ec2e464e74/raw/61f96a1576f25eb3d393aa035b1f7b114946367c/data-kmf.json`

const dataResults = []

fetch(api).then(res =>
	res.json().then(data => data.forEach(result => dataResults.push(result)))
)

console.log(dataResults)

function getResult(word, dataResults) {
	return dataResults.filter(s => {
		const regex = new RegExp(word, 'gi')

		return s.name.match(regex)
	})
}

function displayResults() {
	const dataResult = data =>
		`<li class="search__result-item"><p class="result__item-data">${data}</p></li>`

	const results = getResult(this.value, dataResults)

	const html = results
		.map(s => {
			const regex = new RegExp(this.value, 'gi')
			const resultsName = s.name.replace(
				regex,
				`<strong class="font__weight">${this.value}</strong>`
			)

			return `<li class="search__result-item"><a class="search__result-link" href="#">${resultsName}</a></li>`
		})
		.join('')

	if (!results.length == 0 && !this.value == '') {
		searchResult.innerHTML =
			dataResult(`Найдено ${results.length} результата поиска`) + html
	} else {
		searchResult.innerHTML = dataResult('ничего не найдено') + ''
	}
}

searchInput.addEventListener('change', displayResults)
searchInput.addEventListener('keyup', displayResults)

//Скрипт для мультизачности сайта

const languageBtn = document.querySelector('.language__button'),
	languageItems = document.querySelectorAll('[data-btn]'),
	allLangs = ['ru', 'kz', 'en'],
	windowLocation = window.location.pathname

let currentText = {},
	currentLang = localStorage.getItem('language') || checkBrowserLang() || 'ru'

const homeLang = {
	'title-lang': {
		ru: 'KMF - Финансы',
		kz: 'KMF - Демеу',
		en: 'KMF - Finance',
	},
	'nav-menu-1': {
		ru: 'Пройти тест',
		kz: 'Тест тапсырыңыз',
		en: 'Take the test',
	},
	'nav-menu-2': {
		ru: 'Подать заявку на тренинг',
		kz: 'Оқуға өтініш беріңіз',
		en: 'Apply for training',
	},
}

function checkPage() {
	switch (windowLocation) {
		case '/index.html':
			currentText = homeLang
			break

		default:
			currentText = homeLang
			break
	}
}

checkPage()

function changeLang() {
	for (const key in currentText) {
		let elem = document.querySelector(`[data-lang = ${key}]`)
		if (elem) {
			elem.textContent = currentText[key][currentLang]
		}
	}
}

changeLang()

const lngContent = () => (languageBtn.textContent = currentLang.toUpperCase())

lngContent()

languageItems.forEach(btn =>
	btn.addEventListener('click', () => {
		currentLang = btn.dataset.btn
		localStorage.setItem('language', btn.dataset.btn)
		lngContent()
		changeLang()
	})
)
function checkLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase()
	const result = allLangs.some(elem => {
		return elem === navLang
	})
	if (result) {
		return navLang
	}
}
