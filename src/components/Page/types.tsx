export class ContentPage {
	id: string;

	title: string;

	content: Content;

	dynamicContent: string;

	carouselImages: CarouselImage[];

	carouselCtaText: string;

	carouselCtaLink: string;

	constructor(
	  id: string,
	  title: string,
	  content: Content,
	  dynamicContent: string,
	  carouselImages: CarouselImage[],
	  carouselCtaText: string,
	  carouselCtaLink: string,
	) {
	  this.id = id;
	  this.title = title;
	  this.content = content;
	  this.dynamicContent = dynamicContent;
	  this.carouselImages = carouselImages;
	  this.carouselCtaText = carouselCtaText;
	  this.carouselCtaLink = carouselCtaLink;
	}
}

export class Content {
	html: string;

	constructor(html: string) {
	  this.html = html;
	}
}

export class CarouselImage {
	url: string;

	id: string;

	constructor(url: string, id: string) {
	  this.url = url;
	  this.id = id;
	}
}
