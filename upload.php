<?php
 /* File Upload Server Script
 * https://github.com/brandturner/eventfarm
 *
 * Copyright 2015, Brandon Turner
 * https://brandturner.com
 * PSN: ColonelOfTruth84
 *
 * Licensed under the free as in speech and beer license
 * @version 0.1
 * @abstract Loops over the POST value received from an ajax call, gets
 * metadata on the files, uploads them to the "uploads" directory,
 * and returns a status message detailing if successful or not.
 * Error points are if there is no file selected, the file is too big,
 * or cannot be moved on the server (usually due to permissions)
 *
 */
if(isset($_FILES['files']['tmp_name'])) {
	$output_array = array();
	$num_files = count($_FILES['files']['tmp_name']);

	for ($i = 0; $i < $num_files; $i++) {	

		// If no file uploaded 
		if (!is_uploaded_file($_FILES['files']['tmp_name'][$i])) {
			// error
			exit('You have not selected any file(s) or there is an unknown error');
		} else {
			$fileName = $_FILES["files"]["name"][$i]; 			// The file name
			$fileTmpLoc = $_FILES["files"]["tmp_name"][$i]; 	// File in the PHP tmp folder
			$fileType = $_FILES["files"]["type"][$i]; 			// The type of file it is
			$fileSize = $_FILES["files"]["size"][$i]; 			// File size in bytes
			$fileErrorMsg = $_FILES["files"]["error"][$i]; 		// 0 for false... and 1 for true
			if (!$fileTmpLoc) { 								// if file not chosen
			    exit("ERROR: Please browse for a file before clicking the upload button.");
			}
			if ($fileSize > 51200) exit('Error, somehow you got past my rock-solid client-side securtiy and are trying to upload a large file. Nice try :D');
			if(move_uploaded_file($fileTmpLoc, "uploads/$fileName")){
			    $output_array[] = "$fileName uploaded successfully";
			} else {
			    $output_array[] = "move_uploaded_file function failed on $filename";
			}
		}
	}
	exit(implode('<br />', $output_array));
}
?>