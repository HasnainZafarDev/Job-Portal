import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const NotFound = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };
  return (
    <section className="page notfound">
      <div className="content">
        <img src="/notfound.png" alt="notfound" />
        <Link to={"/"}>Return To Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
