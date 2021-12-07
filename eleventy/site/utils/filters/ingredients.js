const units = [
	'tablespoon',
	'clove',
	'piece',
	'g',
	'gram',
	'teaspoon',
	'sprig',
	'handful',
	'bulb',
	'tsp',
	'tbsp',
	'cup',
	'tin',
	'bunch'
]
const matchQuantity = '(?<quantity>(\\d|\\/|\\.|-)+(?:cm)*)*'
const matchUnit = `(?:(?<unit>${units.join('|')})s* )`
const matchIngredient = '(?<ingredient>.+?)'

const formatIngredients = (ingredients) => {
	const match = `^${matchQuantity} *${matchUnit}*(?:of )*${matchIngredient}$`
	const ingredientList = ingredients.map(i => {

		if(i.match(RegExp(/^#/, 'i'))) {
			return ({category: i.replace(RegExp(/^#/), '')})
		}

		const matches = i.match(RegExp(match, 'i'))

		return matches?.groups ? {...matches.groups, full: i} : {full: i}
	})


	return ingredientList
}

module.exports = formatIngredients