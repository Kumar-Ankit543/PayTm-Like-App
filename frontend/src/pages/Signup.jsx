import { BottomWarning } from "../components/BottmWarning";
import { Buttonx } from "../components/Buttonx";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <Heading label={"Sign up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            input={"First Name"}
            placeholder={"John"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            input={"Last Name"}
            placeholder={"Doe"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            input={"Email"}
            placeholder={"johndoe@gmail.com"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            input={"Password"}
            placeholder={"12345"}
          ></InputBox>
          <Buttonx
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstName: firstName,
                  lastName: lastName,
                  username: username,
                  password: password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            label={"Sign Up"}
          ></Buttonx>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}
