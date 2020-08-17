export class Page {
	id: string;
	content: PageContent;
	dynamicContent: string;
	carouselImages: CarouselImage[];

	constructor(id: string, pageContent: PageContent, dynamicContent: string, carouselImages: CarouselImage[]) {
		this.id = id;
		this.content = pageContent;
		this.dynamicContent = dynamicContent;
		this.carouselImages = carouselImages;
	}
}

export class PageContent {
	html: string;

	constructor(html: string) {
		this.html = html;
	}
}

export class CarouselImage {
	url: string;

	constructor(url: string) {
		this.url = url;
	}
}