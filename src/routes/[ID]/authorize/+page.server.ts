import { fail, redirect } from '@sveltejs/kit';
import { pbkdf2Sync } from 'node:crypto';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://mongoadmin:secret@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=myapp');

//export async function load({params}) {
//	try {
//		await client.connect();
//		const r = await client.db().collection('tests').findOne(
//            { _id: new ObjectId(params.ID) },
//            {projection: { _id: 0, name: 1 }}
//        );
//		if (r === null) { throw "Error" } // @todo: check error handling in JS
//
//		return {name: r.name}
//		} finally {
//		await client.close();
//	}
//}

export const actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		let name = data.get('name')?.toString();
		let password = data.get('password')?.toString();
		console.log(name, password)
		if (name === undefined || password === undefined) {
			return; // @todo
		}

        // @todo: check that username matches
        try {
        	await client.connect();
        	const r = await client.db().collection('tests').findOne(
                   { _id: new ObjectId(params.ID) },
                   {projection: { _id: 0, auth: 1 }}
            );

        	if (r === null) { throw "Error" } // @todo: check error handling in JS

            console.log(r)
    
            let salt = Buffer.from(r.auth.salt, 'base64')
            let hash = pbkdf2Sync(password, salt, r.auth.iterations, 64, 'sha512');
            
            if (hash.toString('base64') === r.auth.hash) {

                const r = await client.db().collection('sessions').insertOne(
                    { createdAt: new Date() },
                );

                if (r === null) { throw "Error" } // @todo: check error handling in JS

                cookies.set('session-id', r.insertedId.toString(), {path: `/${params.ID}/edit`})
                throw redirect(303, `/${params.ID}/edit`);
            }

        } finally {
        	await client.close();
        }

	}
};