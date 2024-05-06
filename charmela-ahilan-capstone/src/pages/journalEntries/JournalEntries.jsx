import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./JournalEntries.scss";
import { toast } from "react-toastify";

export default function JournalEntries() {
  const [entries, setEntries] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/journals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [apiUrl, token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/journal-entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter out the deleted entry from the state
      toast.success("Journal entry deleted successfully.");
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      toast.error("Error deleting journal entry.");
    }
  };

  return (
    <div className="journal-entries__container">
      <h2 className="journal-entries__heading">Journal Entries</h2>
      <table className="journal-entries__table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Gratitude</th>
            <th>Affirmations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{new Date(entry.created_at).toLocaleDateString()}</td>{" "}
              <td>{entry.gratitude}</td>
              <td>{entry.affirmations}</td>
              <td>
                <Link to={`/create-journal-entry?id=${entry.id}`}>Edit</Link>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
