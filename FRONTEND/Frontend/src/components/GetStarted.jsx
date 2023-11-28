import styles from "../style";
import { arrowUp } from "../assets";
import { Link } from 'react-scroll';


const GetStarted = () => (
  <Link to="generate" spy={true} smooth={true} duration={10} >
  <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-schemes p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-white w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[22px] leading-[23.4px]">
          <span className="text-gradient">Get</span>
        </p>
        <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
      </div>
      
      <p className="font-poppins font-medium text-[22px] leading-[23.4px]">
        <span className="text-gradient">Started</span>
      </p>
    </div>
  </div>
  </Link>

);

export default GetStarted;