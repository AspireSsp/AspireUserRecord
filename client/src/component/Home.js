import { createContext, useEffect, useState } from "react";
import { NavLink, useNavigate, } from 'react-router-dom'
import '../App.css';

const infoData = createContext();


function Home() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    
    const getUsers = async()=>{
        try {
          const data = await fetch('/api/v1/users' , {
            method: 'GET',
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include",
          });

          const users = await data.json();
          // console.log(users.users);
          setUsers(users.users)

        } catch (error) {
          alert(error);
        }
    }
    useEffect(()=>{
       
          getUsers();
        
    },[]);

    const deleteData = async(id)=>{
      // console.log(id);
      try {
        const data = await fetch(`/api/v1/user/${id}` , {
          method: 'DELETE',
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
        });

        const res = await data.json();
        if(res.success){
          getUsers();
        }
      } catch (error) {
        console.log(error);
      }
      
    }
    const arr = [];
    const check = (ele)=>{
      if(arr.includes(ele)){
        const index = arr.indexOf(ele);
        arr.splice(index, 1);
      }else{
        arr.push(ele);
      }
      console.log(arr);
    }
   


    const sendMail = async(e)=>{
   
      const data = await fetch("/api/v1/send/mail" , {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
          },
          body: JSON.stringify(
            arr
          )
      });
      const res = await data.json();
      // console.log(res)
      
      if(res.success){
          alert(res.message);
          navigate("/");
      }else{
          alert(res.message);
      }
  }

  return (
    <div className="App">
      <div className="btn-compo">
        <h1>full-stack internship coding task</h1>
        <div className="btn-field">
          <NavLink to="/register" className="btn btn-primary btn-lg m-2">+ ADD user</NavLink>
          <button type="button" className="btn btn-primary btn-lg m-2 " onClick={sendMail}>Send Data to Gmail</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">select</th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Phone No</th>
            <th scope="col">Email</th>
            <th scope="col">Hobbies</th>
            <th scope="col">Update</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
        {
          users.map((ele,item)=>{
            return(
              <tr>
               
                <th scope="row">
                  <div className="form-check ">
                    <input className="form-check-input ml-4" type="checkbox" value="" id="flexCheckDefault" onClick={()=>{check(ele)}} />
                  </div>
                </th>
                <th scope="row">{item}</th>
                <td>{ele.name}</td>
                <td>{ele.phone}</td>
                <td>{ele.email}</td>
                <td>{ele.hobbies}</td>
                <td><NavLink to={`/update/${ele._id}`} className="btn btn-primary"  >
                      Update
                    </NavLink>
                </td>
                <td>
                
                <button type="button" className="btn btn-danger" onClick={()=>{ deleteData(ele._id) }}>Delete</button>
                
                </td>
                
              </tr>
            )
          })
        }
          
        
        </tbody>
      </table>
    </div>
  );
}

export default Home;
export { infoData }