import { BottomWarning } from "../components/BottmWarning";
import { Buttonx } from "../components/Buttonx";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signup() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <Heading label={"Sign up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox input={"First Name"} placeholder={"John"}></InputBox>
          <InputBox input={"Last Name"} placeholder={"Doe"}></InputBox>
          <InputBox
            input={"Email"}
            placeholder={"johndoe@gmail.com"}
          ></InputBox>
          <InputBox input={"Password"} placeholder={"12345"}></InputBox>
          <Buttonx label={"Sign Up"}></Buttonx>
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
