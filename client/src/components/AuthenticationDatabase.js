import React,{useState,useEffect} from 'react';
import { FaRegistered } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs"
import './Table.css'
const AuthenticationDatabase = () => {

    const [data,setdata] = useState(0);

    useEffect(()=>{
      fetch('/auth_db').then(res=>res.json()).then(data=>setdata(data));
    },[]);

    const rows = [];
    for(let i=0;i<data.length;i++){
      rows.push(<tr>
                  <th scope="row">{i+1}</th>
                  <td>{data[i]['regNo']}</td>
                  <td>{data[i]['authKey']}</td>
                  <td>{data[i]['phNo']}</td>
                  </tr>)
    }

    return (
        <div className='table_data'>
            <table className=" table table-hover ">
                <thead className=' fs-4 table_head_data'>
                    <tr>
                        <th scope="col">S NO.</th>

                        <th scope="col"><FaRegistered />&nbsp;&nbsp;Vehicle Reg. Number</th>
                        <th scope="col"><FaKey />&nbsp;&nbsp;Authentication Key</th>
                        <th scope="col"><BsFillTelephoneFill />&nbsp;&nbsp;Phone Number</th>


                    </tr>
                </thead>
                <tbody className='fs-5 text-black'>
                  {rows}
                </tbody>
            </table>
        </div>
    )
}
export default AuthenticationDatabase;
