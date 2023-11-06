import { MongoClient, ObjectId } from 'mongodb';
import { fail, redirect } from '@sveltejs/kit';

const client = new MongoClient('mongodb://mongoadmin:secret@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=myapp');

export async function load({params}) {
	try {
		await client.connect();
		const r = await client.db().collection('tests').findOne(
            { _id: new ObjectId(params.ID) },
            {projection: { _id: 0, name: 1 }}
        );
		if (r === null) { throw "Error" } // @todo: check error handling in JS

		return {name: r.name}
		} finally {
		await client.close();
	}
}

export const actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		let username = data.get('username')?.toString();
		console.log(username)
		if (username === undefined) {
			return; //@todo
		}

		console.log(username)
        // @todo: check that name is not empty
		cookies.set('username', username, {path: `/${params.ID}/test`})

		throw redirect(303, `/${params.ID}/test`);
	}
};