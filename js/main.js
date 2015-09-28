/*
 * File Upload Client Script
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
 * @global formdata, arr
 * @abstractBoth global variables are needed because the FormData object is
 * a black hole. Once something goes in, it never comes out
 */
var formData = new FormData();
var arr = [];

/*
 * @name uploadFile
 * @abstract This function makes an AJAX post call to a php upload script, posting the form data
 * It can send multiple files ... AT ONCE! What a time to be alive!
 */
function uploadFile() {
  var request = new XMLHttpRequest();
  request.upload.addEventListener('progress', updateProgress);
  request.addEventListener('load', function(e){$('#status').html(request.responseText);},false);
  request.upload.addEventListener('error', transferFailed);
  request.upload.addEventListener('abort', transferCancelled);
  request.open('POST', 'upload.php');
  request.send(formData);

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status >= 200 && request.status < 400) {
        updateFileListing();
        $('#select-upload').empty();
      }
    }
  }
}

/* 
 * @name updateProgress
 * @param event
 * @abstract This callback function handles updating the progress meter, number of bytes
 *            uploaded, and the % uploaded. It's a first class function passed to the
 *             progress event listener
 */
function updateProgress(event) {
  $('#loaded_n_total').html('Uploaded ' + event.loaded + ' bytes of ' + event.total);
  var percent = (event.loaded / event.total) * 100;
  $('#progressBar').val(Math.round(percent));
  $('#status').html(Math.round(percent) + '% uploaded ... please wait');
}

/* 
 * @name transferComplete
 * @param event
 * @abstract This callback function displays status text when an upload does complete
 */
function transferComplete(event) {
  $('#status').html(event.responseText);
}

/* 
 * @name transferFailed
 * @param event
 * @abstract This callback function displays an error should the upload not complete
 */
function transferFailed(event) {
  $('#status').html('Upload Failed');
}

/* 
 * @name transferCancelled
 * @param event
 * @abstract This callback function displays an error when the client or server terminates
 *            terminates the connection
 */
function transferCancelled(event) {
  $('#status').html('Upload Aborted');
}


/* 
 * @name updateFileUploadList
 * @param file_array
 * @abstract This function attaches the files you wish to upload to the DOM
 *            giving oyu a preview about what you are sending to the server.
 */
function updateFileUploadList(file_array) {
  $('#upload-list').empty();
  var fragment = document.createDocumentFragment();
  for (var i=0;i<file_array.length;i++) {
    var filename = file_array[i];
    var listEl = document.createElement('li');
    listEl.innerText = filename;
    fragment.appendChild(listEl);
  }

  document.getElementById('upload-list').appendChild(fragment);
}

/* 
 * @name attachFilesInDirectory
 * @param json_files
 * @abstract This function receives the param json_files. Json_files contains
 * metadata about the file contents on the server, including a download link
 *          
 */
function attachFilesInDirectory(json_files) {
  $('#browse-files').empty();

  var frag = document.createDocumentFragment();
    for (var filename in json_files) {
      if (json_files.hasOwnProperty(filename)) {
        // create the list elements
        var listEl = document.createElement('li')

        var div0 = document.createElement('div');
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');

        div0.classList.add('file-column');
        div1.classList.add('file-column');
        div2.classList.add('file-column');
        div3.classList.add('file-column');

        div0.innerText = json_files[filename]['type']
        div1.innerText = filename;
        div2.innerText = json_files[filename]['time'];
        div3.innerHTML = '<a href="' + json_files[filename]['source'] + '">Download</a>';
        listEl.appendChild(div0);
        listEl.appendChild(div1);
        listEl.appendChild(div2);
        listEl.appendChild(div3);

        
        frag.appendChild(listEl);
      }
    }
  document.getElementById('browse-files').appendChild(frag);
}

/* 
 * @name updateFileListing
 * @abstract Updates the 'My Files' pane. Used during startup and after any file upload
 *          
 */
function updateFileListing() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status >= 200 && request.status < 400) {
        // Attach the response to the file listing page
        // put into function
        attachFilesInDirectory(JSON.parse(request.responseText));
      } else {
        // We reached our target server, but it returned an error
        console.log('There was an error processing')
      }
    }
  }

  request.onerror = function() {
    console.log('Connection error');
  }

  request.open('GET', 'file_list.php', true);
  request.send(null);
}

/*
 * @abstract Once the dom is loaded, attaches even handlers to the file input button 
 *           and the upload files button. Then it finally populates the My Files directory
 */
$( document ).ready(function() {

  $('#input').change(function(){
    if ($('#input').val() != '') {
     var f = (this.files);
      for (var i =0; i < f.length; i++){
        // do at end since you cannot append
        if (f[i].size > 51200){
          alert('The file ' + f[i].name + ' has exceeded the maximum size of 50kb. Please try again');
          return;
        }
        formData.append('files[]', f[i]);
        arr.push(f[i].name);
      }

      $('#uploadFiles').removeClass('hidden')
      $('#progressBar').removeClass('hidden')
      updateFileUploadList(arr);

    } else if(arr.length == 0 && $('#input').val == '') {
      $('#uploadFiles').addClass('hidden')
      $('#progressBar').addClass('hidden')
    }
  });

  $('#uploadFiles').on('click', function() {
    uploadFile();
  })

  updateFileListing();

});