/* eslint-disable global-require */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const gulp = require('gulp');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS-MODULE DEPENDENCIES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @name          loadTask
 * @description   Function for load gulp task
 * @param         {string} fileName
 * @param         {string} taskName
 * @returns       {function} A gulp task
 */
function loadTask(fileName, taskName) {
  const taskModule = require(`./tools/gulp-tasks/${fileName}`);
  const task = taskName ? taskModule[taskName] : taskModule;
  return task(gulp);
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET GULP-TASKS                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ DEFAULT TASKS ]──────────────────────────────────────────────────────────────────
gulp.task('default', loadTask('default'));

//  ──[ ESLINT TASKS ]───────────────────────────────────────────────────────────────────

// ▶ TASK: eslint:src
gulp.task('eslint:src', loadTask('eslint', 'src'));

// ▶ TASK: quick:eslint
gulp.task('quick:eslint', loadTask('eslint', 'quick'));

// ▶ TASK: eslint:watch
gulp.task('eslint:watch', loadTask('eslint', 'watch'));

// ▶ TASK: eslint:fix
gulp.task('eslint:fix', loadTask('eslint', 'fix'));

//  ──[ UNIT-TEST TASKS ]────────────────────────────────────────────────────────────────

// ▶ TASK FOR TEST WITH MOCHA
// gulp.task('test:simple', loadTask('mocha', 'simple'));
