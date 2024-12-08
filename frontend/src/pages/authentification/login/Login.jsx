// Login.jsx
import React, { useRef, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const LoginPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef(); 
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    

    const validateForm = (email, password) => {
        let isValid = true;
        
        // if (!email.trim()) {
        //     setEmailError('Email est obligatoire');
        //     isValid = false;
        // } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        //     setEmailError('Format invalide');
        //     isValid = false;
        // } else {
        //     setEmailError('');
        // }
    
        // if (!password.trim()) {
        //     setPasswordError('Mot de passe est obligatoire');
        //     isValid = false;
        // } else {
        //     setPasswordError('');
        // }
    
       
    
        return isValid;
    };
    

    const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (validateForm(email, password)){
    try {

        const response = await axios.post('http://localhost:8081/login', {
            email:email,
            password:password,
            
        },{
            headers: {
                'Content-Type': 'application/json',
              },
        },).then((response) => {
            const responseString = JSON.stringify(response);
            let responseJ = JSON.parse(responseString);
            console.log('response User:  ',responseJ.data.user); 
            
            if(response.data.user &&responseJ.data.user.email === email){
                const user = responseJ.data.user;
                localStorage.setItem('user',user)
                console.log('stored User:  ',user); 
                navigate('/home');
            }
            else{
                console.log('check credentials');
            }
        })
        .catch(error => console.error(error));

  
        
        // Check the role of the user and navigate accordingly
        // if (response.data.role === 'supervisor' || response.data.role === 'admin') {
        //     setUserRole(response.data.role); // Update user role
        //     sessionStorage.setItem('userRole', response.data.role); // Save the role in localStorage
        //     navigate(response.data.role === 'admin' ? '/admin' :'/');
        // } else {
        //     setGeneralError('User role not recognized');
        // }
    } catch (error) {
        console.error(error);
        setGeneralError('Login failed. Please check your credentials and try again.');
    }
}

   // resetForm();
};



    const resetForm = () => {
        emailRef.current.value = '';
        passwordRef.current.value = '';
        setRole('');
        setEmailError('');
        setPasswordError('');
        setGeneralError('');
    };
    


    return (
    <div className="login"  >
        <div className="component-container mt-10">
        <div className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-5">
            <div>
                <h1 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Connexion</h1>
            </div>
            <form  onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2">
                    <label className="text-sm font-bold text-gray-600 mb-1" htmlFor="email">Entrer Email</label>
                    <input
                        className="border rounded-md bg-white px-3 py-2 border-gray-300"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your Email Address"
                        ref={emailRef}
                    />
                    {emailError && <span className="text-red-500 text-sm mt-1">{emailError}</span>}
                </div>
                <div className="flex flex-col mb-2">
                    <label className="text-sm font-bold text-gray-600 mb-1" htmlFor="password">Mot de passe</label>
                    <input
                        className="border rounded-md bg-white px-3 py-2 border-gray-300"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        ref={passwordRef}
                    />
                    {passwordError && <span className="text-red-500 text-sm mt-1">{passwordError}</span>}
                </div>
               
                <div>
                    <button className="w-full bg-indigo-600 text-white rounded-md p-2" type="submit">Login</button>
                    {generalError && <span className="text-red-500 text-sm mt-2 block">{generalError}</span>}
                </div>
                <div className="flex flex-col mb-4">                  
                <label className="text-sm font-bold text-gray-600 mb-1">forget password?<Link>Click</Link> </label> 
                </div>
            </form>
        </div>
    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    </div> 
    );
}

export default LoginPage;






