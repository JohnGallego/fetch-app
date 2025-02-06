import LoginForm from "@/components/login-form";
import { isAuthenticated } from "@/utils/auth";

export default async function Home() {
  const isSignedIn = await isAuthenticated();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist bg-no-repeat bg-center bg-[url(/img/bg-01.svg)]">
      <main className="flex flex-col gap-8 row-start-2">
        {isSignedIn ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-gray-500">You are now signed in.</p>
          </div>
        ) : (
          <LoginForm />
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
