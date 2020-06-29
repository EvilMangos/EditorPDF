const execa = require('execa');
const Listr = require('listr');

new Listr([
  {
    title: 'Removing package-lock',
    task: () => execa('rm', ['package-lock.json'])
  },
  {
    title: 'Running npm install',
    task: () => execa('npm', ['install'])
  },
  {
    title: 'Adding package-lock to git',
    task: (ctx, task) =>
        execa('git', ['add', 'package-lock.json'])
        .catch(() => task.skip())
  }
]).run();