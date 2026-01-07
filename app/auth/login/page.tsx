import Link from "next/link";
import SignIn from "./components/loginPage";

export default function Page() {
  return (
    // <div className="h-[85vh] w-full flex items-center justify-center">
    //     <Link href="/auth/signup" >
    //         <button  className="px-4 py-2 text-2xl bg-black text-white rounded transition-all duration-500 hover:scale-110">
    //             Go to Register Section
    //         </button>
    //     </Link>
    // </div>
    <>
      <SignIn />
    </>
  );
}
