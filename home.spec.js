//protractor tests
    // browser.driver.manage().window().maximize();
    var width = 960;
var height = 600;
browser.driver.manage().window().setSize(width, height);
describe('angularjs homepage todo list', function() {
    // console.log(browser)
    browser.get(browser.params.client);
  beforeEach(function(){
    
  })
  it('should add a todo', function() {
    expect(browser.getTitle()).toEqual('Mike La Hay\'s single page web app');
  });
  it('should go to resume', function(){
    element(by.id('contactMe')).click();    
    expect(browser.getCurrentUrl()).toEqual(browser.params.client + 'hireme');
  })
});