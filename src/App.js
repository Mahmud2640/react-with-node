import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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
        const newUsers = [...users, data];
        setUsers(newUsers);
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
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <h1>I can run : {users.length}</h1>
      {users
        .filter((user) => {
          if (search == "") {
            return user;
          } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
            return user;
          }
        })
        .map((user) => (
          <h1 key={user.id}>
            Name: {user.name} <br /> Email: {user.email}
          </h1>
        ))}
    </div>
  );
}

export default App;
