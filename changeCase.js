import fs from 'fs';
import { tags } from './tags.js';
const lowercaseTags = tags.map(tag => tag.toLowerCase());

const content = `const lowercaseTags = ${JSON.stringify(lowercaseTags, null, 2)};\n\nmodule.exports = { lowercaseTags };`;

fs.writeFile('lowercaseTags.js', content, (err) => {
  if (err) {
    console.error('An error occurred:', err);
    return;
  }
  console.log('File has been saved with lowercase tags.');
});