// Team member has a name, a rich-text blurb (e.g.: title, responsibilities, etc.), and a profile image
export class TeamMember {
	name: string;

	blurb: Blurb;

	profileImage: ProfileImage;

	constructor(name: string, blurb: Blurb, profileImage: ProfileImage) {
	  this.name = name;
	  this.blurb = blurb;
	  this.profileImage = profileImage;
	}
}

// Blurb has HTML
export class Blurb {
	html: string;

	constructor(html: string) {
	  this.html = html;
	}
}

// Profile image has a URL and a width
export class ProfileImage {
	url: string;

	width: number;

	constructor(url: string, width: number) {
	  this.url = url;
	  this.width = width;
	}
}
