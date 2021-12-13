const path = require('path');
const eleventyRemark = require('@fec/eleventy-plugin-remark')
const hint = require('remark-hint')
const external = require('remark-external-links')
const rehype = require('remark-rehype')
const rehypeRaw = require('rehype-raw');
const slug = require('remark-slug')
const stringify = require('rehype-stringify')
const autoLink = require('remark-autolink-headings')
const remark = require('remark')
const html = require('remark-html')
const images = require('@fec/remark-images')

const processCaption = (markdown) => {
	const caption = remark()
    .use(html)
    .processSync(markdown)
    .toString()

	return caption
}

const options = {
	enableRehype: false,
	plugins: [
		hint,
		{
			plugin: external,
			options: {
				target: '_blank',
				rel: 'nofollow',
				protocols: ['http', 'https'],
			}
		},
		slug,
		{
			plugin: autoLink,
			options: {
				behavior: 'prepend',
				linkProperties: {
					ariaHidden: 'true', 
					tabIndex: -1
				}
			}
		},
		{
		    plugin: images,
		    options: {
				srcDir: path.join(__dirname, '../../../site'),
				targetDir: path.join(__dirname, '../../../_site'),
				figureClassName: '',
				pictureClassName: '',
				imgClassName: '',
				figCaptionClassName: '',
				loadingPolicy: 'lazy',
				imageSizes: [300, 600, 800],
				elasticContainer: false,
				blurredBackground: false,
				processCaption
		    },
		  },
		  {
			plugin: rehype,
			options: { 
				allowDangerousHtml: true 
			},
		  },
		  
		  rehypeRaw,
		  stringify,	
	]
}

module.exports = [eleventyRemark, options]