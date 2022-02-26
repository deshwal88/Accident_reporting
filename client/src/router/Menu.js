import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaListAlt } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import './Menu.css'
const Menu = () => {
    return (
        <>
            <div className='menu_style'>
                <NavLink exact='true' to='/'><FaListAlt className='entry' /> &nbsp;Entries</NavLink>
                <NavLink exact='true' to='/accidentstatus'><FaChartBar className='status' /> Status Report</NavLink>
                <NavLink exact='true' to='/registervehicle'><FaDatabase className='validate' /> &nbsp;Auth Database</NavLink>
            </div>
        </>

    )
}
export default Menu;
