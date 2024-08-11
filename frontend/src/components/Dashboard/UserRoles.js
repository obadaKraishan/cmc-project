import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const UserRoles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users and their roles from the backend
    const fetchUsers = async () => {
      const response = await api.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Roles</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRoles;
