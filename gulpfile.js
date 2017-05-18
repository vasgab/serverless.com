const gulp = require('gulp')
const logger = requireTs('logger');

gulp.task('default', () => logger.info('Running a default task', argv.test));
gulp.task('install-services', installServices);
gulp.task('install-root');
gulp.task('deploy', deployServices);

function installServices(cb) {
    let counter = 0;
    install(services[counter]);

    function install(srvName) {
        logger.info(`installing ${srvName}`);
        run(`npm install`, { verbosity: 3 }).exec(() => {
            logger.log('Installation of services done');
            cb();
            return;
        });
    }
}

function deployServices(cb) {
    process.env.NODE_ENV = 'deploy';
    let counter = 0;

    deploy(services[counter]);

    function deploy(srvName) {
        logger.log(`Deploying ${srvName}`);
        run(`sls deploy -y --stage ${argv.stage}`, { verbosity: 3 }).exec(() => {
          logger.info('Deployment of services done');
          cb();
          return;
        });
    }
}
