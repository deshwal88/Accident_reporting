import React, { useState, useEffect } from "react";
import { AiFillMessage } from 'react-icons/ai'
import { FaAmbulance } from 'react-icons/fa';
import { BsReplyAllFill } from 'react-icons/bs';
import './Table.css';
const Table = () => {

    // function to format data received
    function formatStatus(data){
      if(data.sent==1){data.sent = 'Sent'}
      else{ data.sent = 'Send message'};
      if(data.status==0){data.status = 'Depart'}
      else{ data.status = 'Stop'};
      return data
    }

    // sending message manually if not sent
    async function msg(e){
      if (e.target.innerText=="Send message"){
        await fetch('/change', {method:'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({'id':e.target.value, 'sent':1})})
        changeState(temp+1);
      };
    };

    // sending help or stopping manually
    function status(e){
      if (e.target.innerText=="Depart"){
        e.target.id="statusStop"
        e.target.innerText = "Stop";
      }
      else{
        e.target.id="statusDepart"
        e.target.innerText = "Depart";
      }
    };


    const [data, setdata] = useState(0);
    const [temp, changeState] = useState(0);

    useEffect(()=>{
      var incoming = new EventSource('http://localhost:3001/incoming');
      incoming.addEventListener("message",(e)=>fetch('status').then(res=>res.json()).then(data=>setdata(data)))
    },[]);

    useEffect(() => fetch('/status').then(res=>res.json()).then(data=>setdata(data)),[temp]);


    const rows = [];
    for(let i=0;i<data.length;i++){
      data[i] = formatStatus(data[i]);

      rows.push(
        <tr>
            <th scope="row">{i+1}</th>
            <td><button type="button" onClick={msg} value={data[i].id} className="fs-5 b btn-1 btn btn-success" id={"msg"+data[i].sent}>{data[i].sent}</button></td>
            <td>{data[i].received}</td>
            <td><button type="button" onClick={status} className="fs-5 b btn-1 btn btn-success" id={"status"+data[i].status}>{data[i].status}</button></td>
        </tr>
      );
    }


    return (
        <div className='table_data'>
            <table className=" table table-hover ">
                <thead className=' fs-4 table_head_data'>
                    <tr>
                        <th scope="col">Entry ID</th>
                        <th scope="col"><AiFillMessage />&nbsp;&nbsp;Confirmation Message</th>
                        <th scope="col"><BsReplyAllFill />&nbsp;&nbsp;Message Response</th>
                        <th scope="col"><FaAmbulance />&nbsp;&nbsp;Ambulance Status</th>
                    </tr>
                </thead>
                <tbody className='fs-5 text-black'>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}
export default Table;
