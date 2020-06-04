import knex from '../database/connection';

interface Request {
	city: string;
	uf: string;
	items: number[];
}

class ListPointsByFilterService {
	public async execute({ city, uf, items }: Request) {
		const parsedItems = String(items)
			.split(',')
			.map(item => Number(item.trim()));
		
		const points = await knex('points')
			.join('point_items', 'points.id', '=', 'point_items.point_id')
			.whereIn('point_items.item_id', parsedItems)
			.where('city', String(city))
			.where('uf', String(uf))
			.distinct()
			.select('points.*')

		return points
	}
};

export default ListPointsByFilterService; 