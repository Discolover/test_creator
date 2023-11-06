import { json } from '@sveltejs/kit';

import { MongoClient, ObjectId, type UpdateFilter } from 'mongodb';

const client = new MongoClient('mongodb://mongoadmin:secret@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=myapp');

export async function POST({ request, cookies, params }) {
    
    const r: {create: QuestionType[], remove: ID[], update: QuestionType[]} = await request.json()

    let $set: {[index: string]: QuestionType} = {}
    let arrayFilters: {[index: string]: any}[] = []

    let $push = {questions: {$each: [] as QuestionType[]}}
    let $pull = {questions: {_id: {$in: [] as ID[]}}}

    // $push[`questions.$[q${questionCnt}].options`] = {$each: []}
    // $pull[`questions.$[q${questionCnt}].options`] = {_id: {$in: []}}

    for (let i = 0; i < r.create.length; ++i) {
        $push.questions.$each.push(r.create[i])
    }

    for (let i = 0; i < r.remove.length; ++i) {
        $pull.questions._id.$in.push(r.remove[i])
    }

    for (let i = 0; i < r.update.length; ++i) {
        $set[`questions.$[q${i}]`] = r.update[i]
        arrayFilters.push({[`q${i}._id`]: r.update[i]._id})
    }

    console.log('pull', JSON.stringify($pull))
    console.log('push', JSON.stringify($push))
    console.log('set', JSON.stringify($set))
    console.log('arrayFilters', JSON.stringify(arrayFilters))

    try {
        await client.connect();
        if (Object.keys($push).length > 0) {
            const r = await client.db().collection('tests').updateMany(
                {_id: new ObjectId(params.ID)},
                {
                    $push: $push as UpdateFilter<Document>,
                },
            );
        }
        if (Object.keys($pull).length > 0) {
            const r = await client.db().collection('tests').updateMany(
                {_id: new ObjectId(params.ID)},
                {
                    $pull: $pull as UpdateFilter<Document>
                },
            );
        }
        if (Object.keys($set).length > 0) {
            const r = await client.db().collection('tests').updateMany(
                {_id: new ObjectId(params.ID)},
                {
                    $set: $set as UpdateFilter<Document>
                },
                {
                    arrayFilters
                }
            );
        }
    } finally {
        await client.close();
    }


	return json({ status: 201 });
}