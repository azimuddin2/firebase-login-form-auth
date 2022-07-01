import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase.init';

const auth = getAuth(app);

const Register = () => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailBlur = event => {
        setEmail(event.target.value);
    }

    const handlePasswordBlur = event => {
        setPassword(event.target.value);
    }

    const handleRegisteredChange = event => {
        setRegistered(event.target.checked)
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
            setError('Password should contain at least one special character');
            return;
        }
        setValidated(true);
        setError('');

        if (registered) {
            signInWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                })
                .catch(error => {
                    console.log(error);
                    setError(error.message);
                })
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    setEmail('');
                    setPassword('');
                    verifyEmail();
                })
                .catch(error => {
                    console.error(error);
                    setError(error.message)
                })
        }
    }

    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent')
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Email verification sent')
            })
    }

    return (
        <div className='w-50 mx-auto mt-5 border p-5 rounded-3 shadow'>
            <h2 className={registered ? 'text-success' : 'text-primary'}>Please {registered ? 'Login' : 'Register'}</h2>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered" />
                </Form.Group>

                <p className='text-danger'><small>{error}</small></p>
                <Button className='px-4' variant={registered ? 'success' : "primary"} type="submit">
                    {registered ? 'Login' : 'Register'}
                </Button>
                <Button onClick={handleForgetPassword} variant='link'>Forget Password?</Button>
            </Form>
        </div>
    );
};

export default Register;