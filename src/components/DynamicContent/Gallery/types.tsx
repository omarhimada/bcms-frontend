export class Gallery {
	title: string;
	images: Image[];

	constructor(title: string, images: Image[]) {
		this.title = title;
		this.images = images;
	}
}

export class Image {
	handle: string;
	width: number;
	height: number;

	constructor(handle: string, width: number, height: number) {
		this.handle = handle;
		this.width = width;
		this.height = height;
	}
}