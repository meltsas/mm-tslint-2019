const fs = require('fs')

const path = '../../tslint.json'

const cl = require('readline').createInterface(process.stdin, process.stdout);
const question = function (q) {
  return new Promise((res, rej) => {
    cl.question(q, answer => {
      res(answer);
    })
  });
};


try {

  let projetctTslint = null;
  if (fs.existsSync(path)) {
    projetctTslint = JSON.parse(fs.readFileSync(path));
    console.log('projetctTslint.rules', projetctTslint.rules);
  } else {
    console.error('No tsling.json file found in Your project root folder!');
  }

  if (projetctTslint) {
    (async function main() {
      const userAnswers = ['yes', 'y', 'no', 'n'];
      let answer = '';
      while (userAnswers.indexOf(answer.toLowerCase()) === -1) {
        answer = await question('Do You want to modify Your tslint.json with mm-tslint rules? (Y/N): ');
      }
      if (answer === 'yes' || answer === 'y') {
        const myRules = JSON.parse(fs.readFileSync('./mm-tslint.json'));
        projetctTslint.rules = myRules.rules;
        fs.writeFileSync(path, JSON.stringify(projetctTslint,null,'  '), {encoding: 'utf8', flag: 'w'});
        console.info('Your tslint were modified with mm-tslint rules');
        process.exit();
      } else {
        console.info('Your tslint were not modified !');
        process.exit();
      }
    })();


  }
} catch (err) {
  console.error('error', err);
}

