import { Router } from 'express';

import CreatePointsService from '../services/CreatePointsService';
import ShowOnlyPointService from '../services/ShowOnlyPointService';

import itemsRouter from './items.routes'

const pointRouter = Router();

pointRouter.get('/:id', async (request, response) => {
	const { id } = request.params;

	const showPoint = new ShowOnlyPointService();

	try {
		const point = await showPoint.execute({ id });



		return response.json(point);

	} catch(err) {
		return response.status(400).json({error: err.message})
	}

})

pointRouter.post('/', async (request, response) => {
	const {
		name,
		email,
		whatsapp,
		latitude,
		longitude,
		city,
		uf,
		items
	} = request.body;

	try {

		const createPoint =  new CreatePointsService();

		const point = await createPoint.execute({
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
			items
		});

		return response.json(point)

	} catch (err) {

		console.log(err)

		return response.status(400).json({error: err.message})
	}

});

export default pointRouter;