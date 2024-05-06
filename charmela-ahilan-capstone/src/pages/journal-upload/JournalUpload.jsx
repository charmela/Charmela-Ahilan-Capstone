import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JournalUpload.scss";
import $ from "jquery";

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
  const [entryData, setEntryData] = useState(null);

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
    const params = new URLSearchParams(location.search);
    const entryId = params.get("id");
    if (entryId) {
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
    if (!gratitude || !affirmations) {
      setError("Please fill all the fields.");
      return;
    }
    if (selectedMoods.length === 0) {
      setError("Please select at least one mood.");
      return;
    }

    setIsSubmitting(true);
    const formData = {
      quote: { text: quote, author, category },
      gratitude,
      affirmations,
      emojis: selectedMoods.map(Number),
    };
    try {
      if (entryData) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/journal-entries/${entryData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Journal entry updated successfully.");
        clearForm();
        fetchQuote();
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
        toast.success("Journal entry created successfully.");
        clearForm();
        fetchQuote();
      }
    } catch (error) {
      toast.error("Error submitting journal entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setAffirmations("");
    setAuthor("");
    setCategory("");
    setSelectedMoods([]);
    setError("");
    setGratitude("");
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedMoods([...selectedMoods, value]);
    } else {
      setSelectedMoods(selectedMoods.filter((mood) => mood !== value));
    }
  };

  useEffect(() => {
    $(".hoverme").on("click", function () {
      function random(max) {
        return Math.random() * (max - 0) + 0;
      }

      var c = document.createDocumentFragment();
      for (var i = 0; i < 100; i++) {
        var styles =
          "transform: translate3d(" +
          (random(500) - 250) +
          "px, " +
          (random(200) - 150) +
          "px, 0) rotate(" +
          random(360) +
          "deg);\
                      background: hsla(" +
          random(360) +
          ",100%,50%,1);\
                      animation: bang 700ms ease-out forwards;\
                      opacity: 0";

        var e = document.createElement("i");
        e.style.cssText = styles.toString();
        c.appendChild(e);
      }
      $(this).append(c);
    });
  }, []); // Only run once on component mount

  return (
    <div className="journal-upload-container">
      <h2 className="journal-upload-container__heading">
        {entryData ? "Edit Journal Entry" : "Create Journal Entry"}
      </h2>
      <div className="quote-of-the-day">
        <div className="quote-of-the-day__heading">Quote of the Day:</div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="upload-quote">
            <div className="upload-quote__text">" {quote} "</div>
            <div className="upload-quote__author">- {author}</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gratitude" className="form-group__label">
            Things you are grateful for:
          </label>
          <textarea
            id="gratitude"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="form-group__textarea"
            // required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="affirmations" className="form-group__label">
            Today's affirmations:
          </label>
          <textarea
            id="affirmations"
            value={affirmations}
            onChange={(e) => setAffirmations(e.target.value)}
            className="form-group__textarea"
            // required
          ></textarea>
        </div>
        <label className="form-group__label">My mood today is:</label>
        <div className="form-group form-checkboxes">
          {moods.map((mood) => (
            <label key={mood.id} className="form-checkboxes__label">
              <input
                type="checkbox"
                name="mood"
                value={mood.id}
                checked={selectedMoods.includes(String(mood.id))}
                onChange={handleCheckboxChange}
                className="form-checkboxes__input"
              />
              <span className="form-checkboxes__text">
                {mood?.name} {mood?.emoji}
              </span>
            </label>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          type="submit"
          // disabled={isSubmitting}
          className="hoverme journal-upload-container__submit-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
