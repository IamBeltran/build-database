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

// ▶ DEFAULT GULP-TASK
// gulp.task('default', loadTask('default'));

// ▶ TASK FOR TEST WITH MOCHA
gulp.task('eslint:custom', loadTask('eslint', 'customFormatter'));

// ▶ TASK FOR TEST WITH MOCHA
gulp.task('test:simple', loadTask('mocha', 'simple'));
