# gulp-auto-restart
This package add 'gulp-auto-restart' task.

## Usage

```javascript
// gulpfile.js
var autoRestart = require('gulp-auto-restart');
autoRestart({'task': 'watch'});
```

`gulp auto-restart` spawn child gulp process with `watch --restart` options and restart it on gulpfile.js change.


