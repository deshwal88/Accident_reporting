import React from "react";
// import Menu from './Menu'
import Table from '../components/Table'
import EntryTable from "../components/EntryTable";
import AuthenticationDatabase from "../components/AuthenticationDatabase";
import { Route, Routes } from 'react-router-dom';
const Router = () => {
    return (
        <>
            {/* <Menu /> */}
            <Routes>
                <Route path='/' element={<EntryTable />} />
                <Route path='/accidentstatus' element={<Table />} />
                <Route path='/registervehicle' element={<AuthenticationDatabase />} />
            </Routes>
        </>
    )
}
export default Router;