import Dijkstra from './utils/Dijkstra.js';

const stations = [
	{ start: '교대', end: '강남', distance: 2, time: 3 },
	{ start: '강남', end: '역삼', distance: 2, time: 3 },
];

export class SubwayPather {
	constructor() {
		this.dijkstra = new Dijkstra();
		this.stationData = stations;
		this.addEdgeByDistance();
	}

	addEdgeByDistance() {
		this.stationData.forEach(station => {
			this.dijkstra.addEdge(station.start, station.end, station.distance);
		});
	}

	getResult(start, end) {
		const result = this.dijkstra.findShortestPath(start, end);
		const route = result.join('→');
		let distance = 0;
		let time = 0;
		result.forEach((station, idx) => {
			const edgeData = this.stationData.find(
				v =>
					(v.start === station && v.end === result[idx + 1]) ||
					(v.end === station && v.start === result[idx + 1]),
			);
			if (edgeData) {
				distance += edgeData.distance;
				time += edgeData.time;
			}
		});
		return { distance, time, route };
	}
}
