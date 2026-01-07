import { useEffect, useState } from "react";
import api from "../services/api";

export default function Sets() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState("");

  const fetchSets = async () => {
    const res = await api.get("/sets");
    setSets(res.data);
  };

  const createSet = async () => {
    if (!name) return;
    await api.post("/sets", { name });
    setName("");
    fetchSets();
  };

  const deleteSet = async (id) => {
    await api.delete(`/sets/${id}`);
    fetchSets();
  };

  useEffect(() => {
    fetchSets();
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>My Sets</h3>

      <input
        placeholder="Enter set name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createSet}>Add</button>

      <ul>
        {sets.map((s) => (
          <li key={s._id}>
            {s.name} <button onClick={() => deleteSet(s._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
