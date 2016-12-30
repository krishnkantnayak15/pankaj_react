function Login(email, password) {
if (email) {
 ShowSuccessAtDOM("container", email);
} else {
 ShowFailureAtDOM("container");
}
};

function ShowSuccessAtDOM(id, name) {
 ReactDOM.unmountComponentAtNode(document.getElementById("result"));
 ReactDOM.render(
   <LoginSuccess name={name} />,
   document.getElementById("result")
 );
};

function ShowFailureAtDOM(id) {
 ReactDOM.unmountComponentAtNode(document.getElementById("result"));
 ReactDOM.render(
   <LoginFail />,
   document.getElementById("result")
 );
};

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
    console.log("heeeee")
    this.setState({username_carrier : event.target.value } )
  },
  getPassword(event){
     console.log("haaa")
    this.setState({password_carrier : event.target.value})

  },
  add(event){

  console.log("eventadd" , event)
    console.log("in add")
    var updateProps = this.props.modifyState

     var credentialObj = {agent_name : agentname,carrier : event.target.id, username_carrier : this.state.username_carrier, password_carrier : this.state.password_carrier }
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(res) {
     if (this.readyState == 4 && this.status == 200) {
        updateProps(JSON.parse(res.target.response).carriersAddVar,JSON.parse(res.target.response).carriersEditVar)
     }
   };
   xhttp.open("POST", "/add-credential", true);
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhttp.send(JSON.stringify(credentialObj));
  },
  editCredentials(e) {
   console.log("fdsf",this.refs.set.disabled)
   this.refs.set.disabled
  },
  render(){

   var rowsForEdit = []
    this.props.carriersEdit.forEach((element,index)=>{
      rowsForEdit.push(<tbody key={index}><tr><td >{element.carrier}</td><td><input type="text" ref="set" disabled={isDisabled ? "disabled" : false} placeholder= {element.username_carrier} /></td><td><input type="password" id="set" placeholder = {element.password_carrier}   /></td><td><button  onClick={this.editCredentials}>edit</button></td></tr></tbody>)
    })
    var rowsForAdd = []
     this.props.carriersAdd.forEach((element,index)=>{
       rowsForAdd.push(<tbody  id ={element.carrier} key={index}><tr><td >{element.carrier}</td><td><input type="text" onChange={this.getUserName} id ={element.carrier} /></td><td><input type="password" onChange={this.getPassword} id ={element.carrier}  /></td><td><button  onClick = {this.add}  id = {element.carrier}> add </button></td></tr></tbody>)
     })
  return(
  <div >
     <span><table id ="first">{rowsForAdd}</table></span><br/><br/><br/>
     <table id ="first">{rowsForEdit}</table>
   </div>
   )
  }
})

var LoginForm = React.createClass({
getInitialState() {
  return {action:'login' , error:"",carriersEdit : [], carriersAdd : []}
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
         updateState({action:"success",carriersAdd:JSON.parse(res.target.response).carriersAddVar,carriersEdit:JSON.parse(res.target.response).carriersEditVar})
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
 modifyState(addArr,editArr){
   this.setState({carriersEdit : editArr,carriersAdd : addArr})
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
     <ListCarriers carriersAdd={this.state.carriersAdd} carriersEdit={this.state.carriersEdit} modifyState={this.modifyState}/>
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
