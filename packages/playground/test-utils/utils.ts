import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { JSDOM } from 'jsdom';

let dir: string = __dirname;
export async function run(cwd: string): Promise<void> {
  dir = cwd;
  return new Promise((resolve, reject) => {
    const child = spawn('yarn', ['generate'], {
      cwd,
      stdio: 'inherit'
    });

    child.on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
      }
    });
  });
}

export const getDocument = (fileName: string): Document => {
  const htmlFileContent = fs.readFileSync(
    path.join(dir, 'dist', fileName),
    'utf-8'
  );

  const dom = new JSDOM(htmlFileContent);
  return dom.window.document;
};
