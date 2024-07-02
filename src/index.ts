import FileHandler from './FileHandler';
import { prompt } from './utils';

export async function main(){

    // Prompt url or dir to analyse
    const filePath = await prompt('Inserisci il percorso del file (locale o URL): ');

    // Get instance of file handler analyzer,
    // The design pattern used here is the Singleton Pattern.
    // If the class is already instanced return it or create a new one.
    // The class exposes all methods to operate on the url or the directory.
    const fileHandler = FileHandler.getInstance();

    try {
        // Read path (url or dir), must be await for the url.
        const content = await fileHandler.readFile(filePath);

        // Analysis on data retrieved
        const analysis = fileHandler.analyzeContent(content);

        // Print results
        console.log(`Words counter: ${analysis.wordCount}`);
        console.log(`Chars counter: ${analysis.letterCount}`);
        console.log(`Whitespaces counter: ${analysis.spaceCount}`);
        console.log('Words repeated more than 10 times (case sensitive):');
        for (const [word, count] of Object.entries(analysis.repeatedWords)) {
            console.log(`${word}: ${count} volte`);
        }
    } catch (error: any) {
        console.error('Error reading file:', error.message);
    }
};

main();
