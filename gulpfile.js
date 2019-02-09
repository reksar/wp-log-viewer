// Dependencies
var $			= require('gulp-load-plugins')();
var gulp		= require('gulp');
var jeet		= require('jeet');
var rupture		= require('rupture');


// Paths
var paths = {
	src: {
		css: [
			'src/bower/font-awesome/css/font-awesome.css',
			'src/bower/humane/themes/flatty.css',
			'src/bower/spectrum/spectrum.css',
			'src/css/main.styl'
		],
		img: 'src/img/**/*',
		fonts: 'src/bower/font-awesome/fonts/**/*',
		js: [
			'src/bower/react/react.js',
			'src/bower/reqwest/reqwest.js',
			'src/bower/blueimp-md5/js/md5.js',
			'src/bower/humane/humane.js',
			'src/bower/spectrum/spectrum.js',
			'src/react/app.jsx',
			'src/react/admin-bar-nav.jsx',
			'src/react/mixins/**/*.jsx',
			'src/react/components/**/*.jsx',
			'src/js/main.jsx'
		]
	},

	build: {
		css: 'assets/css',
		fonts: 'assets/fonts',
		img: 'assets/img',
		js: 'assets/js'
	}
};


/**
 * Check if is jsx file
 * @param {object} Vinyl file object
 * @return {boolean}
 */
function isJSX(file) {
	var ext = '.jsx';
	var startIndex = file.path.length - ext.length;

	return file.path.indexOf(ext, startIndex) !== -1 ? true : false;
}


// Default Task
gulp.task('default', ['css', 'fonts', 'images', 'js']);


// Watch
gulp.task('watch', function() {
	gulp.watch('src/css/**/*', ['css']);
	gulp.watch(paths.src.img, ['images']);
	gulp.watch(paths.src.js, ['js']);
});


// Process all stylus files
gulp.task('css', function() {
	return gulp.src(paths.src.css)
		.pipe($.plumber())
		.pipe($.stylus({
			use: [jeet(), rupture()],
			'include css': true
		}))
		.pipe($.autoprefixer())
		.pipe($.csso())
		.pipe($.concat('main.min.css'))
		.pipe(gulp.dest(paths.build.css));
});


// Copy fonts
gulp.task('fonts', function() {
	return gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.build.fonts));
});


// Process all image files
gulp.task('images', function() {
	return gulp.src(paths.src.img)
		.pipe($.plumber())
		.pipe(gulp.dest(paths.build.img));
});


// Process all javascript files
gulp.task('js', function() {
	return gulp.src(paths.src.js)
		.pipe($.plumber())
		.pipe($.if(isJSX, $.react()))
		.pipe($.concat('main.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest(paths.build.js));
});
