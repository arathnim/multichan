var fs = require('fs');

fs.copyFileSync("./resources/OverlayScrollbars.js", "./public/OverlayScrollbars.js");
fs.copyFileSync("./resources/OverlayScrollbars.css", "./public/OverlayScrollbars.css");

console.log("Project metadata written");
