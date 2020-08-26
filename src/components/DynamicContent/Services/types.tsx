// Service category has many services and a title
export class ServiceCategory {
	title: string;

	services: Service[];

	constructor(title: string, services: Service[]) {
	  this.title = title;
	  this.services = services;
	}
}

// Service has a name, price, 'per' (e.g.: per unit), and whether or not its on sale
export class Service {
	name: string;

	price: number;

	per: string;

	onSale: boolean;

	constructor(name: string, price: number, per: string, onSale: boolean) {
	  this.name = name;
	  this.price = price;
	  this.per = per;
	  this.onSale = onSale;
	}
}
