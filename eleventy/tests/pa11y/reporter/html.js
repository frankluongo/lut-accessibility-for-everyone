const principle = (data) => {
	return data.split('.').join(' ')?.replace(/_/g, '.')
}

module.exports = (results) => {
	const date = new Date()
	const title = results.documentTitle
	const pageUrl = results.pageUrl
	const errors = results.issues.filter(issue => issue.type === 'error').length
	const warnings = results.issues.filter(issue => issue.type === 'warning').length
	const notices = results.issues.filter(issue => issue.type === 'notice').length

	const data = `
		<header>
		<h1>Accessibility Report for: ${title}</h1>
		<p>Generated at ${date.toLocaleString('en-AU')}</p>
		<p>Page URL: <a href="${pageUrl}" target="_blank">${pageUrl}</a></p>
		</header>
		<dl>
			<dt class="error">Errors</dt>
			<dd class="error">${errors}</dd>
			<dt class="warning">Warnings</dt>
			<dd class="warning">${warnings}</dd>
			<dt class="notice">Notices</dt>
			<dd class="notice">${notices}</dd>
		</dl>
		<h2>Issues</h2>
		<ul class="results">
			${results.issues.map(issue => (
				`<li class="${issue.type}">
					<h3><span class="type">${issue.type}</span>: ${issue.message}</h3>
					<p class="code">${principle(issue.code)}</p>
					<pre class="context">${issue.context?.replace(/</g, '&lt;')?.replace(/</g, '&gt;')}</pre>
					<p class="selector">${issue.selector}</p>
				</li>`
			))}
		</ul>
	`

	return data
};


