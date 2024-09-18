const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

// Define o caminho dos arquivos TypeScript e do diretório dist
const paths = {
    scripts: {
        src: 'src/**/*.ts',
        dest: 'dist/'
    }
};

// Cria uma tarefa para compilar TypeScript
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(ts({
            noImplicitAny: true,
            outDir: paths.scripts.dest
        }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Cria uma tarefa para limpar o diretório dist antes de cada build
function cleanDist() {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
}

// Define a tarefa padrão
const build = gulp.series(cleanDist, scripts);

exports.clean = cleanDist;
exports.scripts = scripts;
exports.build = build;
exports.default = build;
