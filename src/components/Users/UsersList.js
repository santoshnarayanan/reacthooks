import { useState, useEffect } from 'react';
import Spinner from "../UI/Spinner";
import getData from "../../utils/api"; // we'll use this api function

export default function UsersList({ user, setUser }) {
  // include state for an error object and an isLoading flag
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);

  // update the effect to use the getData function
  useEffect(() => {
    getData("http://localhost:3001/users")
      .then(data => {
        setUser(data[0]); // set the user to the first user
        setUsers(data);
        setIsLoading(false); // the data has finished loading
      })
      .catch(error => {
        setError(error); // set the error object
        setIsLoading(false); // we're no longer loading
      });
  }, [setUser]);

  // alternative UI for when there's an error
  if (error) {
    return <p>{error.message}</p>
  }

  // alternative UI while users load
  if (isLoading) {
    return <p><Spinner /> Loading users...</p>
  }

  // this UI is unchanged
  return (
    <ul className="users items-list-nav">
      {users.map(u => (
        <li
          key={u.id}
          className={u.id === user?.id ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => setUser(u)}
          >
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}