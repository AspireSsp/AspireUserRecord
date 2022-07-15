import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
        const {id} = useParams("")

        const navigate = useNavigate();

        const [inVal, setInVal] = useState({
            name: "",
            phone: "",
            email : "",
            hobbies: "",
        })
    
        const setData = (e)=>{
            // console.log(e.target.value);
            const {name, value} = e.target;
            setInVal((preval)=>{
                return{
                ...preval,
                [name] :value
                }
            })
        }

        const updateData = async()=>{
            try {
              const data = await fetch(`/api/v1/user/${id}` , {
                method: 'GET',
                headers:{
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "include",
              });
          
              const res = await data.json();
              setInVal(res.user)
            } catch (error) {
              console.log(error);
            }
          }

          useEffect(() => {
            updateData();
          }, []);

          const sendData = async(e)=>{
            e.preventDefault();
            const {name, phone, email, hobbies} = inVal;
            const data = await fetch(`/api/v1/user/${id}` , {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name, phone, email, hobbies
                })
            });
            const res = await data.json();
            if(res.success){
                alert(res.message);
                navigate("/");
            }else{
                alert(res.message);  
            }

          }
  return (
    <div>
        <form>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Name</label>
                <input type="name" name='name' value={inVal.name} onChange={setData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Phone</label>
                <input type="text" name='phone' value={inVal.phone} onChange={setData} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Email</label>
                <input type="email" name='email' value={inVal.email} onChange={setData} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Hobbies</label>
                <input type="text" name='hobbies' value={inVal.hobbies} onChange={setData} className="form-control" id="exampleInputPassword1" />
            </div>
            
            <button type="submit" onClick={sendData} className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Update