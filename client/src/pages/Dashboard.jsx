import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    const res = await API.get("/sets");
    setSets(res.data);
  };

  const addSet = async () => {
    if (!name.trim()) return;
    await API.post("/sets", { name });
    setName("");
    fetchSets();
  };

  const deleteSet = async (id) => {
    await API.delete(`/sets/${id}`);
    fetchSets();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard</h1>
      <p>You are successfully logged in.</p>

      <button onClick={logout}>Logout</button>

      <hr />

      <h2>My Sets</h2>

      <input
        placeholder="Enter set name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addSet}>Add</button>

      <ul>
        {sets.map((s) => (
          <li key={s._id}>
            {s.name}
            <button onClick={() => deleteSet(s._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
