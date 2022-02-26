import React,{useState,useEffect} from 'react';
import { ImLocation2 } from "react-icons/im";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaRegistered } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import './Table.css'



const EntryTable = () => {
    const [data,setdata] = useState(0);

    useEffect(()=>{
      if(data==0) fetch('entries').then(res=>res.json()).then(data=>setdata(data));

      var incoming = new EventSource('http://localhost:3001/incoming');
      incoming.addEventListener("message",(e)=>fetch('entries').then(res=>res.json()).then(data=>setdata(data)))
    },[]);

    const rows = [];
    for(let i=0;i<data.length;i++){
      rows.push(<tr >
                <th scope="row">{data[i].id}</th>
                <td>{data[i]['regNo']}</td>
                <td>{data[i]['lat'].toString()+', '+data[i]['long'].toString()}</td>
                <td>{data[i]['date']}</td>
                <td>{data[i]['time']}</td>
                </tr>
      );
    }

    return (
        <div className='table_data'>
            <table className=" table table-hover ">
                <thead className=' fs-4 table_head_data'>
                    <tr>
                        <th scope="col"> Entry ID</th>
                        <th scope="col"><FaRegistered />&nbsp;&nbsp;Vehicle Reg. Number</th>
                        <th scope="col"><ImLocation2 />Location</th>
                        <th scope="col"><BsFillCalendar2DateFill />&nbsp;&nbsp;Accident Date</th>
                        <th scope="col"><MdOutlineAccessTimeFilled />&nbsp;&nbsp;Accident Time</th>
                    </tr>
                </thead>
                <tbody className='fs-5 text-black'>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}
export default EntryTable;
