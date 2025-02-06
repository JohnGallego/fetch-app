import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FontAwesomePawIcon() {
  return (
    <div className="relative w-10 h-10">
      <FontAwesomeIcon
        icon={faPaw}
        className="absolute top-0 left-0 w-5 text-accent"
      />

      <FontAwesomeIcon
        icon={faPaw}
        className="absolute top-4 left-4 w-5 text-accent"
      />
    </div>
  );
}
