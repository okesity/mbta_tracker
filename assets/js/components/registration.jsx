import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Login from './login';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
//import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';
//import 'mdbootstrap';

function Registration (props){
  let {root, session, SessionCreated} = props;

  function register() {
    var name = $('#sign-name').val();
    var email = $('#sign-email').val();
    var password = $('#sign-password').val();
    root.createUser(name, email, password, props.history);
  }


  return(
    <div className="container" style={{marginTop: '100px', marginLeft: '200px'}}>
      <div className="form-elegant">
             <Card style={{height: '600px', width: '450px', marginLeft: '500px', borderRadius: '15px'}}>
               <CardBody className="mx-4">
                 <div className="text-center">
                   <h3 className="dark-grey-text mb-5"><strong>Register</strong></h3>
                 </div>
                 <Input id="sign-name" label="Your name"/>
                 <Input id="sign-email" label="Your email"/>
                 <Input id="sign-password" label="Your password"/>
                 <br />
                 <div className="text-center mb-3">
                     <Button type="button" id= "sign-up-btn" onClick={register} className="btn-block z-depth-1a">Register</Button>
                 </div>
               </CardBody>
             </Card>
     </div>
   </div>
  )
  ;

}

export default withRouter(Registration);

// <div>
//       <h3>Create a New User</h3>
//         <Form>
//           <FormGroup>
//             <Label for="name">Name</Label>
//             <Input type="text" name="name" placeholder="name" id="name" />
//           </FormGroup>
//           <FormGroup>
//             <Label for="email">Email</Label>
//             <Input type="email" name="email" placeholder="email" id="email" />
//           </FormGroup>
//           <FormGroup>
//             <Label for="password">Password</Label>
//             <Input type="password" name="password" placeholder="password" id="password" />
//           </FormGroup>
//          <Button onClick = {register}>Submit</Button>
//         </Form>
// </div>
