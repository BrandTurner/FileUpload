<?php
 /* File Listing Script
 * https://github.com/brandturner/eventfarm
 *
 * Copyright 2015, Brandon Turner
 * https://brandturner.com
 * PSN: ColonelOfTruth84
 *
 * Licensed under the free as in speech and beer license
 * @version 0.1
 */

/* 
 * @name getFiles
 * @param Array $path
 * @abstract iterates over specified directory
 * @return Array $files
 * @todo Include ability to recurse subdiretory
 */
function getFiles($path) {
    foreach (new FilesystemIterator($path) as $file) {
        $filename = $file->getFilename();

        // Building the array that will later return json
        $files[$filename];
        $files[$filename]['source'] = $file->getPathname();
        $files[$filename]['size'] = $file->getSize();
        $files[$filename]['time'] = date('m/d/y', $file->getMTime());
        $files[$filename]['type'] = $file->getExtension();
    }

    return $files;
}

exit(json_encode(getFiles('uploads')));