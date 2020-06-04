import knex from '../database/connection';

interface Request {
	id: number;
}

class ShowOnlyPointService {
	public async execute({ id }: Request) {
		const point = await knex('points').where('id', id).first();

		console.log(point);

		if(!point) {
			throw new Error("Point not found")
		}

		const items = await knex('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)

		return {
			...point,
			items
		};
	}
};

export default ShowOnlyPointService; 