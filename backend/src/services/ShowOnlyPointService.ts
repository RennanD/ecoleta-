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

		return point;
	}
};

export default ShowOnlyPointService; 