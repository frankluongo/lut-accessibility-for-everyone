const browserSyncConfig = {
	notify: true,
	watch: true,
	logFileChanges: true,
}

const templateFormats = ['html', 'md', 'njk', 'css']

const config = {
	dir: {
		input: "site",
		markdownTemplateEngine: 'njk'
	},
}

module.exports = {
	browserSyncConfig,
	templateFormats,
	config
}