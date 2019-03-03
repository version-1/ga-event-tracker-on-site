
# ga-event-tracker-on-site

Register to add event on your site.

## installation

```
npm install event-tracker-on-site
```

and

Load analytics.js on your site　

https://developers.google.com/analytics/devguides/collection/analyticsjs/

```
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```


## Usage

Load this script each page which should be tracked on your site.

```
const { eventregister } = require('ga-event-tracker-on-site')

eventregister(window)('.tracking-elements', 'click')
```


If you register events on one time, use batchEventRegister

```
const { eventregister } = require('ga-event-tracker-on-site')
const selectors = [
  'tracking-element-1',
  'tracking-element-2',
  'tracking-element-3',
  'tracking-element-4',
]

batchEventRegister(window)('.tracking-elements', 'click')
```

