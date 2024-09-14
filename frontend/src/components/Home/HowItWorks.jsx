import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How it works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
              architecto beatae in possimus sint reprehenderit.
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find A Job</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
              architecto beatae in possimus sint reprehenderit.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Send Resume</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
              architecto beatae in possimus sint reprehenderit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
