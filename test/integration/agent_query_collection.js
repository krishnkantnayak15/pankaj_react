var expect = require('chai').expect
var Agent  = require('../../model/agent_query')

describe('Agent    .findByName()', (done) => {
  it('finds an agent Credentials from agent_details table', (done) => {
    Agent.findByName('pankaj',(error,data)=>{

      expect(data[0].user_name).to.equal('pankaj')
      expect(data[0].password).to.equal('123')
      done()
    })
  })
})
