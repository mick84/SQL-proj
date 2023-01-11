import style from "./page.module.scss";
import form from "./form.module.scss";
import PasswordStrengthBar from "react-password-strength-bar";
import { useState, useCallback } from "react";
import { API } from "../misc/api";
import { useAuth, ACTIONS } from "../context/UserCtx";
export const Register = (props) => {
  const initialInputs = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  const { state, dispatch } = useAuth();
  const [inputs, setInputs] = useState(initialInputs);
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const { data } = await API.post("/auth/register", inputs);
        console.log(data);
      } catch (error) {
        console.log(error.response.data || error.message);
      }
    },
    [inputs]
  );

  const cleanInputs = () => setInputs(() => initialInputs);
  return (
    <div className={style.page}>
      <form
        className={form.form}
        onSubmit={handleRegister}
        onReset={cleanInputs}
      >
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
            placeholder="1 UCase, 1 LCase, 1 number required"
            minLength={8}
            value={inputs.password}
            onChange={(e) =>
              setInputs((i) => ({ ...i, password: e.target.value }))
            }
          />
          <PasswordStrengthBar password={inputs.password} minLength={8} />
        </div>
        <div className={form["form-control"]}>
          <label htmlFor="repeat-password">Repeat Password:</label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            required
            value={inputs.repeatPassword}
            onChange={(e) =>
              setInputs((i) => ({ ...i, repeatPassword: e.target.value }))
            }
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
