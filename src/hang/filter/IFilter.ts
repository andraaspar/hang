module hang.filter {
	export interface IFilter {
		filter(source: Array<number>): Array<number>;
	}
}