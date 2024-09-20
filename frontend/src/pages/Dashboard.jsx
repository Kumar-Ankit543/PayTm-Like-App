import { NavBar } from "../components/NavBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
  return (
    <div className="px-5">
      <NavBar></NavBar>
      <Balance value={5000}></Balance>
      <Users></Users>
    </div>
  );
}
