import LoginForm from "@/components/login-form";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center h-full p-8 gap-16 font-geist bg-no-repeat bg-center bg-[url(/img/bg-01.svg)]">
      <main className="flex flex-col gap-8 row-start-2">
        <LoginForm />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
