import { checkLoginStatus } from "@/app/actions/auth.actions";
import FavoriteHeaderIcon from "./favorite-header-icon";
import FontAwesomePawIcon from "./font-awesome-paw-icon";
import UserPopover from "./user-popover";

export default async function AppNavBar() {
  const isLoggedIn = await checkLoginStatus();

  return (
    <div className="flex w-full items-center p-4 border-b">
      <FontAwesomePawIcon />

      <div className="flex flex-col ml-2 gap-0.5">
        <h1 className="font-bold text-xl text-accent font-brand leading-none">
          Pawfect Match
        </h1>
        <h2 className="font-geist text-sm text-gray-500 leading-none">
          Finding your furry soulmate.
        </h2>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {isLoggedIn && <FavoriteHeaderIcon />}
        {isLoggedIn && <UserPopover />}
      </div>
    </div>
  );
}
