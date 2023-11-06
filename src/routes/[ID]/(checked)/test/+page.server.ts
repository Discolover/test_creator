import { fail, error } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://mongoadmin:secret@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=myapp');

export async function load({params}) {
	try {
		await client.connect();
		const r = await client.db().collection('tests').findOne({ _id: new ObjectId(params.ID) });
		if (r === null) { throw "Error" } // @todo: check error handling in JS

		let questions: QuestionType[] = r.questions
		console.assert(r !== null)

		//for (let i = 0; i < questions.length; ++i) {
		//	switch (questions[i].kind) {
		//	case 'multipleChoice':
		//		(questions[i] as MultipleChoice).options.sort(sortByOrder);
		//		break;
		//	case 'multipleResponse':
		//		(questions[i] as MultipleChoice).options.sort(sortByOrder);
		//		break;
		//	case 'matching':
		//		(questions[i] as Matching).matched.sort(sortByOrder);
		//		(questions[i] as Matching).matching.sort(sortByOrder);
		//		break;
		//	default:
		//		throw "Error"
		//	}
		//}

		return {questions}
		} finally {
		await client.close();
	}
}

export const actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
        for (const pair of data.entries()) {
            const [key, value] = pair;
            console.log(`${key}: ${value}`);
        }
	}
};