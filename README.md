# lab_web_multimedia
Experiments on web multimedia, including video and audio.

By: X. Chen  
Since: April 2015


About
========

It used to need plug-in, like adobe flash, or silverlight. Now HTML5 has navigator.getUserMedia feature implemented into some browsers. Now although HTML5 can capture video (and audio), but it's still hard to capture the stream and munipulate it, such as sending it to server side and display in another user's computer, such tasks still need plug-ins such as flash.

Ideally, if HTML5 can support audio/video natively, then javascript may suffice, and not need for plug-ins like flash/silverlight.

But it seems that to surpass this, there are issues more than just HTML5 standards and browser technology. Patents, privacy, policies are the obstacles.


Video
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


Audio
======

libmp3lame-js
------------
- https://github.com/akrennmair/libmp3lame-js

Recordmp3js
--------
- https://github.com/nusofthq/Recordmp3js


Examples
========================

Capture audio from browser
-------
- http://webaudiodemos.appspot.com/AudioRecorder/ - this captures wav, but size is too big.
- https://webaudiodemos.appspot.com/input/index.html
 

Capture both video and audio from browser
-------
- http://www.html5rocks.com/en/tutorials/getusermedia/intro/


More references
=====================

- http://www.jqueryrain.com/2013/10/best-jquery-webcam-plugin-example/
- http://stackoverflow.com/questions/8587882/capture-audio-input-with-flash-or-html5
- http://stackoverflow.com/questions/1318834/whats-the-status-of-the-html-5-video-tag-and-webcam-integration
- http://www.webrtc.org/
- http://www.html5rocks.com/en/tutorials/getusermedia/intro/
