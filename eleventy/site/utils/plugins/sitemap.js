const plugin = require('@quasibit/eleventy-plugin-sitemap')

const options = {
	sitemap: {
		hostname: 'http://localhost:8080'
	}
}

module.exports = [plugin, options]