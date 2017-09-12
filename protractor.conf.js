var config = {
// chromeOnly: true,
// directConnect: true,
	specs: ['home.spec.js'],
	 params: {
        client: 'http://localhost:3000/'
    },
	 // capabilities: {
  // public: "public",
  // passed: true,
  // build: "build-mean",
  // name: 'saucy'
  // //   browserName: 'chrome'
  // },
  framework: 'jasmine2',
  sauceBuild: 'mean-sauceid'
  // ,
  // ,
  // allScriptsTimeout: 60000,
  //   onPrepare: function () {
  //       var caps = browser.getCapabilities()
  //   },
  //     onComplete: function () {

  //       var printSessionId = function (jobName) {
  //           browser.getSession().then(function (session) {
  //               console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
  //           });
  //       }
  //       printSessionId("SAUCY");
  //   }
  // seleniumAddress: 'http://localhost:4444/wd/hub'

};



if (process.env.TRAVIS) {
  console.log('travis vars ' + process.env.TRAVIS)
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'browserName': 'chrome',
    "platform": "OS X 10.11",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'Build': 'meanstack',
    'BuildName': 'meanstack-build-name',
    'name': 'foobar',
    'public': 'public'
  };
}

module.exports.config = exports.config = config;