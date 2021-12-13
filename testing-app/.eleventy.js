require('dotenv').config();

const {
  browserSyncConfig,
  templateFormats,
  config,
} = require('./site/_config/index.js');

const image = require('./site/utils/shortcodes/image');
const eleventyRemark = require('./site/utils/markdown/index.js');
const slug = require('./site/utils/filters/slug');
const ingredients = require('./site/utils/filters/ingredients');
const time = require('./site/utils/filters/time');
const svg = require('./site/utils/plugins/svg');
const sitemap = require('./site/utils/plugins/sitemap');

module.exports = (eleventyConfig) => {
  eleventyConfig.setBrowserSyncConfig(browserSyncConfig);
  eleventyConfig.setQuietMode(true);
  eleventyConfig.setTemplateFormats(templateFormats);
  eleventyConfig.addWatchTarget('site/src/scss/**/*');

  // Passthrough Copy
  eleventyConfig.addPassthroughCopy({ 'site/src/fonts': 'fonts' });
  eleventyConfig.addPassthroughCopy({ 'site/src/img': 'img' });
  eleventyConfig.addPassthroughCopy({ 'site/img': 'img/cms' });
  eleventyConfig.addPassthroughCopy({ 'site/src/js': 'js' });

  // Plugins
  eleventyConfig.addPlugin(...eleventyRemark);
  eleventyConfig.addPlugin(...svg);
  eleventyConfig.addPlugin(...sitemap);

  // Filters
  eleventyConfig.addFilter('slug', slug);
  eleventyConfig.addFilter('ingredients', ingredients);
  eleventyConfig.addFilter('time', time);
  eleventyConfig.addFilter('debug', (data) => {
    console.log(data);
    return `<script>console.log(${data})</script>`;
  });
  eleventyConfig.addFilter('print', (data) => {
    const items = data.map(({ data }) => {
      const { title, categories, permalink, image } = data;
      return { title, categories, permalink, image };
    });

    return JSON.stringify(items);
  });
  eleventyConfig.addFilter('recipesList', (data) => {
    const items = data.map(({ data }) => {
      const { title, categories, permalink, image } = data;
      return { title, categories, permalink, image };
    });

    return items;
  });

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('image', image);

  // Custom Collections
  eleventyConfig.addCollection('recipes', (collection) =>
    collection.getFilteredByTags('recipes')
  );

  return {
    ...config,
  };
};
