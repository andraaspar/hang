module pirsound {
	export interface IWave {
		render(time: number): number;
	}
}