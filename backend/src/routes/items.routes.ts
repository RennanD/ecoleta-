import { Router } from 'express';

import ListItemsService from '../services/ListItemsService';

const itemsRouter = Router();

itemsRouter.get('/', async (request, response) => {
	const listItems = new ListItemsService();

	const items = await listItems.execute()

	return response.json(items)
});

export default itemsRouter;