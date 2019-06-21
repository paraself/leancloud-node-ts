// 引入 gulp
const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const sourcemaps = require('gulp-sourcemaps')

// 拷贝所有的lua文件
gulp.task('copy', function () {
  return gulp
    .src([
      './src/**/*',
      '!./src/**/*.js',
      // '!./src/**/*.json',
      '!./src/**/*.ts' // 这三种文件不用拷贝，因为有ts处理
    ])
    .pipe(gulp.dest('./dist'))
})

gulp.task('ts', function () {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
    .pipe(gulp.dest('./dist'))
})
