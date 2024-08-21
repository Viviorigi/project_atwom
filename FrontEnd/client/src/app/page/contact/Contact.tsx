import React, { useState } from 'react'
import styled from 'styled-components'
import { BaseButtonGreen } from '../../styles/button';
import { ContactDTO } from '../../model/ContactDTO';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ContactService } from '../../services/ContactService';

const ContactMapWrapper = styled.div`
    border: none;
    background-color: var(#eff0e4da);
`;

const ContactMessage = styled.div`
    background: var(#eff0e4da);
    border: none;
`;

export default function Contact() {

    const [contact, setContact] = useState<ContactDTO>(
        new ContactDTO()
    );

    const handleChangeText = (event: any) => {
        const { name, value } = event.target;
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const setContactState = () => {
        setContact((prev: ContactDTO) => {
            return {
                ...prev,
                email: prev.email || "",
                firstName: prev.firstName || "",
                lastName: prev.lastName || "",
                question: prev.question || "",
            };
        });
    };

    const chk = () => {
        if (contact.firstName === undefined || contact.firstName === "") {
            setContactState();
            return false;
        }
        if (contact.lastName === undefined || contact.lastName === "") {
            setContactState();
            return false;
        }
        if (contact.question === undefined || contact.question === "") {
            setContactState();
            return false;
        }
        if (contact.email === undefined || contact.email === "") {
            setContactState();
            return false;
        }
        return true;
    };

    const submit = () => {
        if (!chk()) {
            return;
        }
        Swal.fire({
            title: `Confirm`,
            text: "Do you want to submit",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#89B449",
            cancelButtonColor: "#E68A8C",
            confirmButtonText: `Yes`,
            cancelButtonText: `No`,
        }).then((result) => {
            if (result.value) {
                ContactService.getInstance()
                    .create(contact)
                    .then((resp: any) => {
                        if (resp) {
                            toast.success(resp.data.message);
                        }
                    })
                    .catch((error: any) => {
                        toast.error(error.response.data.message);
                    });
            }
        });
    };



    return (
        <>
            <ContactMapWrapper>
                <div className="p-5">
                    <div className="container-xxl">
                        <div className="row text-center align-items-center">
                            <div className="col-lg-6 col-md-12 p-3">
                                <div className="map card m-auto embed-responsive embed-responsive-16by9">
                                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63826.53634427054!2d37.09345325!3d-1.04201225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4e5b27c66117%3A0xb6f8a7e126152c26!2sThika!5e0!3m2!1sen!2ske!4v1668532780442!5m2!1sen!2ske"
                                        allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="card p-5">
                                    <h2 className='footer-title mb-3'><b>Contact Us</b></h2>
                                    <p className='mb-2'><b>Address:</b>  VietNam, VietNam, 2nd floor</p>
                                    <p className='mb-2'><b>Phone:</b>  <a className='footer-tel' href="tel:+1234567890">Call us at +1 (234) 567-890</a></p>
                                    <p className='mb-4'><b>Hours:</b>  From 8 a.m To 6 p.m</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quos iusto rerum architecto a eaque consequuntur impedit! Harum earum iste, suscipit soluta, culpa necessitatibus quia sit nulla doloremque officia cum.</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit hic veniam unde numquam in ullam laudantium odit explicabo itaque! Voluptate similique, accusantium consequatur provident soluta quaerat maxime adipisci vero sed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContactMapWrapper>
            <ContactMessage>
                <div className="p-5">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 col-sm-12 m-auto">
                                <div className="card p-5">
                                    <h2 className='text-center mb-4'>Leave Us A message</h2>
                                    <div className=" d-flex align-items-center justify-content-center">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">FirstName</label>
                                                <input type="text" className="form-control" name='firstName' value={contact.firstName || ""} onChange={handleChangeText} aria-label="First name" />
                                                <div
                                                    className={`invalid-feedback ${contact?.firstName?.toString() === "" ? "d-block" : ""
                                                        }`}
                                                    style={{ fontSize: "100%", color: "red" }}
                                                >
                                                    FirstName must not be empty.
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">LastName</label>
                                                <input type="text" className="form-control" name='lastName' value={contact.lastName || ""} onChange={handleChangeText} aria-label="Last name" />
                                                <div
                                                    className={`invalid-feedback ${contact?.lastName?.toString() === "" ? "d-block" : ""
                                                        }`}
                                                    style={{ fontSize: "100%", color: "red" }}
                                                >
                                                    LastName must not be empty.
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Enter Your Email address</label>
                                                <input type="email" className="form-control" name='email' value={contact?.email || ""} onChange={handleChangeText} id="exampleFormControlInput1" />
                                                <div
                                                    className={`invalid-feedback ${contact?.email?.toString() === "" ? "d-block" : ""
                                                        }`}
                                                    style={{ fontSize: "100%", color: "red" }}
                                                >
                                                    Email must not be empty.
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Type in your message</label>
                                                <textarea className="form-control" name='question' value={contact?.question || ""} onChange={handleChangeText} id="exampleFormControlTextarea1" rows={3}></textarea>
                                                <div
                                                    className={`invalid-feedback ${contact?.question?.toString() === "" ? "d-block" : ""
                                                        }`}
                                                    style={{ fontSize: "100%", color: "red" }}
                                                >
                                                    Message must not be empty.
                                                </div>
                                            </div>
                                            <div className='col-12 text-center gap-2'>
                                                <BaseButtonGreen type="submit" onClick={submit}>Submit</BaseButtonGreen>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContactMessage>
        </>
    )
}
