import { Select, initTE } from "tw-elements";
initTE({ Select });

const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",
  
    heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    paragraph: "font-poppins font-normal text-black text-[16px] leading-[30.8px]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "sm:px-12 px-6",
    paddingY: "sm:py-14 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",
  
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",

    label: `absolute  top-[-45%] left-1 text-sm font-semibold text-gradient-label dark:text-white`,
    labelCheck: `"ml-2 text-normal font-medium text-gray-400 dark:text-white`,

    input: `block appearance-none w-full text-gray-400 bg-transparent border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`,
    inputCheck: ` mr-2 w-4 h-4 text-gradient bg-transparent border-gray-400 rounded focus:ring-gradient dark:focus:ring-gradient dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,

    select: `block appearance-none w-full text-gray-400 bg-transparent border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`,
  
    fomatLabel:`inline-block relative xl:w-55.5 lg:w-48 md:w-38 sm:w-34 mx-2 my-6`,
  };
  
  export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  };
  



  
  export default styles;