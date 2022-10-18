import { DOM } from '../utils/dom.js';

const SELECTORS = {
	APP: 'app',
	MAIN: 'main',
	DEPARTURE_STATION_NAME_INPUT: 'departure-station-name-input',
	ARRIVAL_STATION_NAME_INPUT: 'arrival-station-name-input',
	SEARCH_TYPE: 'search-type',
	SEARCH_BUTTON: 'search-button',
	RESULT_SECTION: 'result-section',
};

const SEARCH_TYPES = {
	DISTANCE: 'distance',
	TIME: 'time',
};

const TEMPLATES = {
	TITLE: `<h1>🚇지하철 길찾기</h1>`,
	MAIN: `<main id=${SELECTORS.MAIN}></main>`,
	PATH_SECTION: `
    <form>
    <label>출발역</label>
    <input type="text" id=${SELECTORS.DEPARTURE_STATION_NAME_INPUT}>
    <br/>
    <br/>
    <label>도착역</label>
    <input type="text" id=${SELECTORS.ARRIVAL_STATION_NAME_INPUT}>
    <br/>
    <br/>
    <input type="radio" value=${SEARCH_TYPES.DISTANCE} name=${SELECTORS.SEARCH_TYPE}>
    <label for="">최단거리</label>
    <input type="radio" value=${SEARCH_TYPES.TIME} name=${SELECTORS.SEARCH_TYPE}>
    <label for="">최소시간</label>
    <br/>
    <br/>
    <button id=${SELECTORS.SEARCH_BUTTON}>길 찾기</button>
    </form>
    <section id=${SELECTORS.RESULT_SECTION}></section>
    `,
	RESULT_SECTION: ({ distance, time, route }) => `
	<h1>결과</h1>
	<table border="1">
	<tr>
	<td>총 거리</td>
	<td>총 소요시간</td>
	</tr>
	<tr>
	<td>${distance} km</td>
	<td>${time} 분</td>
	</tr>
	<tr>
	<td colspan="2">${route}</td>
	</tr>
	</table>
	`,
};

export class View {
	constructor() {
		this.renderInit();
	}

	renderInit() {
		DOM(SELECTORS.APP).insertAdjacentHTML('beforeend', TEMPLATES.TITLE);
		DOM(SELECTORS.APP).insertAdjacentHTML('beforeend', TEMPLATES.MAIN);
		this.renderForm();
	}

	renderForm() {
		DOM(SELECTORS.MAIN).insertAdjacentHTML('beforeend', TEMPLATES.PATH_SECTION);
	}

	renderResult(result) {
		DOM(SELECTORS.RESULT_SECTION).innerHTML = TEMPLATES.RESULT_SECTION(result);
	}

	registerSearchButtonEvent(searchFn) {
		DOM(SELECTORS.SEARCH_BUTTON).addEventListener('click', e => {
			e.preventDefault();
			const type = this.getType();
			const start = DOM(SELECTORS.DEPARTURE_STATION_NAME_INPUT).value;
			const end = DOM(SELECTORS.ARRIVAL_STATION_NAME_INPUT).value;
			searchFn(start, end, type);
		});
	}

	getType() {
		return document.querySelector(`input[name=${SELECTORS.SEARCH_TYPE}]:checked`).value;
	}
}
