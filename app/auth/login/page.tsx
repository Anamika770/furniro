import Link from "next/link";
import SignIn from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/")
  } else {
    return <SignIn />
  }

}

export const dynamic = 'force-dynamic'