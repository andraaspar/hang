module pirsound.wave {
	export interface IWave {
		render(time: number): number;
	}
}