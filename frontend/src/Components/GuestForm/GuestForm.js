import React, {useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as IoIcons from 'react-icons/io5'
import './GuestForm.css'

export default function GuestForm(props) {

    const [formValues, setFormValues] = useState([{ name: '', email: '' }])

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }


    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        props.toggle()

        let guests = formValues.map((formValue) => {
            
                return ( {
                ...formValue,
                guestId: getRandomInt(30000, 99999)
            })
        })

        /** removes any blank inputs */
        let filteredGuests = guests.filter(guest => guest.name !== "")
       
        /** sends current guest list back to event page */
        props.addGuests(filteredGuests)
    }

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog guest--form-modal" scrollable={true}>
                <ModalHeader toggle={props.toggle} className="guest--form-header">
                    Add Guests 
                    <div className='guest--form-btns'>
                        <button className="guest--addBtn" type="button" onClick={() => addFormFields()}>
                        <IoIcons.IoPersonAdd />
                    </button>
                    </div>
                </ModalHeader>
                <ModalBody className="modal-body guest-form-modal--body">
                    <form onSubmit={handleSubmit}>
                        {formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                                {/** name field */}
                                <input className="guest--form--name-input" type="text" name="name" placeholder="Name" 
                                value={element.name || ""} 
                                onChange={e => handleChange(index, e)} 
                                />
                                {/** e-mail field */}
                                <input className="guest--form--email-input" placeholder="E-mail" type="text" name="email" 
                                value={element.email || ""} 
                                onChange={e => handleChange(index, e)} 
                                />
                                <div className='guest--form-btns'>
                                
                                { /** remove guests from list */
                                    // index ?
                                    <button type="button" className="guest--removeBtn" onClick={() => removeFormFields(index)}><IoIcons.IoPersonRemove /></button>
                                        // : null
                                }
                                
                                </div>
                                
                            </div>
                        ))}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="guest--submitBtn" type="submit" onClick={handleSubmit}>Submit</button>
                </ModalFooter>
            </Modal>
        </div>
    )
};