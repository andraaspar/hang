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

interface RIFFWAVE {
	constructor(data?: Array<number>);
	header: RIFFWAVEHeader;
	/**
	 * Array containing audio samples
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

	Make(data?: Array<number>): void;
}