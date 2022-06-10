const chokidar = require('chokidar');
const program = require('commander');
const { existsSync, readFileSync, mkdirSync, rmdirSync } = require('fs');
const { exec } = require('child_process');
const { copySync } = require('fs-extra');
const { join } = require('path');

let semInit = false;

const listeningMessage = () => {
    console.log();
    console.log('\x1b[32mListening to changes ...\x1b[0m');
};

const configWatcher = (nodeModulesPathTarget) => {
    if (nodeModulesPathTarget !== null && !existsSync(nodeModulesPathTarget)) {
        console.error("The directory %s doesn't exists or can't access", nodeModulesPathTarget);
        return;
    }
    let countChanges = 0;
    const watcher = chokidar.watch('projects', { ignored: /.log/, persistent: true, awaitWriteFinish: true });

    const copyDistToTarget = () => {
        if (nodeModulesPathTarget !== null) {
            let fileContent = JSON.parse(readFileSync(join('dist', 'gtsi-ui-lib-layouts', 'package.json'), 'UTF8'));
            if (fileContent && fileContent.name) {
                const nestedDep = /^\@(.*?)\/(.*)/.exec(fileContent.name);
                let destination = '';
                if (nestedDep) {
                    const parentDestination = join(nodeModulesPathTarget, '@' + nestedDep[1]);
                    if (!existsSync(parentDestination)) {
                        mkdirSync(parentDestination);
                    }
                    destination = join(parentDestination, nestedDep[2]);
                } else {
                    destination = join(nodeModulesPathTarget, fileContent.name);
                }
                if (!existsSync(destination)) {
                    mkdirSync(destination);
                } else {
                    rmdirSync(destination, { recursive: true });
                }
                console.log('Copying \x1b[36mdist/\x1b[0m into: \x1b[36m' + destination + '\x1b[0m');
                copySync(join('dist', 'gtsi-ui-lib-layouts'), destination);
            } else {
                console.log('\x1b[31mCan not read the package.json file for reading its name.\x1b[0m');
            }
        }
        listeningMessage();
    };

    const compileProject = () => {
        let child = exec('npm run build', function (error) {
            console.log();
            if (!error) {
                console.log('\x1b[32mLibrary compiled successfully.\x1b[0m');
                copyDistToTarget();
            } else {
                console.log('\x1b[31mSomething went wrong during the compilation.\x1b[0m');
            }
        });
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    };

    const manageTriggeredChange = () => {
        countChanges++;
        const countSnapshot = countChanges;
        setTimeout(() => {
            if (countSnapshot === countChanges) {
                if (!semInit) {
                    console.log("Done. Now I'm ready!");
                    listeningMessage();
                    semInit = true;
                } else {
                    compileProject();
                }
            }
        }, 2000);
    };

    watcher.on('add', manageTriggeredChange).on('change', (event, path) => {
        console.log(event, path);
        manageTriggeredChange();
    });
};

const init = () => {
    program
        .version('1.0.0')
        .option('--target <target>', 'The path of the project in which update the library changes')
        .parse(process.argv);

    const target = program.target ? join(program.target, 'node_modules') : null;
    configWatcher(target);

    console.log('Wait while it is initialized...');
};

init();
