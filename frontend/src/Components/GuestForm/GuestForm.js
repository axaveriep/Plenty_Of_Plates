import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './GuestForm.css'

function GuestForm(props) {

    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

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
        // alert(JSON.stringify(formValues));

        let guests = formValues.map((formValue) => {

            return ( {
                ...formValue,
                id: getRandomInt(30000, 99999)
            })
        })

        props.addGuests(guests)
    }

    return (
        <div>
            <Button
                onClick={toggle}>Invite Guests
            </Button>

            <Modal isOpen={modal} toggle={toggle} className="modal-dialog" scrollable={true}>
                <ModalHeader toggle={toggle} className="header">
                    Add Guests
                </ModalHeader>
                <ModalBody className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                                <label>Name</label>
                                <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                <label>Email</label>
                                <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
                                {
                                    index ?
                                        <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                        : null
                                }
                            </div>
                        ))}
                        <div className="button-section">
                            <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                            <button className="button submit" type="submit">Submit</button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                <Button onClick={toggle}>Okay</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default GuestForm