module.exports = {
	eleventyComputed: {
		permalink: (data) => {
			const slug = data.page.fileSlug
			return `recipes/${slug}/index.html`
		},
		tags: (data) => {
			const tags = data.categories ? [...data.categories] : []
			return [
				...tags,
				'recipes'
			]
		}
	},
	layout: `templates/recipe.njk`
}