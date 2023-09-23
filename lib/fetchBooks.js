import fs from 'fs';
import path from 'path';

export function fetchBooks() {
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(fileContents);
}