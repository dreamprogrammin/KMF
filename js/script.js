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

//Burger animation and burger script
//Переменные для связки DOM элементов
const actionBurger = document.querySelector('.action__burger'),
	burgerMenu = document.querySelector('.burger__menu'),
	headerPoppup = document.querySelector('.header__poppup'),
	navTopWrapper = document.querySelector('.header__top'),
	headerBurgerTop = document.querySelector('.header__poppup-top'),
	headerListMenuItems = document.querySelector('#list__menu').cloneNode(1),
	buttonParent = actionBurger.parentElement
//Функция для иницилизации анимации бургер меню
const initBurgerMenu = () => {
	burgerMenu.classList.toggle('active')
	headerPoppup.classList.toggle('active')
	renderMenuBurger()
}

//Функция для копирование верхнего меню в бургер меню
function renderMenuBurger() {
	headerPoppup.appendChild(headerListMenuItems)
	const mi = document.querySelectorAll('#list__menu li a')
	return mi.forEach((element, index) => {
		element.setAttribute('data-lang', 'nav-menu-' + index)
		changeLang()
	})
}
//Функция для переноса кнопки
function moveButton() {
	headerBurgerTop.appendChild(actionBurger)
	//Обратный вызов функции для возврата кнопки в прежднее место
	actionBurger.onclick = returnButton
}
//Функция для переноса кнопки в бургер меню
function returnButton() {
	buttonParent.appendChild(actionBurger)
	//Обратный вызов функции для переноса кнопки
	actionBurger.onclick = moveButton
}
//Клик по кнопки и вызов функции
actionBurger.onclick = moveButton
//Обраточки событиий функции
actionBurger.addEventListener('click', initBurgerMenu)

//скрипт для поиска
const searchInput = document.querySelector('.search__input'),
	searchResult = document.querySelector('.search__result-list'),
	allLangs = ['ru', 'kz', 'en']
//Переменная для хранения языков
let currentLang = localStorage.getItem('language') || checkLang() || 'ru'
//Пустой массив для отправку данных
const dataResults = []
//url Хранилище данных для поиска
const dataApi = `
https://gist.githubusercontent.com/dreamprogrammin/86058002b04bede9f0c80f50a9be0683/raw/
f66468ef0831392454196a2369dd7a3b5b3e9da1/data.json
`
//Запрос get данных на сервер
const getData = async url => {
	try {
		const response = await fetch(url),
			data = await response.json()
		return data
	} catch (err) {
		console.log('не удость подлючится к серверу')
	}
}

//Фильтрация данных по языку сайта
getData(dataApi).then(data => {
	const filterData = data.filter(item =>
		item.lang === currentLang ? true : false
	)

	return dataResults.push(...filterData)
})

//Поиск совпадений тескста в отфильтрованном массиве
const matchesData = (word, array) => {
	return array.filter(item => {
		const regexp = new RegExp(word, 'gi')

		return item.name.match(regexp)
	})
}
//Получения данных и вывод на страницу
function dysplayResult() {
	const options = matchesData(this.value, dataResults)

	const html = options
		.map(item => {
			const regexp = new RegExp(this.value, 'gi')
			const repName = item.name.replace(
				regexp,
				`<span class="hl">${this.value}</span>`
			)
			return `<li class="search__result-item">
			<a class="search__result-link">${repName}</a>
			</li>`
		})
		.join('')
	console.log(options.length)
	return (searchResult.innerHTML = this.value
		? checkDataLangResult(options) + html
		: null)
}
//Функция для вывода количества найденых результатов
function checkDataLangResult(array) {
	//Обьект для разметки
	const resultLang = [
		{ name: `Найдено ${array.length} результата поиска`, lang: 'ru' },
		{ name: `${array.length} іздеу нәтижесі табылды`, lang: 'kz' },
		{ name: `${array.length} search results found`, lang: 'en' },
	]
	//Фильтрация по языку
	const filterResultLang = resultLang.filter(item =>
		item.lang === currentLang ? true : false
	)
	//Разметка для вывода в HTML страницу
	const getDataResultLang = filterResultLang.map(item => {
		return `<li class="search__result-item">
		<p class="result__item-data">${item.name}</p>
		</li>`
	})

	return getDataResultLang
}
//Слушатели
searchInput.addEventListener('change', dysplayResult)
searchInput.addEventListener('keyup', dysplayResult)
//Скрипт для мультизачности сайта

const languageBtn = document.querySelector('.language__button'),
	languageItems = document.querySelectorAll('[data-btn]'),
	windowLocation = window.location.pathname

let currentText = {}

const homeLang = {
	'title-lang': {
		ru: 'KMF - Финансы',
		kz: 'KMF - Демеу',
		en: 'KMF - Finance',
	},
	'nav-menu-0': {
		ru: 'Пройти тест',
		kz: 'Тест тапсырыңыз',
		en: 'Take the test',
	},
	'nav-menu-1': {
		ru: 'Подать заявку на тренинг',
		kz: 'Оқуға өтініш беріңіз',
		en: 'Apply for training',
	},
	'nav-menu-2': {
		ru: 'Пройти тест',
		kz: 'Тест тапсырыңыз',
		en: 'Take the test',
	},
	'nav-menu-3': {
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
		location.reload()
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
