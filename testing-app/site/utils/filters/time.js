module.exports = (string) => {
	const time = parseFloat(string)
	const hours = Math.floor(time)
	const minutes = (time - hours) * 60
	let duration = ``

	if(hours > 0) {
		duration = `${hours}h ` 
	}

	if(minutes) {
		duration = `${duration}${minutes}m`
	}

	return duration
}