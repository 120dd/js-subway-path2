import { DOM } from './utils/dom.js';

const SELECTORS = {
	APP: 'app',
	MAIN: 'main',
	DEPARTURE_STATION_NAME_INPUT: 'departure-station-name-input',
	ARRIVAL_STATION_NAME_INPUT: 'arrival-station-name-input',
	SEARCH_TYPE: 'search-type',
	SEARCH_BUTTON: 'search-button',
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
    <div></div>
    `,
};

export class View {
	constructor() {
		this.renderInit();
		this.registerSearchButtonEvent();
	}

	renderInit() {
		DOM(SELECTORS.APP).insertAdjacentHTML('beforeend', TEMPLATES.TITLE);
		DOM(SELECTORS.APP).insertAdjacentHTML('beforeend', TEMPLATES.MAIN);
		this.renderForm();
	}

	renderForm() {
		DOM(SELECTORS.MAIN).insertAdjacentHTML('beforeend', TEMPLATES.PATH_SECTION);
	}

	registerSearchButtonEvent() {
		DOM(SELECTORS.SEARCH_BUTTON).addEventListener('click', e => {
			e.preventDefault();
			const type = this.getType();
			const start = DOM(SELECTORS.DEPARTURE_STATION_NAME_INPUT).value;
			const end = DOM(SELECTORS.ARRIVAL_STATION_NAME_INPUT).value;
			console.log(start, end, type);
		});
	}

	getType() {
		return document.querySelector(`input[name=${SELECTORS.SEARCH_TYPE}]:checked`).value;
	}
}
