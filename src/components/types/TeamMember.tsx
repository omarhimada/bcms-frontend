// Team member has a name, description (e.g.: title, responsibilities, etc.), and a profile image
export class TeamMember {
	name: string;
	description: string;
	profileImage: ProfileImage;

	constructor(name: string, description: string, profileImage: ProfileImage) {
		this.name = name;
		this.description = description;
		this.profileImage = profileImage;
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