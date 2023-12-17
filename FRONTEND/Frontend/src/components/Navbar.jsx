import { useState } from "react";
import styles from "../style";
import { Link } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
 
  return (
    <nav className=" flex py-4 justify-between items-center navbar border-b-2 ">
      <img src={logo} alt="hoobank" className="w-[124px] h-[48px]" />

      <ul className="list-none mdt:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer lg:text-[16px] md:text-[14px] ${active === nav.title ? "text-schemes" : "text-gris"
              } ${index === navLinks.length - 1 ? "mr-0" : "lg:mr-10 md:mr-8"}`}
            onClick={() => setActive(nav.title)}
          >
             <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>


        ))}
                <Link to="/login">
        <button type="button" className={`py-2.5 px-9 lg:mx-6 md:mx-4 font-poppins font-medium lg:text-[16px] md:text-[14px] text-snow bg-blue-gradient hover:text-gris rounded-[6px] hover:bg-blue-gradientHover routline-none ${styles} shadow` }
        >
          Login
        </button>
        </Link>
      </ul>

      <div className="mdt:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${!toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`${nav.link}`}>{nav.title}</a>
              </li>
            ))
            
             }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;