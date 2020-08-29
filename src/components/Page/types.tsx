export class ContentPage {
  id: string;
  title: string;

  /**
   * Hero/heading text
   */
  heading: string;

  /**
   * Multi-line: each line is "text,URL" -
   * button(s) will be rendered next to the header of the
   * page with the text and URL
   */
  headerActions: string;

  content: Content;

  /**
   * * ENUMERATION:
   * Dynamic content to load into this page
   * Possible values: 
   *  FAQs
   *  Gallery
   *  InstagramFeed
   *  Services
   *  TeamMembers
   *  None
   */
  dynamicContent: string;

  carouselImages: CarouselImage[];

  /**
   * Carousel CTA button's text
   */
  carouselCtaText: string;

  /**
   * Carousel CTA button's link/URL
   */
  carouselCtaLink: string;

  constructor(
    id: string,
    title: string,
    heading: string,
    headerActions: string,
    content: Content,
    dynamicContent: string,
    carouselImages: CarouselImage[],
    carouselCtaText: string,
    carouselCtaLink: string
  ) {
    this.id = id;
    this.title = title;
    this.heading = heading;
    this.headerActions = headerActions;
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
  height: number;
  id: string;

  constructor(url: string, height: number, id: string) {
    this.url = url;
    this.height = height;
    this.id = id;
  }
}
