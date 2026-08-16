
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css'
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function App() {
  let [details,setDetails]=useState([]);

  let [temp,setTemp]=useState({
    name:"",
    emailid:"",
    phoneNo:"",
    qualification:"",
    role:"",
    location:""
  });
  let [status,setStatus]=useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = (data) => {
    setTemp(data);
    setShow(true)
  };

  const Change=(d)=>{
    setTemp({
    ...temp,
    [d.target.name]: d.target.value,
  });
  };

useEffect(()=>{
  fetch('https://6a27e8504e1e783349a49897.mockapi.io/Employee/employee', {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(tasks => {
  // Do something with the list of tasks
  setDetails(tasks.reverse());
}).catch(error => {
  // handle error
  console.log(error)
})
},[status]);

const updateUser=()=>{
  handleClose();
  
fetch(`https://6a27e8504e1e783349a49897.mockapi.io/Employee/employee/${temp.id}`, {
  method: 'PUT', // or PATCH
  headers: {'content-type':'application/json'},
  body: JSON.stringify(temp)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  // Do something with updated task
  setStatus(!status);
}).catch(error => {
  // handle error
  console.log(error);
})
 }
 
const deleted =(id)=>{
  
fetch(`https://6a27e8504e1e783349a49897.mockapi.io/Employee/employee/${id}`, {
  method: 'DELETE',
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  // Do something with deleted task
  setStatus(!status);
}).catch(error => {
  // handle error
  console.log(error);
})
}

const addShow=()=>{
  setShow(true);
  setTemp({
    name:"",
    emailid:"",
    phoneNo:"",
    qualification:"",
    role:"",
    location:""
  });
}

const addUser=()=>{
setShow(false);
fetch('https://6a27e8504e1e783349a49897.mockapi.io/Employee/employee', {
  method: 'POST',
  headers: {'content-type':'application/json'},
  // Send your data in the request body as JSON
  body: JSON.stringify(temp)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  // do something with the new task
  alert("Created Successfully");
  setStatus(!status);
}).catch(error => {
  // handle error
})
}
 console.log(temp);
  return (
    <>
     <h1 className='text-center mb-2'>Employee Management</h1>
     <div className='text-end'>
     <Button variant="success" onClick={()=>addShow()}>Add User</Button>
     </div>
     <Table striped bordered hover variant="dark" className="text-center">
      <thead>
        <tr className='fs-4'>
          <th>id</th>
          <th>Name</th>
          <th>EmailID</th>
          <th>PhoneNo</th>
          <th>Qualification</th>
          <th>Role</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {details?.map((e,i)=>{
          return(
          <tr key={i}>
          <td>{i+1}</td>
          <td>{e.name}</td>
          <td>{e.emailid}</td>
          <td>{e.phoneNo}</td>
          <td>{e.qualification}</td>
          <td>{e.role}</td>
          <td>{e.location}</td>
          <td> <Button variant="primary" className='me-3' onClick={()=>handleShow(e)}>Edit</Button><Button variant="danger" onClick={()=>deleted(e.id)}>Delete</Button></td>
        </tr>
          )
        })}
      </tbody>
    </Table>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                 name="name"
                placeholder="Enter name"
                value={temp.name}
                onChange={Change}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                 name="emailid"
                placeholder="name@example.com"
               value={temp.emailid}
                onChange={Change}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                 name="phoneNo"
                placeholder="Enter phone number"
                value={temp.phoneNo}
                onChange={Change}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                placeholder="Enter your qualification"
                value={temp.qualification}
                onChange={Change}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                 name="role"
                placeholder="Enter your Role"
                value={temp.role}
                onChange={Change}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                 name="location"
                placeholder="Enter your location"
                value={temp.location}
                onChange={Change}
                autoFocus
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {temp.id==undefined ?<Button variant="warning" onClick={addUser}>
            update
          </Button>:
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>}
         
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App



