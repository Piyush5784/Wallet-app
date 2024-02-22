import BottomWarning from "../components/BottomWarning";
import Input from "../components/Input";
import Heading from "../components/Heading";
import SubHeading from "../components/Subheading";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Label from "../components/Label";
import Backend_Url from "../../BackendUrl";
const Signup = () => {
  const navigate = useNavigate();

  let username = useRef();
  let lastname = useRef();
  let firstname = useRef();
  let password = useRef();


  async function onClickHandler() {
    username = username.current.value;
    lastname = lastname.current.value;
    password = password.current.value;
    firstname = firstname.current.value;
    const response = await axios.post(
      `${Backend_Url}/user/signup`,
      {
        username,
        firstname,
        lastname,
        password,
      }, {
      headers: {
        "Content-Type": "application/json",
      },
    },
    );
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  }


  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />

          <Label label={"First Name"} />
          <input
            placeholder={"John"}
            ref={firstname}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <Label label={"Last Name"} />
          <input
            placeholder={"Doe"}
            ref={lastname}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <Label label={"Email"} />
          <input
            placeholder={"piyushjha@gmail.com"}
            ref={username}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <Label label={"Password"} />
          <input
            placeholder={"123456789"}
            ref={password}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={() => onClickHandler()}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
