import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-4 px-8">
      <div className="text-xl font-bold">Vegan Journey</div>
      <div className="space-x-4">
        <a
          href="https://www.instagram.com/vegan.joyfuljourney.today"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-gray-600 hover:text-gray-800 h-6 w-6"
          />
        </a>
        {/* <a href="" target="_blank">
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-gray-600 hover:text-gray-800 h-6 w-6"
          />
        </a>
        <a href="" target="_blank">
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-gray-600 hover:text-gray-800 h-6 w-6"
          />
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
