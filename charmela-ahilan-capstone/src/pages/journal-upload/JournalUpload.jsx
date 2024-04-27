import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./JournalUpload.scss";

export default function JournalUpload() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [affirmations, setAffirmations] = useState("");
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entryData, setEntryData] = useState(null); // State variable to store entry data for editing

  const location = useLocation();
  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
      setCategory(response.data.tags[0]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!entryData && !location.search.includes("id")) {
      fetchQuote();
    }
  }, []);

  useEffect(() => {
    // Fetch moods from API
    const fetchMoods = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/emojis`
        );
        setMoods(response.data);
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchMoods();
  }, []);

  useEffect(() => {
    // Check if the URL contains an "id" parameter
    const params = new URLSearchParams(location.search);
    const entryId = params.get("id");
    if (entryId) {
      // Fetch the journal entry data for the provided id
      fetchEntryData(entryId);
    }
  }, [location.search]);

  const fetchEntryData = async (entryId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/journal-entries/${entryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      const { quote, gratitude, affirmations, emojis, id } = response.data;
      setQuote(quote?.text);
      setAuthor(quote?.author);
      setCategory(quote?.category);
      setGratitude(gratitude);
      setAffirmations(affirmations);
      setSelectedMoods(emojis.map(String) || []);
      setEntryData({
        id,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      window.location.href = "/create-journal-entry";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if selectedMoods is empty
    if (selectedMoods.length === 0) {
      setError("Please select at least one mood.");
      return;
    }
    setIsSubmitting(true);
    // Perform Axios API call to submit journal entry
    const formData = {
      quote: { text: quote, author, category },
      gratitude,
      affirmations,
      emojis: selectedMoods.map(Number), // Convert selectedMoods to an array of numbers
    };
    try {
      if (entryData) {
        // If entryData exists, it means we are editing an existing entry
        console.log(formData);
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/journal-entries/${entryData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Journal entry updated successfully.");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/journal-entries`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Journal entry created successfully.");
        setAffirmations("");
        setAuthor("");
        setCategory("");
        setSelectedMoods([]);
        setError("");
        setGratitude("");
        fetchQuote();
      }
    } catch (error) {
      console.error("Error submitting journal entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(selectedMoods);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedMoods([...selectedMoods, value]); // Add mood to selected moods
    } else {
      setSelectedMoods(selectedMoods.filter((mood) => mood !== value)); // Remove mood from selected moods
    }
  };

  return (
    <div className="journal-upload-container">
      <h2>{entryData ? "Edit Journal Entry" : "Create Journal Entry"}</h2>
      <div className="quote-of-the-day">
        {/* Display quote fetched from API */}
        <div>Quote of the Day:</div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="upload_quote">
            <div>" {quote} "</div>
            <div>- {author}</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gratitude">Things you are grateful for:</label>
          <textarea
            id="gratitude"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="affirmations">Today's affirmations:</label>
          <textarea
            id="affirmations"
            value={affirmations}
            onChange={(e) => setAffirmations(e.target.value)}
            required
          ></textarea>
        </div>
        <label>My mood today is:</label>
        <div className="form-group form-checkboxes">
          {/* Display mood checkboxes */}
          {moods.map((mood) => (
            <label key={mood.id}>
              <input
                type="checkbox"
                name="mood"
                value={mood.id}
                checked={selectedMoods.includes(String(mood.id))}
                onChange={handleCheckboxChange}
              />
              {mood?.name} {mood?.emoji}
            </label>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
