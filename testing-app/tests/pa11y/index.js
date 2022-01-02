const pa11y = require('pa11y');
const fs = require('file-system');
const report = require('./report');

/*
  pa11y can take options
  --
  pa11y('inserturlhere', {
  standard: 'WCAG2A',
  screenCapture: `${__dirname}/results/index.png`,
  viewport: {
    width: 320,
    height: 480,
    isMobile: true
  }
}
*/

const url = 'http://localhost:8080';
const options = ({ viewport, name }) => ({
  standard: 'WCAG2AA',
  screenCapture: `${__dirname}/results/index_${name}.png`,
  viewport,
  actions: [
    `screen capture ${__dirname}/results/index_${name}_start.png`,
    'set field input[type="search"] to beef',
  ],
});

function runTest({ viewport, name }) {
  pa11y(url, options({ viewport, name }))
    .then((res) => {
      fs.writeFile(
        `tests/pa11y/results/results_${name}.json`,
        JSON.stringify(res, null, '\t')
      );
      report(res, `Homepage (${name})`, `home_${name}`);
    })
    .catch((e) => console.log(e));
}

// MOBILE
// ==================================================================

runTest({
  viewport: {
    height: 480,
    width: 320,
    isMobile: true,
  },
  name: 'mobile',
});

// DESKTOP
// ==================================================================

runTest({
  viewport: {
    width: 1440,
    height: 900,
    isMobile: false,
  },
  name: 'desktop',
});
