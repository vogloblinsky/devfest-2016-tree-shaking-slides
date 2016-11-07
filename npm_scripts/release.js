var fs = require('fs-extra'),
    replace = require('replace'),
    RESOURCES_PATH = 'node_modules/scaffolder-revealjs-resources/',
    copy = function() {
        fs.copy('index.html', 'dist/index.html', function(err) {
            if (err) return console.error(err);
            replace({
                regex: RESOURCES_PATH,
                replacement: '',
                paths: ['./dist/index.html'],
                recursive: true,
                silent: true,
            });
        });
        fs.copy(RESOURCES_PATH, 'dist/');
        fs.copy('slides', 'dist/slides');
        fs.copy('img', 'dist/img');
    };

fs.emptydir('dist', function(err) {
    if (err) return console.error(err);
    copy();
});
