export class ProductModel {
	_id: string;
	image: string;
	title: string;
	price: number;
	oldProce: number;
	credit: number;
	calculatedRating: number;
	descrption: string;
	advantages: string;
	disAdvantages: string;
	categories: string[];
	tags: string;
	characteristics: { [key: string]: string };
}
