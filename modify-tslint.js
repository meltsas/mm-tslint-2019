const fs = require('fs')

const path = '../../tsling.json'

try {
  const content = fs.readFileSync('./tslint.json');
  if (fs.existsSync(path)) {
    //file exists
    fs.writeFileSync(path, content, {encoding: 'utf8', flag: 'w'});
  } else {
    console.error('No tsling.json file found in Your project root folder!');
  }
} catch (err) {
  console.error('error', err);
}
