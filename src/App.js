import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="App">
      <h1>Hello this is Server..</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required /> <br />
        <input type="text" name="email" placeholder="Email" required /> <br />
        <input type="submit" value="Add user" />
      </form>
      <h1>I can run : {users.length}</h1>
      {users.map((user) => (
        <h1 key={user.id}>
          Name: {user.name} <br /> Email: {user.email}
        </h1>
      ))}
    </div>
  );
}

export default App;
