<?php

$path = 'uploads'; // '.' for current
foreach (new FilesystemIterator($path) as $file) {
    echo $file->getFilename() . ' Last Modified ' . date('m/d/y' ,$file->getMTime()) . '<br />';

    //if ($file->isDot()) continue;

    /*if ($file->isDir()) {
        echo $file->getFilename() . '<br />';
    }*/
}
/*
 * @param Array $types
 * @abstract Array of allowed file types
 */
$types = Array ('jpeg', 'jpg', 'txt', 'pdf', 'js', 'mp4', 'mp3', 'ogg');

/*
 * @name getList
 * @param Array $dir
 * @param Array $types
 * @abstract Recursively iterates over specified directory
 *           populating array based on array of file extensions
 * @return Array $files
 */
function getList($path, $types) {
    foreach (new DirectoryIterator($path) as $file) 
    {
        if (in_array(strtolower(array_pop(explode('.', $file))), $types)) {
        	var_dump($file);
            $files[] = $file;
            //var_dump($file);
            //echo $file->getFilename() . '<br />';
        }
    }
    echo 'BREAK' . '<br />';
    return $files;  
}

/*
 * @name getDetails
 * @param Array $dir
 * @param Array $types
 * @abstract Recursively iterates over specified directory
 *           populating array with details of each file
 * @return Array $files
 */
function getDetails($types, $array) {
    foreach($types as $type)
    {
        foreach($array as $file)
        {
        	var_dump($file);
        	//echo $file->getFilename() . '<br />';
            /*if (strcasecmp($type, $file->getExtension) == 0) {
                $files[$type][$file->getFilename()];
                $files[$type][$file->getFilename()]['source'] = $file->getFilename();
                $files[$type][$file->getFilename()]['size'] = $file->getSize();
                $files[$type][$file->getFilename()]['date'] = date('m/d/y' ,$file->getMTime());
            }*/
        }
    }
    return array('files'=>$files);
}
//$arr =  getList('uploads', $types);
//var_dump($arr);
//exit(json_encode(getDetails($types, getList('uploads', $types))));