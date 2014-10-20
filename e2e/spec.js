describe('My test', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000');
  });

  it('login should fail', function() {
    element(by.id('toolbar-login')).click();
    element(by.model('user.username')).sendKeys('zzz');
    element(by.model('user.password')).sendKeys('1234');
    element(by.id('login-btn')).click();
    expect(element(by.id('auth-error')).getText()).toEqual('Invalid credentials');
  });

});