import axios from 'axios';
import { useEffect, useState } from 'react';

export default function  Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/signup') // Adjust URL as needed
            .then(response => {
                if (response.data.status === 'success') {
                    setUsers(response.data.data); // Set users to state
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (

        <div>
            <h1></h1>
            <h1></h1>
            
            <h1></h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>Users</h1>
            <ul>
                {users && users.length === 0 ? (
                    <p>No users yet</p>
                ) : (
                    users.map((user) => (
                       <div key={user.user_id }>
                           <p>============================================</p>
                            <li >{user.last_name}</li>
                            <li  >{user.email}</li>
                            <li>{user.first_name}</li>

                        </div>
                    ))
                )}
            </ul>


        </div>
    );
}


