// 实现这个项目的构建任务

const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp')

const del = require('del')

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const browserSync = require('browser-sync')
const {
  stream
} = require('browser-sync')
const bs = browserSync.create()

const clean = () => {
  return del(['dist'])
}

const style = () => {
  return src('src/assets/styles/*.scss', {
      base: 'src'
    })
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(dest('dist'))
    .pipe(bs.reload({
      stream: true
    }))
}

const scripts = () => {
  return src('src/assets/scripts/*.js', {
      base: 'src'
    })
    .pipe(plugins.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('dist'))
    .pipe(bs.reload({
      stream: true
    }))
}

const page = () => {
  return src('src/**/*.html', {
      base: 'src'
    })
    .pipe(plugins.swig())
    .pipe(dest('dist'))
    .pipe(bs.reload({
      stream: true
    }))
}

const image = () => {
  return src('src/assets/images/**', {
      base: 'src'
    })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', {
      base: 'src'
    })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extrs = () => {
  return src('public/**', {
      base: 'public'
    })
    .pipe(dest('dist'))
}

const server = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', scripts)
  watch('src/**/*.html', page)
  // watch('src/assets/images/**',image)
  // watch('src/assets/fonts/**',font)
  // watch('public/**',extrs)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**',
  ], bs.reload)
  bs.init({
    server: {
      notify: false, //关闭提示
      port: 2080, //端口
      open: false, //取消自动打开浏览器
      files: 'dist/**', //哪些文件被监视，自动更新
      baseDir: ['dist', 'src', 'public'],
      routes: { //优先baseDir，先去走下面的配置再去找baseDir中的文件
        '/node_modules': 'node_modules'
      }
    }
  })
}

const compile = parallel(style, scripts, page)
const build = series(clean, parallel(compile, image, font, extrs))
const develop = series(compile, server)

module.exports = {
  compile,
  build,
  develop,
}
