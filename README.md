# Simple FileUpload
This is a simple File Upload Script that contains code for both the client and server side. It is only compatible with modern browsers(>= IE10) because the FormData Object is heavily used.
The excellent jQuery File Upload was an inspiration and is preferable due to the fact that it handles legacy browsers.

Here is a [live demo](http://brandturner.com/test). Once this script is cloned/installed, it should work right out of the box. If you are having issues, you may need to change the permissions on the upload folder

## Upload Parser
While doing this project, it occured to me way to late that file upload is usually a blocking I/O operation and, thusly, would make the perfect use-case for leveraging Node on the server side. The server.js file was my attempt at using Node and I will probably finish that sometime tomorrow. I just wanted to explain why that server.js file was in the project.

## Next Steps
So there's obviously a ton more that you can do with a file upload utility. Here is a list of my todo's: 
* Implement Drag and Drop API
* May be overkill for this project, but integrate into a front-end framework
* Run Jasmine/PHPUnit Test
* Sync testing w/ Travis CI
* restrict certain files based on type
* resize image uploads
* allow sorting of file directory
* Include animations that tween between states
