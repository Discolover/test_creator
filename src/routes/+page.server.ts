import { fail, redirect } from '@sveltejs/kit';

import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { MongoClient} from 'mongodb';
import { examples } from '$lib/examples.js';

const client = new MongoClient('mongodb://mongoadmin:secret@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=myapp');

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		let name = data.get('name');
		let password = data.get('password')?.toString();
		let passwordRepeat = data.get('passwordRepeat')?.toString();
		try {
			if (typeof password === 'undefined') {
				throw new Error("badPassword");
			}
			if (name === '') {
				throw new Error("emptyName");
			}
			if (password.length < 3 || password.length > 32) {
				throw new Error("badPasswordLength");
			}
			if (password !== passwordRepeat) {
				throw new Error("passwordsNotMatch")
			}
		} catch (error) {
			if (error instanceof Error) {
				return fail(422, {
					error: error.message,
					name: name
				});
			} else if (typeof error === 'string') {
				return fail(422, {
					error: error,
					name: name
				});
			}
		}

		let salt = randomBytes(16); 
		let iterations = 100000;
		let hash = pbkdf2Sync(password as string, salt, iterations, 64, 'sha512');
		let ID: string;

		let correctOptionId = crypto.randomUUID()
		const test = {
			name: name,
			auth: {
				hash: hash.toString('base64'),
				salt: salt.toString('base64'),
				iterations: iterations,
			},
			questions: [
				examples["multipleChoice"](),
				examples["multipleResponse"]()
			],
		}

		try {
			await client.connect();
			let r = await client.db().collection('tests').insertOne(test);
			ID = r.insertedId.toString();
		} finally {
			await client.close();
		}

		// cookies.set('authed', 'true', {path: `/${ID}`})

		throw redirect(303, `/${ID}/edit`);
	}
};

// client.end()