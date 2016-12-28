require('../helper')
const http = require('http')
const dbLogin = require('../../config/db')
var server

before(function() {
 server = http.createServer(require('../../app'))
 server.listen(0)
 browser.baseUrl = 'http://localhost:' + server.address().port
})


beforeEach(function(done) {
 done();
 return browser.ignoreSynchronization = true
})

// afterEach(function() {
//   dbCollection.remove({})
// })

after(function(){
 server.close()
})

describe('login Credentials', () => {
 describe('Given a browser', () => {
   describe('When I visit the loginCredentials website', () => {
     it('Then I see a login page', () => {
       browser.get('/')

       element(by.css('h1')).getText().then((text) => {
         expect(text).to.equal('Agents Login')
       })
       element(by.css('h6')).getText().then((text) => {
         expect(text).to.equal('Email:')
       })
       element(by.css('input')).getAttribute('placeholder').then((text) => {
         expect(text).to.equal('username')
       })
       element(by.css('h5')).getText().then((text) => {
         expect(text).to.equal('Password:')
       })
       element(by.id('pass')).getAttribute('placeholder').then((text) => {
         expect(text).to.equal('password')
       })
       element(by.css('button')).getText().then((text) => {
         expect(text).to.equal('Login')
       })
     })
   })

   describe('When I enter the valid data', () => {
     it('Then it show failure message', () => {
       browser.get('/')
       element(by.id('user')).sendKeys('pankaj');
       element(by.id('pass')).sendKeys(12333);
       element(by.css('button')).click()
       element.all(by.css('h1')).get(1).getText().then((text) => {
         expect(text).to.equal('wrong username or password')
       })
       element(by.css('h1')).getText().then((text) => {
         expect(text).to.equal('Agents Login')
       })

     })
   })


describe('When I enter the valid data', () => {
  it('Then it show failure message', () => {
    browser.get('/')
    element(by.id('user')).sendKeys('pankaj');
    element(by.id('pass')).sendKeys(123);
    element(by.css('button')).click()
    element.all(by.css('h1')).get(0).getText().then((text) => {
      expect(text).to.equal('hi')
    })
    
  })
})

})
})
