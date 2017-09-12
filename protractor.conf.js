var config = {
chromeOnly: true,
// directConnect: true,
	specs: ['home.spec.js'],
	 params: {
        client: 'http://localhost:3000/'
    },
	 // capabilities: {
  //   browserName: 'chrome'
  // }
  framework: 'jasmine2',
  // ,
  allScriptsTimeout: 60000,
  build: "build-1234",
  public: "public",
  // seleniumAddress: 'http://localhost:4444/wd/hub'

};



if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  };
}

exports.config= config