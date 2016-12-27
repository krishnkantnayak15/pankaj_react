require('../helper')

const http = require('http')

const login = require('../react-classes/login')
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

afterEach(function(done) {
  done();
  return browser.ignoreSynchronization = true
})

after(function(){
  server.close()
})

//describe('login', () => {
  // before(function() {
  //   server = http.createServer(require('../../app'))
  //   server.listen(0)
  //   browser.baseUrl = 'http://localhost:' + server.address().port
  // })
  //
  // beforeEach(function(done) {
  //   done();
  //   return browser.ignoreSynchronization = true
  // })
  // after(function(done){
  //   server.close();
  // })

  describe('Given a browser', () => {
    describe('When I visit Login page', () => {
      it('Then I see a Login screen', () => {
        browser.get('/')

        element(by.css('h1')).getText().then((text) => {
          expect(text).to.equal('Web App - Login')
        })

        element(by.css('a')).getText().then((text) => {
          expect(text).to.equal('Let me see the albums Right Now')
        })

      })
    })
  })
//   describe('Given I am on the welcome page', () => {
//     describe('When I click on "Let me see the albums Right Now"', () => {
//       it('Then I see a title indicating it is the Albums list page', () => {
//         browser.get('/index')
//
//         element(by.css('a')).click()
//
//         element(by.css('h1')).getText().then((text) => {
//           expect(text).to.equal('Albums')
//         })
//
//         element(by.id("vvk")).getText().then((text) => {
//           expect(text).to.equal('abcd')
//         })
//         element(by.xpath('html/body/a')).getText().then((text) => {
//           expect(text).to.equal('Add albums')
//         })
//       })
//     })
//   })
//
//   describe('Albums has the functionality', () => {
//     it('add new Album ', () => {
//       browser.get('/index')
//       element(by.css('a')).click().then(() => {
//         element(by.xpath('html/body/a')).click().then(() => {
//           element(by.id('artist')).sendKeys('tArtist').then(() => {
//             element(by.id('album')).sendKeys('tAlbum').then(() => {
//               element(by.id('submit')).click().then(() => {
//                 element(by.css('h1')).getText().then((text) => {
//                   element(by.id("tArtist")).getText().then((text) => {
//                     expect(text).to.equal('tAlbum')
//                   })
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
//
//   describe('has the functionality', () => {
//     it('to update the existing', () => {
//       browser.get('/albums')
//       element(by.id("vvk")).click().then(() => {
//         element(by.id("edit")).click().then(() => {
//           element(by.id('artist')).sendKeys('tArtist').then(() => {
//             element(by.id("album")).sendKeys('tAlbum').then(() => {
//               element(by.id("submit")).click().then(() => {
//                 element(by.css("h1")).getText().then((text) => {
//                   expect(text).to.equal('Albums')
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
//   afterEach(function() {
//     AlbumCollection.remove({}, (err,album) => done())
//   })
//
//   after(function(){
//     server.close()
//   })
//
// })
