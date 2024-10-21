import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import LoginLogoutButton from "./LoginLogoutButton";

export default function Nav({
  session,
  darkModeValue,
}: {
  session: any;
  darkModeValue: string;
}) {
  return (
    <nav className="bg-slate-300 p-5 flex gap-3 items-center">
      <Link href="/">Home</Link>
      <Link href="/list">List</Link>
      <DarkModeButton darkModeValue={darkModeValue} />
      <LoginLogoutButton session={session} />
    </nav>
  );
}
