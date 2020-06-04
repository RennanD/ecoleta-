import knex from '../database/connection';

interface ItemsProps {
	id: number;
	title: string;
	image: string;
	url: string;
}

class ListItemsService {
	public async execute(): Promise<ItemsProps[]> {
		const items = await knex('items').select("*");

		const serializedItems = items.map(item => ({
			...item,
			url: `http://localhost:3333/files/${item.image}`
		}))

		return serializedItems
	}
};

export default ListItemsService; 