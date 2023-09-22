import './sass/main.scss';
import { searchAllBy } from './js/searchBy';

async function test() {
  try {
    const gimme = await searchAllBy('dates', 1);
    console.log(gimme);
  } catch (err) {
    console.log(`Error occured: ${err.toString()}`);
  }
}
test();
