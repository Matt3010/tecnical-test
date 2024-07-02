import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default class FileHandler {
    private static instance: FileHandler;

    public static getInstance(): FileHandler {
        if (!FileHandler.instance) {
            FileHandler.instance = new FileHandler();
        }
        return FileHandler.instance;
    }

    public async readFile(filePath: string): Promise<string> {
        if (this.isUrl(filePath)) {
            // Get content
            const response = await axios.get(filePath);
            // Return content
            return response.data;
        } else {
            // Return content
            return fs.readFileSync(path.resolve(filePath), 'utf-8');
        }
    }

    private isUrl(filePath: string): boolean {
        try {
            new URL(filePath);
            return true;
        } catch (e) {
            return false;
        }
    }

    public analyzeContent(content: string): { wordCount: number; letterCount: number; spaceCount: number; repeatedWords: Record<string, number> } {
        // Find all words in the document
        const words = content.match(/\b\w+\b/g) || [];

        // Find all alphanumerical chars without spaces
        const letters = content.match(/\w/g) || [];

        // Find all spaces in document
        const spaces = content.match(/\s/g) || [];

        // Init dictionary to trace repe
        const wordFrequency: Record<string, number> = {};

        // For each word add the single word to de dictionary
        for (const word of words) {
            // If the word has not been already inserted initialize to 0 or add 1.
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }


        // initialize a dictionary that will have been repeated more than 10 times.
        const repeatedWords: Record<string, number> = {};

        for (const [word, count] of Object.entries(wordFrequency)) {
            // If the word appears more than 10 times push to the dictionary.
            if (count > 10) {
                repeatedWords[word] = count;
            }
        }

        // return analyzed data
        return {
            wordCount: words.length,
            letterCount: letters.length,
            spaceCount: spaces.length,
            repeatedWords
        };
    }
}

