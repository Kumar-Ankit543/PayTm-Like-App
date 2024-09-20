import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Buttonx } from "../components/Buttonx";
import { BottomWarning } from "../components/BottmWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <Heading label={"Sign in"}></Heading>
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
            onClick={() => {
              const response = axios
                .post("http://localhost:3000/api/v1/user/signin", {
                  username: username,
                  password: password,
                })
                .then(navigate("/dashboard"));
            }}
            label={"Sign In"}
          ></Buttonx>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}
