import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Buttonx } from "../components/Buttonx";
import { BottomWarning } from "../components/BottmWarning";

export function Signin() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <Heading label={"Sign in"}></Heading>
          <InputBox
            input={"Email"}
            placeholder={"johndoe@gmail.com"}
          ></InputBox>
          <InputBox input={"Password"} placeholder={"12345"}></InputBox>
          <Buttonx label={"Sign In"}></Buttonx>
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
