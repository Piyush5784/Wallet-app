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
import { useForm } from "react-hook-form"


const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();

  async function onClickHandler(data) {
    const response = await axios.post(
      `${Backend_Url}/user/signup`,
      {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
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

          <form onSubmit={handleSubmit(data => onClickHandler(data))}>

            <Label label={"First Name"} />
            <input
              placeholder={"John"}
              {...register('firstname', { required: true })}
              className="w-full px-2 py-1 border rounded border-slate-200"
            />
            {errors.firstname && <p className="text-red-500 text-sm ">firstname is required</p>}

            <Label label={"Last Name"} />
            <input
              placeholder={"Doe"}
              {...register('lastname', { required: true })}
              className="w-full px-2 py-1 border rounded border-slate-200"
            />

            {errors.lastname && <p className="text-red-500 text-sm ">lastname is required</p>}

            <Label label={"Email"} />
            <input
              placeholder={"piyushjha@gmail.com"}
              {...register('username', { required: true })}
              className="w-full px-2 py-1 border rounded border-slate-200"
            />
            {errors.username && <p className="text-red-500 text-sm ">Email is required</p>}

            <Label label={"Password"} />
            <input
              placeholder={"123456789"}
              {...register('password', { required: true }, {
                minLength: {
                  value: 8
                }
              }
              )}
              className="w-full px-2 py-1 border rounded border-slate-200"
            />

            {errors.password && <p className="text-red-500 text-sm ">Password must be at least 8 characters</p>}


            <div className="pt-4">
              <button className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" type="submit">Sign up</button>
            </div>
          </form>

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
