exports.config = {
	chromeOnly: true,
directConnect: true,
	specs: ['home.spec.js'],
	 params: {
        client: 'http://localhost:3000/'
    },
	 capabilities: {
    browserName: 'chrome'
  }
  // seleniumAddress: 'http://localhost:4444/wd/hub',
};