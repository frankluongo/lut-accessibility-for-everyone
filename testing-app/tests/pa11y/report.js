const fs = require('file-system')
const htmlReport = require('./reporter/html')

module.exports = (results, title = '', name) => {
	const html = htmlReport(results)
    const report = `---\npermalink: /tests/pa11y/${name}/index.html\nleventyExcludeFromCollections: true\n---
        {% set pagetitle = "${title} | Accessibility Report" %}
        {% set language = "en-AU" %}
        {% extends 'layouts/main.njk' %}
        {% block content %}
        <article class="report">${html}</article>
        {% endblock %}
    `

	fs.writeFile(`site/pages/tests/pa11y/${name}.njk`, report)
}