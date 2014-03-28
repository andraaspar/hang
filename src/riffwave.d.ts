interface RIFFWAVEHeader {
	/**
	 * 1 or 2, default is 1.
	 */
	numChannels: number;
	/**
	 * Default is 8000, you may want 44100.
	 */
	sampleRate: number;
	/**
	 * Default is 8, you may want 16.
	 */
	bitsPerSample: number;
}

declare class RIFFWAVE {
	/**
	 * 8 bit data is unsigned: 0..255
	 * 16 bit data is signed: −32,768..32,767
	 */
	constructor(data?: Array<number>);
	header: RIFFWAVEHeader;
	/**
	 * Array containing audio samples
	 * 8 bit data is unsigned: 0..255
	 * 16 bit data is signed: −32,768..32,767
	 */
	data: Array<number>;
	/**
	 * Array containing the generated wave file
	 */
	wav: Array<number>;
	/**
	 * http://en.wikipedia.org/wiki/Data_URI_scheme
	 */
	dataURI: string;

	/**
	 * 8 bit data is unsigned: 0..255
	 * 16 bit data is signed: −32,768..32,767
	 */
	Make(data?: Array<number>): void;
}