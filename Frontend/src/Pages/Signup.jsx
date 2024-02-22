import BottomWarning from "../components/BottomWarning";
import Input from "../components/Input";
import Heading from "../components/Heading";
import SubHeading from "../components/Subheading";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Label from "../components/Label";

const Signup = () => {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />

          <Label label={"First Name"} />
          <input
            placeholder={"John"}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <Label label={"Last Name"} />
          <input
            placeholder={"Doe"}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <Label label={"Email"} />
          <input
            placeholder={"piyushjha@gmail.com"}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <Label label={"Password"} />
          <input
            placeholder={"123456789"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-1 border rounded border-slate-200"
          />

          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3004/api/v1/user/signup",
                  {
                    username,
                    firstname,
                    lastname,
                    password,
                  },
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
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
