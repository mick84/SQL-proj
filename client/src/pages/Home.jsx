import page from "./page.module.scss";
import form from "./form.module.scss";
import { useState, useCallback } from "react";
import { API } from "../misc/api";

export const Home = (props) => {
  const initialInputs = {
    name: "",
    phone: "",
    event_date: "2023-01-01",
    email: "",
    location: "",
  };
  const [inputs, setInputs] = useState(initialInputs);
  const clearInputs = () => setInputs(() => initialInputs);
  const handleInput = useCallback(
    ({ target: { name, value } }) =>
      setInputs((i) => ({ ...i, [name]: value })),
    []
  );
  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const { data } = await API.post("/lead", inputs);
        console.log(data);
      } catch (error) {
        console.log(error.response.data || error.message);
      }
    },
    [inputs]
  );
  return (
    <div className={page.page}>
      <form className={form.form} onSubmit={handleSubmit} onReset={clearInputs}>
        <div className={form["form-control"]}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={inputs.name}
            onChange={handleInput}
          />
        </div>
        <div className={form["form-control"]}>
          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={inputs.phone}
            onChange={handleInput}
          />
        </div>
        <div className={form["form-control"]}>
          <label htmlFor="event_date">Event date:</label>
          <input
            type="date"
            name="event_date"
            id="event_date"
            required
            value={inputs.event_date}
            onChange={handleInput}
          />
        </div>

        <div className={form["form-control"]}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={inputs.email}
            onChange={handleInput}
          />
        </div>
        <div className={form["form-control"]}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            id="location"
            required
            value={inputs.location}
            onChange={handleInput}
          />
        </div>
        <div className={form.buttons}>
          <button type="reset">Clear</button>
          <button
            type="submit"
            disabled={inputs.password !== inputs.repeatPassword}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
