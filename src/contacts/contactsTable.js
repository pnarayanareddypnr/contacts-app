import React, { useEffect, useState } from "react";
import './contactsTable.css';

function ContactsTable({onSelectedContact}) {
    const [originalContacts, setOriginalContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    function getContacts(){
           // Fetch contacts from local storage on component mount
           const storedContacts = localStorage.getItem('contacts');
           if (storedContacts != null) {
               setOriginalContacts(JSON.parse(storedContacts));
           }
    }

    function deleteContact(id){
        var rem=[] 
        for(var i=0;i<originalContacts.length;i++){
           if(originalContacts[i].id !=id){
            rem.push(originalContacts[i])
           } 
        } 
        localStorage.setItem('contacts',JSON.stringify(rem));
        getContacts();

    }

    function editContact(selectedContact){
        onSelectedContact(selectedContact)

    }

    function createTableData() {

        const newContacts = originalContacts.map((item, index) => {
            console.log(item);
            return <tr key={index}>
                <td>{item.contactName}</td>
                <td>{item.contactEmail}</td>
                <td>{item.contactPhone}</td>
                <td>{item.contactGender}</td>
                <td>
                    <button  className="btns" onClick={()=>editContact(item)}>Edit </button>
                    <button className="btns" onClick={()=>deleteContact(item.id)}>Delete </button>
                </td>
               
            </tr>
        })
        return newContacts
    }
    return (
        <div className="container">
            <div className="center">
                <h1 className="title" >CONTACTS LIST</h1>
            </div>
            <div className="table">
                <table>
                    <thead className="header">
                        <tr className="headerRow">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createTableData()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContactsTable;
