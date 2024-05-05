/**
 * MIT License
 * Copyright (c) 2024 ZacAttack
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

import fs from "fs";
import * as fileType from 'file-type';

const folder = process.argv[2];

async function read() {
    // create dir
    try { await fs.mkdirSync("./chkMime"); } catch {}
    // read user specified directory
    fs.readdir(folder, (err, files) => {
        // for each file in directory
        files.forEach(async element => {
            /** holds "full" file path */
            var file = `${"./" + folder + "/" + element}`; 
            /** buffer of said file */
            var fileBuffer = fs.readFileSync(file);
            /** the file type (FileTypeResult), if fileTypeFromBuffer returns undefined then we set a default one. */
            var type = ((await fileType.fileTypeFromBuffer(fileBuffer.buffer)) ?? { ext: 'bin', mime: 'application/octet-stream' });
            /** the file mimetype */
            var mimeType = type.mime;
            /** the file extension. */
            var ext = type.ext
            try {
            // write it all into a folder.
            fs.writeFileSync("./chkMime/" + element + "." + ext, fileBuffer);
            if (mimeType !== "application/octet-stream")
                console.log(`${element}'s actual type is ${type}`);
            else
                console.log(`${element}'s actual type is unknown`);
            } catch (err) {
                console.log(`Failed to write "${"./chkMime/" + element + "." + ext}": ${err}`);
            }
        });
    })
}

read();
