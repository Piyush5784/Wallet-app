import Button from "../components/Button";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import BottomWarning from "../components/BottomWarning";
import Label from "../components/Label";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();

  async function onClickHandler() {
    let username = email.current.value;
    let pass = password.current.value;

    try {
      const response = await axios.post(
        "http://localhost:3004/api/v1/user/signin",
        { username, password: pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <Label label={"Email"} />
          <input
            ref={email}
            placeholder={"piyushjha@gmail.com"}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />
          <Label label={"Password"} />
          <input
            ref={password}
            placeholder={"123456"}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />{" "}
          <div className="pt-4">
            <Button label={"Sign in"} onClick={() => onClickHandler()} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
