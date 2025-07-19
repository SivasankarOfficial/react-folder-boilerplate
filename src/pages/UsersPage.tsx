import React from "react";
import { useAllUsers } from "../hooks/useAllUsers";

const UsersPage = () => {
  const { users, isLoading, isError } = useAllUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
