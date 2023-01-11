import page from "./page.module.scss";
import form from "./form.module.scss";
import { useState } from "react";

import { useCallback } from "react";
export const Home = (props) => {
  const initialInputs = {
    name: "",
    phone: "",
    event_date: "2023-01-01",
    email: "",
    location: "",
  };
  const [inputs, setInputs] = useState(initialInputs);
  const handleInput = useCallback(
    ({ target: { name, value } }) =>
      setInputs((i) => ({ ...i, [name]: value })),
    []
  );
  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
  }, []);
  return (
    <div className={page.page}>
      <form className={form.form}>
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
      </form>
    </div>
  );
};
