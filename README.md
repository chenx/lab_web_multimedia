# lab_web_multimedia
Experiments on web multimedia, including video and audio.

By: X. Chen  
Since: April 2015


About
========

For video, it used to need plug-in, like adobe flash, or silverlight. Now HTML5 has navigator.getUserMedia feature implemented into some browsers, but seems like there is still a way to go to manipulate data freely as in flash.

For audio, it seems browser still does not support audio capture directly. Plug-in like flash is needed.

Ideally, if HTML5 can support audio/video natively, then javascript may suffice, and not need for plug-ins like flash/silverlight.


Examples
========

Html5 video
---------
- http://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
- http://www.iandevlin.com/blog/2012/06/html5/filtering-a-webcam-using-getusermedia-and-html5-canvas

jQuery-webcam
------
- https://github.com/infusion/jQuery-webcam
- http://www.xarg.org/project/jquery-webcam-plugin/

This actually use flash to capture video in the first place, then draw it on a canvas. The stream size is big, each capture image is represented as a 2D array in javascript, size is 320*240 * 4bytes = 307200 bytes, actually including delimiter ";", the saved text file is 600KB each image. It's too big to be practical to send over network.

scriptcam
-----------
- https://www.scriptcam.com/

From its website: "ScriptCam is a popular JQuery plugin to manipulate webcams. Take snapshots, detect movement, colors, QR and barcodes, record videoclips and organize videochats".

This actually use flash to capture video in the first place, then post as text of about 8K bytes, or draw to a img tag. The size is only 8K bytes, so this is practical to send over network. Say in 10 fps, it's 80k/sec. For a 1GB/120min DVD movie, the rate is 140KB/sec. So these 2 are similar.

Although 24 fps is standard to look real, 10 fps is acceptable in quality. 5 fps not. 


More references
=====================

- http://www.jqueryrain.com/2013/10/best-jquery-webcam-plugin-example/
