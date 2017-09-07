//protractor tests
describe('angularjs homepage todo list', function() {
    // console.log(browser)
    browser.get('http://localhost:4000');
  beforeEach(function(){
    
  })
  it('should add a todo', function() {
    expect(browser.getTitle()).toEqual('Mike La Hay\'s single page web app');
  });
  it('should go to resume', function(){
    element(by.id('contactMe')).click();    
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4000/hireme');
  })
});