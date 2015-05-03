console.log('Starting MineJS GUI')

var app = require('app')
var BrowserWindow = require('browser-window')
var cp = require('child_process')
var fs = require('fs')
var yaml = require('js-yaml')

console.log('Starting MineJS Server')
var n = cp.fork('MineJS/server.js')

console.log('Getting the server port')
var port = getPort()

console.log('Waiting for the app...')

app.on('ready', function() {
	console.log('Initializing GUI')
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.$ = mainWindow.jQuery = require(__dirname + '/MineJS/static/js/jquery.js')
  mainWindow.loadUrl('http://localhost:' + port)
})

function getPort() {
	var configFile = null
	try {
		configFile = fs.readFileSync(__dirname + "/MineJS/config/config.yml")
	}
	catch(e) {
		if(e.code == "ENOENT")
			configFile = fs.readFileSync(__dirname + "/MineJS/core/defaultConfig/config.yml")
		else
			console.trace(e)
	}

	var config = yaml.safeLoad(configFile)

  return config.port
}
