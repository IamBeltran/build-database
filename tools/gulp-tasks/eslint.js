/* eslint-disable import/no-extraneous-dependencies */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const eslint = require('gulp-eslint');
const log = require('fancy-log');
const color = require('ansi-colors');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS-MODULE DEPENDENCIES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const fs = require('fs');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { red, yellow, green, blue, grey } = color;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// function embolden(text) {
//   return `\u001b[1m${text}\u001b[22m `;
// }

function pluralish(count, text) {
  return `${count} ${text}${count === 1 ? '' : 's'}`;
}

function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = {
  src: gulp => () => {
    return gulp
      .src(['!node_modules/**', 'src/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format('pretty')) // stdout
      .pipe(eslint.format('html', fs.createWriteStream('./reports/eslint/report.eslint.html')));
  },
  quick: gulp => () => {
    return gulp
      .src(['!node_modules/**', 'src/**/*.js'])
      .pipe(eslint())
      .pipe(
        eslint.format(results => {
          const { errorCount, warningCount } = results;
          const label = blue('[ Quick ESLint Summary ]');
          const labelFile = pluralish(results.length, 'File');
          const labelErr = pluralish(errorCount, 'Error');
          const labelWarn = pluralish(warningCount, 'Warning');
          log(label);
          log(grey('------------------------'));
          log(`● ${labelFile}`);
          log(`${errorCount > 0 ? red(`● ${labelErr}`) : green(`● ${labelErr}`)}`);
          log(`${warningCount > 0 ? yellow(`● ${labelWarn}`) : green(`● ${labelWarn}`)}`);
          log(grey('------------------------'));
        }),
      );
  },
  watch: gulp => () => {
    return gulp
      .src(['!node_modules/**', 'src/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.formatEach('pretty')) // stdout
      .pipe(eslint.failOnError())
      .on('error', error => {
        log(`Stream Exiting With Error: ${error.message}`);
      });
  },
  fix: gulp => () => {
    const { dest } = gulp;
    return gulp
      .src(['!node_modules/**', 'src/**/*.js'])
      .pipe(eslint({ fix: true }))
      .pipe(eslint.format()) // if fixed, write the file to dest
      .pipe(
        rename({
          prefix: 'fix.',
          extname: '.js',
        }),
      )
      .pipe(gulpIf(isFixed, dest('./test/fixtures/')));
  },
};
