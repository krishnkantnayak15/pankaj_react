
var Header = React.createClass({
 render() {
   return (
     <h1>Agents Login </h1>
   )
 }
});

var agentname

var ListCarriers = React.createClass({
  getInitialState(){
  console.log("second checks")
    return {username_carrier : "", password_carrier : ""}

  },
  getUserName(event){
    this.setState({username_carrier : event.target.value } )
  },
  getPassword(event){
    this.setState({password_carrier : event.target.value})
  },
  addCredentials(agentname,carrier){

  console.log('agentname' , agentname)
  console.log('carrier' , carrier)
  console.log('username_carrier' , this.state.username_carrier)
  console.log('password_carrier' , this.state.password_carrier)
  },
  render(){
   var rowsForEdit = []
    this.props.carriersEdit.forEach((element,index)=>{
      rowsForEdit.push(<tbody key={index}><tr><td >{element.carrier}</td><td><input type="text"  value={element.username_carrier} readOnly/></td><td><input type="password"   value={element.password_carrier} readOnly  /></td><td><input type="button" value="edit"/></td></tr></tbody>)
    })
    var rowsForAdd = []
     this.props.carriersAdd.forEach((element,index)=>{
       rowsForAdd.push(<tbody key={index}><tr><td >{element.carrier}</td><td><input type="text"  placeholder="username" onChange={this.getUserName()}/></td><td><input type="password" placeholder="password" onChange={this.getPassword}/></td><td><input type="button" value="add" onClick = {this.addCredentials(agentname,element.carrier)}/></td></tr></tbody>)
     })
  return(
  <div >
     <span><table id ="first">{rowsForAdd}</table></span><br/><br/><br/>
     <table id ="first">{rowsForEdit}</table>}
  </div>
   )
  }
})
var LoginForm = React.createClass({
getInitialState() {
  return {action:'login' , error:"",carriersEdit : [], carriersAdd : [],agentName:"",}
},


 ValidateLogin() {
  var updateState = this.setState.bind(this)
   var email = this.refs.LoginEmail.state.value;
   var password = this.refs.LoginPassword.state.value;
   var params ={username: email,password:password};

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function(res) {

    if (this.readyState == 4 && this.status == 200) {
    agentname=JSON.parse(res.target.response).agentname
       if(agentname){
       console.log("agent =>",JSON.parse(res.target.response).agentname)
       console.log("carriersAddVar =>",JSON.parse(res.target.response).carriersAddVar)
       console.log("carriersEditVar =>",JSON.parse(res.target.response).carriersEditVar)
         updateState({action:"success",carriersAdd:JSON.parse(res.target.response).carriersAddVar,agentName : agentname,carriersEdit:JSON.parse(res.target.response).carriersEditVar})
       }
        else{
            updateState({error:"wrong username or password"})
        }
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(params));
  //xhttp.send(params);
 },
 render()
  {

 switch(this.state.action){
  case "login":

  return (
    <div className="loginDiv">
      <Header />
      <LoginEmail ref="LoginEmail"/>
      <LoginPassword ref="LoginPassword"/>
      <br></br>
      <LoginSubmit ValidateLogin={this.ValidateLogin}/>
       <h1>{this.state.error}</h1>
    </div>)
 case "success":
 return (
 <div>
     <h1 >Carrier Details</h1>
     <h3>welcome {agentname} </h3>
     <ListCarriers carriersAdd={this.state.carriersAdd} carriersEdit={this.state.carriersEdit} agentName={agentname} />
  </div>
 )
 }

}
});


var LoginEmail = React.createClass({
 getInitialState() {
   return {value: null}
 },
 onChange(e) {
   this.setState({value: e.target.value});
 },
 render() {
   return (
     <div className="LoginEmailDiv">
       <h6>Email:</h6>
       <input type="text" onChange={this.onChange} placeholder="username"  id="user"/>
     </div>
   )
 }
});

var LoginPassword = React.createClass({
 getInitialState() {
   return {value: null}
 },
 onChange(e) {
   this.setState({value: e.target.value});
 },
 render() {
   return (
     <div className="LoginEmailDiv">
       <h5>Password:</h5>
       <input type="password" onChange={this.onChange} placeholder="password" id="pass"/>
     </div>
   )
 }
});

var LoginSubmit = React.createClass({
 onClick() {
   this.props.ValidateLogin();
 },

 render() {
   return (
     <button onClick={this.onClick}>Login</button>
   )
 }

});

ReactDOM.render(
 <LoginForm />,
 document.getElementById("main")
);
