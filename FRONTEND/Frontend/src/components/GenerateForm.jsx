import React from 'react'
import styles, { layout } from "../style";
import { Select, initTE } from "tw-elements";
import { updown, down, logo ,close} from '../assets';
initTE({ Select });

const GenerateForm = () => {
     // Access the email from localStorage
     const userEmail = localStorage.getItem('userEmail');
     console.log('User Email:', userEmail);
    return (
        <section id="generate" className='bg-discount-gradient px-16 py-6' >
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris ss:leading-[95px] leading-[45px]">
                    Chart Settings
                </h1>

            </div>
            <div className='bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md '>


                <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1 ">

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Graphique Type</label>
                        <select className={`${styles.select}`} >
                            <option style={{ display: 'flex', alignItems: 'center' }}> Barre</option>
                            <option >Lineaire</option>
                            <option >Circulaire</option>
                            <option >Surface</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Width</label>
                        <select className={`${styles.select}`}>
                            <option >400</option>
                            <option >500</option>
                            <option >600</option>
                            <option >700</option>
                            <option >800</option>
                            <option >900</option>
                            <option >1000</option>
                            <option >1100</option>
                            <option >1200</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Height</label>
                        <select className={`${styles.select}`}>
                            <option >400</option>
                            <option >500</option>
                            <option >600</option>
                            <option >700</option>
                            <option >800</option>
                            <option >900</option>
                            <option >1000</option>
                            <option >1100</option>
                            <option >1200</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>BG Color</label>
                        <select className={`${styles.select}`}>
                            <option >vert</option>
                            <option >orange</option>
                            <option >bleu</option>
                            <option >red</option>
                            <option >white</option>
                            <option >black</option>
                            <option >purple</option>
                            <option >gris</option>
                            <option >yellow</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>X</label>
                        <select className={`${styles.select}`}>
                            <option >Horizontal</option>
                            <option >Vertical</option>
                            <option >Diagonal</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Graphique Title</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Sous Title</label>
                        <input className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Axe X Title</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Axe Y Title</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Source</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Text Style</label>
                        <select className={`${styles.select}`}>
                            <option >Gras</option>
                            <option >Normal</option>
                            <option >Gras Italic</option>
                            <option >Normal Italic</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-white ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Etiquette Style</label>
                        <select className={`${styles.select}`}>
                            <option >Gras</option>
                            <option >Normal</option>
                            <option >Gras Italic</option>
                            <option >Normal Italic</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Y Minimal</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Y Maximal</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>threshold line</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>In 3D</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Grid</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Legend</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Show Values</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>
                            Plot color</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Rounded corners</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Color Gradient</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Transparent</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Shadow</label>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-2 text-center">
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Border</label>
                    </div>

                </div>
                <div className='flex justify-center'>
                    <button type="button" className={` w-56 py-3 px-6 m-3 font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
                        Generate
                    </button>
                </div>
            </div>

        </section>
    )
}

export default GenerateForm