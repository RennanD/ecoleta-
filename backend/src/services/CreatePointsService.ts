import knex from '../database/connection';

interface Request {
	name: string;
	email: string;
	whatsapp: string;
	latitude: number;
	longitude: number;
	city: string;
	uf: string;
	items: number[];
}

class CreatePointsService {

	public async execute({
		name,
		email,
		whatsapp,
		latitude,
		longitude,
		city,
		uf,
		items
	}: Request) {

		// const trx = await knex.transaction();

		const point = {
			image: 'image-fake',
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
		}

		const insertedIds = await knex('points').insert(point);
		const point_id = insertedIds[0];

		const pointItems = items.map((item_id: number) => ({
			item_id,
			point_id
		}));

		await knex('point_items').insert(pointItems);

		return {
			id: point_id,
			...point
		}

	}

};

export default CreatePointsService;