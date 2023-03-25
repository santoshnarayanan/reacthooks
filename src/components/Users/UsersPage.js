import { useState, useContext } from "react"; // import useState
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import UserContext from "./UserContext"; // import new component

export default function UsersPage() {
  // manage selected user state
  const [user, setUser] = useState(null);

  // the value from context is now an object,
  // so use destructuring to assign the user
  // context property to the loggedInUser variable
  const { user: loggedInUser } = useContext(UserContext);

  //if no user has been selected in the users list, select the logged user
  const currentUser = user || loggedInUser;

  // pass user state down
  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
}