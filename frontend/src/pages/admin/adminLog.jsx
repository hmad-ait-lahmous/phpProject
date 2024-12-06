// Login.jsx
import React, { useRef, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import '../authentification/login/Login.css'

const AdminLogin = ({setUserRole }) => {
    const passwordRef = useRef();    
    const navigate = useNavigate();
    
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
    
        // if (!role) {
        //     setRoleError('Le role est obligatoire');
        //     isValid = false;
        // } else {
        //     setRoleError('');
        // }
    
        return isValid;
    };
    

    const handleSubmit = async (e) => {
    e.preventDefault();

    const password = passwordRef.current.value;

    if(password==='admin123'){
        navigate('/admin');
       
    }
    else{
        setGeneralError('wrong password ');
    }

   // resetForm();
};



    const resetForm = () => {
        
        passwordRef.current.value = '';
      
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
                
            </form>
        </div>
    </div>
    
    </div> 
    );
}

export default AdminLogin;






