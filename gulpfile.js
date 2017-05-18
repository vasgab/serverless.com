const gulp = require('gulp')
const logger = require('logger');
const argv = require('yargs').argv;
const run = require('gulp-run');

gulp.task('install-services', installServices);
gulp.task('install-root');
gulp.task('deploy', deployServices);

function installServices(cb) {

    install( argv.service);

    function install(srvName) {

        run(`npm install`, { verbosity: 3 }).exec(() => {
            cb();
            return;
        });
    }
}

function deployServices(cb) {
    process.env.NODE_ENV = 'deploy';

    deploy(argv.service);

    function deploy(srvName) {
          run(`sls deploy -y --stage ${argv.stage}`, { verbosity: 3 }).exec(() => {
          cb();
          return;
        });
    }
}
