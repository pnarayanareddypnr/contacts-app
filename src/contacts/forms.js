
import './forms.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Form({ selectedContact }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setgender] = useState('');

    useEffect(() => {
        console.log(selectedContact)
        setName(selectedContact.contactName);
        setEmail(selectedContact.contactEmail);
        setPhone(selectedContact.contactPhone)
        setgender(selectedContact.contactGender)
    }, [selectedContact])

    function handleNameChange(event) {
        setName(event.target.value);
    }
    // function handleEmailChange(event){
    //      setEmail(event.target.value)
    // }

    var handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    // var handleGenderChange = (event) => {
    //     setGender(event.target.value)
    // }

    function createContact() {
        var org = [];
        var storedContact = localStorage.getItem("contacts");
        if (storedContact != null) {
            org = JSON.parse(storedContact);
        }
        var contacDetails = {
            contactName: name,
            contactEmail: email,
            contactPhone: phone,
            contactGender: gender,
            id: uuidv4(),
        }
        org.push(contacDetails)
        localStorage.setItem("contacts", JSON.stringify(org));
    }

    function editContact(){
        var org = [];
        var storedContact = localStorage.getItem("contacts");
        if (storedContact != null) {
            org = JSON.parse(storedContact);
        }
        for(var i=0;i<org.length;i++){
            if(org[i].id == selectedContact.id){
                org[i].contactName = name;
                org[i].contactEmail = email;
                org[i].contactPhone  = phone; 
                org[i].contactGender = gender;
            }
        }
        localStorage.setItem("contacts", JSON.stringify(org));
    }

    function handleGenderChange(event) {
        setgender(event.target.value);
    }

    return (
        <div className="myForm">
            <form>
                <label className='lable'>
                    Name:
                    <input
                        type="text"
                        onChange={handleNameChange}
                        value={name}
                    />
                </label>

                <label className='lable'>
                    Email:
                    <input
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </label>

                <label className='lable'>
                    Phone:
                    <input
                        type="tel"
                        onChange={(event) => {
                            setPhone(event.target.value)
                        }}
                        value={phone}
                    />
                </label>
                <label className='lable'>Gender:
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender == 'Male'}
                        onChange={handleGenderChange}
                    /> Male
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={handleGenderChange}
                    /> Female
                    <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={gender === 'Other'}
                        onChange={handleGenderChange}
                    /> Other
                </label>
                {!selectedContact.id && (
                    <button onClick={createContact} className='btn'>ADD CONTACT</button>

                )}
                {selectedContact.id && (
                    <button onClick={editContact} className='btn'>EDIT CONTACT</button>
                )}


            </form>
        </div>
    )
}

export default Form;