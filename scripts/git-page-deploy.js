require('colors');
const exec = require('child_process').exec;

const commitMessage = 'git Page deploy';
console.log(`Committing with message ${commitMessage}`.bgGreen);
exec(`git add .`,
  (error, stdout, stderr) => {
    handleError(error);
    logstd(stdout, stderr);
    exec(`git commit -m ${commitMessage}`, (error, stdout, stderr) => {
      handleError(error);
      logstd(stdout, stderr);
    })
  }); 