import React, { useEffect,useState } from "react";
import './Input.css';
//import {v4 as uuid} from 'uuid';
import { Fragment as _Fragment } from "react/jsx-dev-runtime"
//import value from "./db.json"
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime"

const Main = ()=>{
    
        const[query,setvalue] = useState("");
        const[task,settask] =useState([]);
        
        
            const handlechange = (e)=>{
        //const{value} = e.target
        setvalue(e.target.value);
        //console.log(e.target.value);
            };
        
        
        const handleclick = ()=>{
           let val = query.trim();
           if(val){
            post(val);
            setvalue("");
           }
        
        
        
        
        
        
        
        };
        
        
        
        const delete_to_do = (index)=>{
            var new_list = task;
            new_list.splice(index,1);
            settask([...new_list])
        }


        const onadd = (newtodo) => {
            settask([...task,newtodo]);
        };
        console.log(task);

       


        
        const post = async (query)=>{
let response = await fetch(" http://localhost:3000/todo/",{
    method:"POST",
    headers:{"content-type" : "application/json"},
    body: JSON.stringify({
title:query,
status:"false",
    }),
});
let data = await response.json();
onadd(data);

        };

        const todos = async ()=>{
            try{
                let data = await fetch(" http://localhost:3000/todo?_page=2");
                let res = await data.json();
                console.log(res);
                settask(res);

            }catch(e){
                console.log(e);
            }
        }
        ///todos();

        useEffect (()=>{
            todos();
        },[])


        
        
            return (
                <>
                <div id="box_search">
        <input value={query} onChange={handlechange} placeholder='Write Something'/>
        
        <button onClick={handleclick}>Add</button>
                </div>
        
        
        
                <div id='box' >
                    {task.map((item,index) => {
         return (
            <div key={item.id}>
                <h2>{item.title} - {item.status}</h2>
                <button onClick={()=>delete_to_do(index)}>Delete</button>
                
            </div>
        )
                    })} 
                </div>
        
                
                </>
            )
    

    
    
                }





export default Main;