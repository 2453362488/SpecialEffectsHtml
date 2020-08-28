A Pen created at CodePen.io. You can find this one at http://codepen.io/suez/pen/aOgMxy.

 Originally I found this button on this site - https://isl.co/ and recreated it. Their version is broken in FF (already contacted them), because svg filter is imported as external file (I'm like 90% sure). This is a problem with FF, if svg, which containes filter, don't actually on the page (or have display: none) whole element with this filter will be invisible.

IE don't support css filters at all, so it have bigger blobs, and other browsers have smaller blobs with help of @supports rule (turns out this thing can be really useful!).