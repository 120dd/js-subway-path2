import Dijkstra from './utils/Dijkstra.js';
import { SEARCH_TYPES } from './constants.js';
import { stations } from './data.js';

export class SubwayPather {
	constructor() {
		this.dijkstra = new Dijkstra();
		this.dijkstraByTime = new Dijkstra();
		this.stationData = stations;
		this.addEdges();
	}

	addEdges() {
		this.addEdgeByDistance();
		this.addEdgeByTime();
	}

	addEdgeByDistance() {
		this.stationData.forEach(station => {
			this.dijkstra.addEdge(station.start, station.end, station.distance);
		});
	}

	addEdgeByTime() {
		this.stationData.forEach(station => {
			this.dijkstraByTime.addEdge(station.start, station.end, station.time);
		});
	}

	getResult({ start, end, type }) {
		let result = this.dijkstra.findShortestPath(start, end);
		if (type === SEARCH_TYPES.TIME) {
			result = this.dijkstraByTime.findShortestPath(start, end);
		}
		const route = result.join('→');
		const { distance, time } = this.getResultInfo(result);
		return { distance, time, route };
	}

	getResultInfo(result) {
		const resultInfo = { distance: 0, time: 0 };
		result.forEach((station, idx) => {
			const edgeData = this.stationData.find(
				v =>
					(v.start === station && v.end === result[idx + 1]) ||
					(v.end === station && v.start === result[idx + 1]),
			);
			if (edgeData) {
				resultInfo.distance += edgeData.distance;
				resultInfo.time += edgeData.time;
			}
		});
		return resultInfo;
	}
}
