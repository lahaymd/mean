var config = {
chromeOnly: true,
// directConnect: true,
	specs: ['home.spec.js'],
	 params: {
        client: 'http://localhost:3000/'
    },
	 capabilities: {
  public: "public",
  passed: true,
  build: "build-mean",
  name: 'saucy'
  //   browserName: 'chrome'
  },
  framework: 'jasmine2',
  // ,
  allScriptsTimeout: 60000,
    onPrepare: function () {
        var caps = browser.getCapabilities()
    },
      onComplete: function () {

        var printSessionId = function (jobName) {
            browser.getSession().then(function (session) {
                console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
            });
        }
        printSessionId("SAUCY");
    }
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