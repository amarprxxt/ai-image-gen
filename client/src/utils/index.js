import Filesaver from 'file-saver';
import {surpriseMePrompts} from '../constants';

export function getRandomPrompt(prompt) 
{
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); //Getting random index from 1 to 49
    const randomPrompt = surpriseMePrompts[randomIndex];

    //Implementing check so that we dont get same prompt two times in a row
    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id,photo) {
    Filesaver.saveAs(photo, `download-${_id}.jpg`);
}