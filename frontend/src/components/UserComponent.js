import React from 'react';

const UserComponent = ({ user }) => {
  return (
    <tr key={user.id}>
      <td className="p-3 border border-gray-200">{user.firstname} {user.lastname}</td>
      <td className="p-3 border border-gray-200">{user.email}</td>
      <td className="p-3 border border-gray-200">{user.Specialization}</td>
      <td className="p-3 border border-gray-200">{user.role}</td>
      {/* Add any additional content or functionality related to the user */}
    </tr>
  );
};

export default UserComponent;
