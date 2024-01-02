import { franc } from 'franc';
import langs from 'langs';
import colors from 'colors';

const prompt = process.argv.slice(2).join(' ');
const lang = franc(prompt, { minLength: 3 });
const langName = langs.where('3', lang);

if (prompt.length <= 5 && lang === 'und') {
    console.log('Sorry no language was found, maybe try writing a longer prompt.'.red);
} else if (lang === 'und' || langs.where('3', lang) === undefined) {
    console.log('Sorry no language matching your prompt was found.'.red);
} else {
    console.log('Our best guess is', langName.name);
}

// console.log(process.argv.slice(2).join(' '));

