import { View } from './view/view.js';
import { SubwayPather } from './subwayPather.js';

class App {
	constructor() {
		this.view = new View();
		this.subwayPather = new SubwayPather();
		this.view.registerSearchButtonEvent(this.requestSearchResult);
	}

	requestSearchResult = (start, end, type) => {
		const result = this.subwayPather.getResult(start, end);
		this.view.renderResult(result);
	};
}

new App();
