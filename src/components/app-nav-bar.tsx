import Image from "next/image";

export default function AppNavBar() {
  return (
    <div className="flex w-full items-center p-4 border-b">
      <i className="fa-sharp-duotone fa-thin fa-paw text-3xl text-gray-800 mr-2"></i>

      <div className="flex flex-col ml-2 gap-0.5">
        <h1 className="font-bold text-xl font-brand leading-none">
          Pawfect Match
        </h1>
        <h2 className="font-geist text-sm text-gray-500 leading-none">
          Finding your furry soulmate.
        </h2>
      </div>
    </div>
  );
}
