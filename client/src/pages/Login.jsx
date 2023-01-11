import style from "./page.module.scss";
import form from "./form.module.scss";
import { useState, useCallback } from "react";
import { ACTIONS, useAuth } from "../context/UserCtx";
import { API } from "../misc/api";
export const Login = (props) => {
  const initialInputs = {
    email: "",
    password: "",
  };
  const { state, dispatch } = useAuth();
  const [inputs, setInputs] = useState(initialInputs);
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data: payload } = await API.post("/auth/login", inputs);
        console.log(payload);
        dispatch({ type: ACTIONS.LOGIN, payload });
      } catch (error) {
        console.log(error.response.data || error.message);
      }
    },
    [dispatch, inputs]
  );

  const cleanInputs = () => setInputs(() => initialInputs);
  return (
    <div className={style.page}>
      <form className={form.form} onSubmit={handleLogin} onReset={cleanInputs}>
        <div className="title">Register Form</div>
        <div className={form["form-control"]}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="user@domain"
            value={inputs.email}
            onChange={(e) =>
              setInputs((i) => ({ ...i, email: e.target.value }))
            }
          />
        </div>
        <div className={form["form-control"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            maxLength={20}
            value={inputs.password}
            onChange={(e) =>
              setInputs((i) => ({ ...i, password: e.target.value }))
            }
          />
        </div>
        <div className={form.buttons}>
          <button type="reset">Clear</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
