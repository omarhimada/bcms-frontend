export class Configuration {
	id: string;

	siteName: string;
	siteDescription: string;
	siteKeywords: string;

	favicon: MetaImage;
	appleTouchIcon: MetaImage;
	manifestJson: string;

    logoHtml: string;
    primaryColor: Color;
    accentColor: Color;
    footerContent: FooterContent;
    physicalAddress: string;
    contactEmail: string;
    contactPhoneNumber: string;
    facebookLink: string;
	instagramLink: string;
	
	constructor(
		id: string, 

		siteName: string,
		siteDescription: string,
		siteKeywords: string,

		favicon: MetaImage,
		appleTouchIcon: MetaImage,
		manifestJson: string,

		logoHtml: string,
		primaryColor: Color, 
		accentColor: Color, 
		footerContent: FooterContent, 
		physicalAddress: string, 
		contactEmail: string, 
		contactPhoneNumber: string, 
		facebookLink: string, 
		instagramLink: string) {

		this.id = id;

		this.siteName = siteName;
		this.siteDescription = siteDescription;
		this.siteKeywords = siteKeywords;

		this.favicon = favicon;
		this.appleTouchIcon = appleTouchIcon;
		this.manifestJson = manifestJson;

		this.logoHtml = logoHtml;
		this.primaryColor = primaryColor;
		this.accentColor = accentColor;
		this.footerContent = footerContent;
		this.physicalAddress = physicalAddress;
		this.contactEmail = contactEmail;
		this.contactPhoneNumber = contactPhoneNumber;
		this.facebookLink = facebookLink;
		this.instagramLink = instagramLink;
	}
}

export class Color {
	hex: string;

	constructor(hex: string) {
		this.hex = hex;
	}
}

export class MetaImage {
	url: string;

	constructor(url: string) {
		this.url = url;
	}
}

export class FooterContent {
	html: string;
	
	constructor(html: string) {
		this.html = html;
	}
}