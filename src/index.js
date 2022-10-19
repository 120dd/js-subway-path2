import { View } from './view/view.js';
import { SubwayPather } from './subwayPather.js';
import { stations } from './data.js';

class App {
	constructor() {
		this.view = new View();
		this.subwayPather = new SubwayPather();
		this.view.registerSearchButtonEvent(this.requestSearchResult);
	}

	requestSearchResult = searchInfo => {
		if (this.validSearchInfo(searchInfo) || this.validStation(searchInfo)) {
			return;
		}
		const result = this.subwayPather.getResult(searchInfo);
		this.view.renderResult(result);
	};

	validSearchInfo({ start, end, type }) {
		if (start.length < 2 || end.length < 2) {
			this.view.alert('역 이름은 한 글자 이상이어야합니다');
			return true;
		}
		if (start === end) {
			this.view.alert('같은 역을 사용할 수 없습니다');
			return true;
		}
		if (!type) {
			this.view.alert('길찾기 타입을 선택해주세요');
			return true;
		}
		return false;
	}

	validStation({ start, end }) {
		if (!this.checkStationName(start) || !this.checkStationName(end)) {
			this.view.alert('없는 역 입니다');
			return true;
		}
	}

	checkStationName(name) {
		if (stations.find(v => v.start === name) || stations.find(v => v.end === name)) {
			return true;
		}
	}
}

new App();
