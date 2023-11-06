import { redirect } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://mongoadmin:secret@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=myapp');

export async function load({ cookies, params }) {
    console.log('sessionId', cookies.get('session-id'))

    const sessionId = cookies.get('session-id')?.toString()
	if (sessionId === undefined) {
		throw redirect(303, `/${params.ID}/authorize`);
	}

    try {
        await client.connect();
        const r = await client.db().collection('sessions').findOne(
            { _id: new ObjectId(sessionId)}
        );

        console.log(r)
        if (r === null) {throw redirect(303, `/${params.ID}/authorize`);} // @todo: check error handling in JS
    } finally {
        await client.close();
    }

}