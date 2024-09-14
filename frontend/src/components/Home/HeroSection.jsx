import React from "react";
import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id:1,
      title:"1,24,441",
      subTitle:"Live Job",
      icon:<FaSuitcase/>
    },
    {
      id:2,
      title:"91220",
      subTitle:"Companies",
      icon:<FaBuilding/>
    },
    {
      id:3,
      title:"2,34,200",
      subTitle:"Job Seekers",
      icon:<FaUsers/>
    },
    {
      id:4,
      title:"1,03,761",
      subTitle:"Employers",
      icon:<FaUserPlus/>
    },
  ]
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a Job that suits</h1>
          <h1>your intrest and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet ex
            quisquam voluptatibus adipisci, temporibus nisi placeat architecto
            ea eum nihil sed alias quidem tempore corporis esse quaerat
            asperiores, veniam est?
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details">
        {
          details.map(element => {
            return(
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default HeroSection;
