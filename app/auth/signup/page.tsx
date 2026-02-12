import { getServerSession } from "next-auth";
import SignUp from "./components/sign-up";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/")
  } else {
    return <SignUp />
  }
}
