var config = {
// chromeOnly: true,
// directConnect: true,
	specs: ['home.spec.js'],
	 params: {
        client: 'http://localhost:3000/'
    }
    // ,
  

    //   multiCapabilities: [{
    //     // by default, these first two browsers will come up in 
    //     // Linux if you don't specify an OS
    // , {
    //     'name': 'Win8.1/IE11',
    //     'os': 'Windows 8.1',
    //     'browserName': 'internet explorer',
    //     'version': '11.0'
    // }],





   // capabilities: {
  // public: "public",
  // passed: true,
  // build: "build-mean",
  // name: 'saucy'
  // //   browserName: 'chrome'
  // },
  // framework: 'jasmine2',
  // sauceBuild: 'mean-sauceid'
  // ,


  // ,
  // ,
  // allScriptsTimeout: 60000,
    // onPrepare: function () {
    //     var caps = browser.getCapabilities()
    //     console.log(caps)
    //     console.log('buildnam' + BuildName)
    // }
    // ,
    // BuildName: 'my name'
    // ,
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



    // {
    //     'name': 'Chrome',
    //     'browserName': 'chrome'
    // }, {
    //     'name': 'Firefox',
    //     'browserName': 'firefox'
    // }, {
    //     'name': 'Win XP/IE8',
    //     'os': 'Windows XP',
    //     'browserName': 'internet explorer',
    //     'version': '8.0'
    // }, {
    //     'name': 'Win7/IE8',
    //     'os': 'Windows 7',
    //     'browserName': 'internet explorer',
    //     'version': '8.0'
    // }, {
    //     'name': 'Win7/IE9',
    //     'os': 'Windows 7',
    //     'browserName': 'internet explorer',
    //     'version': '9.0'
    // }, {
    //     'name': 'Win8/IE10',
    //     'os': 'Windows 8',
    //     'browserName': 'internet explorer',
    //     'version': '10.0'
    // }
if (process.env.TRAVIS) {
  console.log('travis vars ' + process.env.TRAVIS)
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.sauceBuild =  'sauce-build-' + process.env.TRAVIS_BUILD_NUMBER;
  config.multiCapabilities = [
  {
    'browserName': 'chrome',
    "platform": "OS X 10.11",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    // 'Build': 'meanstack',
    // 'BuildName': 'meanstack-build-name',
    'name': 'chrome-build'+ process.env.TRAVIS_BUILD_NUMBER,
    'public': 'public'
  }, {
    'browserName': 'safari',
    "platform": "OS X 10.11",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    // 'Build': 'meanstack',
    // 'BuildName': 'meanstack-build-name',
    'name': 'safari-build'+ process.env.TRAVIS_BUILD_NUMBER,
    'public': 'public'
  }, {
    'browserName': 'opera',
    "platform": "Windows 7",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    // 'Build': 'meanstack',
    // 'BuildName': 'meanstack-build-name',
    'name': 'opera-build'+ process.env.TRAVIS_BUILD_NUMBER,
    'public': 'public'
  }, {
    'browserName': 'internet explorer',
    "platform": "Windows 10",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    // 'Build': 'meanstack',
    // 'BuildName': 'meanstack-build-name',
    'name': 'internet explorer-build'+ process.env.TRAVIS_BUILD_NUMBER,
    'public': 'public'
  }, {
    'browserName': 'firefox',
    "platform": "OS X 10.11",
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    // 'Build': 'meanstack',
    // 'BuildName': 'meanstack-build-name',
    'name': 'firefox-build'+ process.env.TRAVIS_BUILD_NUMBER,
    'public': 'public'
  }
  ];
} else {
  config.multiCapabilities = [{
    'browserName': 'chrome'
  }
  // , {
  //   'browserName': 'firefox',
  //   version: '55.0.3',  
  //   firefox_binary: '/Applications/Firefox.app/Contents/MacOS/firefox'
  
  // }
  ]
}


















module.exports.config = exports.config = config;