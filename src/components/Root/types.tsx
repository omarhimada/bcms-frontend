export class Configuration {
	id: string;
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

export class FooterContent {
	html: string;
	
	constructor(html: string) {
		this.html = html;
	}
}