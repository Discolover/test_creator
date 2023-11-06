export const examples: {[_ in Kind]: () => QuestionType} = {
	"multipleChoice": () => {
		let correctId = crypto.randomUUID()
		return {
		_id: crypto.randomUUID(),
		name: `Сколько планет в солнечной системе?`,
		kind: "multipleChoice",
		options: [
			{ _id: correctId, name: "8", order: 0},
			{ _id: crypto.randomUUID(), name: "9", order: 1},
			{ _id: crypto.randomUUID(), name: "7", order: 2},
			{ _id: crypto.randomUUID(), name: "10", order: 3}
		],
		correct: correctId
		}
	},
	'multipleResponse': () => {
		return {
		_id: crypto.randomUUID(),
		name: `Какие из перечисленных городов являются столицами стран?`,
		kind: "multipleResponse",
		options: [
			{ _id: crypto.randomUUID(), name: "Париж", isCorrect: true, order: 0 },
			{ _id: crypto.randomUUID(), name: "Нью-Йорк", isCorrect: false , order: 1},
			{ _id: crypto.randomUUID(), name: "Торонто", isCorrect: false, order: 2},
			{ _id: crypto.randomUUID(), name: "Сидней", isCorrect: true, order: 3 }
		]
		}
	},
	'matching': () => {
		return {
		_id: crypto.randomUUID(),
		name: `Сопоставьте страну с её столицей`,
		kind: "matching",
		matching: [
			{ _id: crypto.randomUUID(), name: "Франция", matches: 2, order: 0},
			{ _id: crypto.randomUUID(), name: "Германия", matches: 3, order: 1},
			{ _id: crypto.randomUUID(), name: "Индия", matches: 1, order: 2},
			{ _id: crypto.randomUUID(), name: "Канада", matches: 0, order: 3}
		],
		matched: [
			{ _id: crypto.randomUUID(), name: "Оттава", order: 0},
			{ _id: crypto.randomUUID(), name: "Нью-Дели", order: 1},
			{ _id: crypto.randomUUID(), name: "Париж", order: 2},
			{ _id: crypto.randomUUID(), name: "Берлин", order: 3}
		]
		}
	},
	'ordering': () => {
		return {
		_id: crypto.randomUUID(),
		name: `Упорядочите следующие исторические события в хронологическом порядке`,
		kind: "ordering",
		options: [
			{ _id: crypto.randomUUID(), name: "Возрождение", order: 0},
			{ _id: crypto.randomUUID(), name: "Французская революция", order: 1},
			{ _id: crypto.randomUUID(), name: "Промышленная революция", order: 2},
			{ _id: crypto.randomUUID(), name: "Американская гражданская война", order: 3}
		],
		}
	},
	'trueOrFalse': () => {
		return {
			_id: crypto.randomUUID(),
			name: `Земля вращается вокруг своей оси?`,
			kind: "trueOrFalse",
			isCorrect: true,
		}
	}
}