import React, { useState, useRef,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';

import Modal from 'react-modal';
import styles, { layout } from "../style";
import { Select, initTE } from "tw-elements";
import * as XLSX from 'xlsx';
import { updown, down, logo ,close} from '../assets';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {DragDropFiles} from './index';


const GenerateForm = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    
    const [graphiqueType, setGraphiqueType] = useState('Barre');
    const [width, setWidth] = useState('400');
    const [height, setHeight] = useState('400');
    const [color, setColor] = useState('vert');
    const [title, setTitle] = useState('title');
    const [subTitle, setSubTitle] = useState('Sub Title');
    const [fontSize, setFontSize] = useState('Text Size');
    const [fontFamily, setFontFamily] = useState('textStyle');
    const [fontStyle, setFontStyle] = useState('textStyle');
    const [textColor, setTextColor] = useState('textColor');

    const fontSizeOptions = [];
    const [chartLayout, setChartLayout] = useState('vertical'); // Initialisez la disposition à "vertical"

    
    const [x, setX] = useState('x');
    const [y, setY] = useState('y');
    const[yMin,setYMin]= useState('yMin');
    const[yMax,setYMax]= useState('yMax');

    const [chartData, setChartData] = useState({ labels: [], series: [] });
    const [pieChartData, setPieChartData] = useState({ labels: [], series: [] });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const chartRef = useRef(null);
    const chartRef1 = useRef(null);

    useEffect(() => {

      if (chartRef.current && isModalOpen) {
        // Le graphique est prêt, capturez l'image
        htmlToImage.toPng(chartRef.current).then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'chart.png';
          link.click();
        });
      }
        // Analyse le texte pour extraire les données (c'est un exemple simple).
    // const data = textData.match(/\d+/g).map(Number); // Extrait les nombres du texte.

    // Crée un tableau d'objets pour ApexCharts.
    // const chartData = {
    //   series: [
    //     {
    //       name: 'Données',
    //       data: data,
    //     },
    //   ],
    //   options: {
    //     chart: {
    //       type: 'bar',
    //     },
    //     xaxis: {
    //       categories: ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4'],
    //     },
    //   },
    // };

    // Met à jour le graphique avec les données.
    // chartRef.current.updateSeries(chartData.series);
    }, [isModalOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
      };
    const handleGraphiqueTypeChange = (event) => {
        setGraphiqueType(event.target.value);
    };
    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };
    const handleFontFamilyChange = (event) => {
        setFontFamily(event.target.value);
    };
    const handleFontStyleChange = (event) => {
        setFontStyle(event.target.value);
    };
    const handleTextColorChange = (event) => {
        setTextColor(event.target.value);
    };
    const handleChartLayoutChange = (event) => {
        setChartLayout(event.target.value);
      };
    const handleWidthChange = (event) => {
        setWidth(event.target.value);
    };

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    };
    
    const handleColorChange = (event) => {
        setColor(event.target.value);
    };   
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };  
    const handleSubTitleChange = (event) => {
        setSubTitle(event.target.value);
    };  
    const handleXChange = (event) => {
        setX(event.target.value);
    }; 
    const handleYChange = (event) => {
        setY(event.target.value);
    }; 
    const handleYMinChange = (event) => {
        setYMin(event.target.value);
    }; 
    const handleYMaxChange = (event) => {
        setYMax(event.target.value);
    }; 
    const generateChart = () => {
        if (!selectedFile) {
          alert('Please select a file.');
          return;
        }
    
        if (!x || !y) {
          alert('Please specify both X and Y columns.');
          return;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const fileData = e.target.result;
            // const XLSX = require('xlsx');
            const workbook = XLSX.read(fileData, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
    
            const sheetData = XLSX.utils.sheet_to_json(sheet);
    
            const xData = sheetData.map((row) => row[x]);
            const yData = sheetData.map((row) => row[y]);
            const yMin = Math.min(...yData);
            const yMax = Math.max(...yData);
            let series = [];
            if (graphiqueType === 'line' || graphiqueType === 'bar'|| graphiqueType==='area' 
            || graphiqueType==='radar'||graphiqueType==='scatter' || graphiqueType==='heatmap') {
                series = [{ name: y, data: yData }];
              } else if (graphiqueType === 'donut' || graphiqueType === 'pie') {
                series = yData;
              } else if (graphiqueType === 'boxplot') {
                // Utilisez les données de xData comme labels des boîtes
                const labels = xData;
                
                // Utilisez les données de yData pour créer les séries de boîtes
                series = yData.map((data, index) => {
                  return {
                    name: labels[index],  // Nommez chaque boîte avec l'étiquette correspondante
                    data: data,  // Données pour chaque boîte (quartiles Q1, médiane, Q3, min, max)
                  };
                });
            }else if (graphiqueType === 'bubble') {
                // Utilisez les données de xData, yData et sizeData pour créer les séries de données
                series = xData.map((x, index) => {
                  return {
                    x: x,           // Valeur x
                    y: yData[index], // Valeur y
                    z: sizeData[index], // Taille de la bulle
                  };
                });
              };
            const chartData = {
              labels: xData,
              series: series,
            };
      
              
            setChartData(chartData);
            setPieChartData(pieChartData);
            openModal();
          } catch (error) {
            console.error('Error reading file or creating chart:', error);
          }
        };
    
        reader.readAsArrayBuffer(selectedFile);
      };
   

      const options = {
      
        xaxis: {
          categories: chartData.labels,
        },
        // yaxis:{
        //     min: yMin,
        //     max: yMax,
        // },
        theme: {
            palette: 'palette2'
          },
        colors: [color], 
        chart: {
            type: graphiqueType,
            options3d: {
              enabled: true,
              alpha: 15,
              beta: 15,
              depth: 50,
              viewDistance: 25,
            },
          },
        plotOptions: {
            bar: {
                horizontal: chartLayout === 'horizontal',
              },
             
              
          },
       
       
        };
   
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      console.log(fontSize)
      const textStyle = {
        fontSize: `${fontSize}px` , 
        fontFamily: fontFamily,
        fontStyle:fontStyle,
        color:textColor,
      };
      for (let i = 10; i <= 40; i++) {
        fontSizeOptions.push(
          <option key={i} value={i}>
            {i}px
          </option>
        );
      }
    // const puppeteer = require('puppeteer');

    const generatePDF = () => {
        const doc = new jsPDF();
      
        // Capture le composant React en tant qu'image avec html2canvas.
        const chart = document.getElementById('chart');
        // const text = document.getElementById('text');
      
        html2canvas(chart).then((canvas) => {
          const chartImage = canvas.toDataURL('image/png');


        doc.addImage(chartImage, 'JPEG', 20, 20, 90, 70);

        // doc.text(10, 120, text.textContent);

        doc.save('ACH_MK.pdf');
        });
      };
      


      
      
      
    return (
        <section id="generate" className=' xl:px-16 lg:px-14 md:px-10 sm:px-6 py-6 ' >
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris ss:leading-[95px] leading-[45px]">
                    Chart Settings
                </h1>

            </div>

            <div className=' border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md bg-white'>

            <div className="text-center" style={{ paddingTop: "20px" }}>

            <DragDropFiles
                onFileChange={(files) => onFileChange(files)}
                accept=".xlsx, .xls"
            />  

        {/* <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
         
        /> */}
      </div>
                <div className=" grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1  ">

                    <div className={`${styles.fomatLabel}`}>
      
      
                        <label className={`${styles.label}`}>Graphique Type</label>
                        <select className={`${styles.select}`} value={graphiqueType} onChange={handleGraphiqueTypeChange}>
                            <option style={{ display: 'flex', alignItems: 'center' }}> line</option>
                            {/* <option >line</option> */}
                            <option >bar</option>
                            <option >pie</option>
                            <option >area</option>
                            <option >donut</option>
                            <option >radar</option>
                            <option >scatter</option>
                            <option >heatmap</option>
                            {/* <option >boxplot</option> */}
                            <option >bubble</option>




                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <div className={`${styles.fomatLabel}`} id='test'>
                        <label className={`${styles.label}`}>Width</label>
                        <select className={`${styles.select}`} value={width} onChange={handleWidthChange}>
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
                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Height</label>
                        <select className={`${styles.select}`} value={height} onChange={handleHeightChange}>
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
                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>BG Color</label>
                        <select className={`${styles.select}`} value={color} onChange={handleColorChange}>
                            <option value={'#70c58f'}>green</option>
                            <option value={'#E7870B'}>orange</option>
                            <option value={'#0F43C8'}>bleu</option>
                            <option value={'#d8102c'}>red</option>
                            <option value={'#010A0E'}>black</option>
                            <option value={'#720FAC'}>purple</option>
                            <option value={'#57525A'}>gris</option>
                            <option value={'#DFE810'}>yellow</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Chart Layout</label>
                        <select className={`${styles.select}`} value={chartLayout} onChange={handleChartLayoutChange}>
                        <option value="vertical">Vertical</option>
                        <option value="horizontal">Horizontal</option>
                        <option >Diagonal</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Graphique Title</label>
                        <input type="text" className={`${styles.input}`} value={title} onChange={handleTitleChange} />
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Graphique SubTitle</label>
                        <input className={`${styles.input}`} value={subTitle} onChange={handleSubTitleChange}/>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Axe X Title</label>
                        <input type="text" className={`${styles.input}`} onChange={handleXChange} value={x}/>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Axe Y Title</label>
                        <input type="text" className={`${styles.input}`} onChange={handleYChange} value={y}/>
                    </div>

                    {/* <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Source</label>
                        <input type="text" className={`${styles.input}`} />
                    </div> */}

         
                   
                   

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Y Minimal</label>
                        <input type="text" className={`${styles.input}`} value={yMin} onChange={handleYMinChange}/>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Y Maximal</label>
                        <input type="text" className={`${styles.input}`}  value={yMax} onChange={handleYMaxChange}/>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>threshold line</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>In 3D</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Grid</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Legend</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Show Values</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>
                            Plot color</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Rounded corners</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Color Gradient</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Transparent</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Shadow</label>
                    </div>

                    <div className={`${styles.fomatLabel}`}>
                        <input type="checkbox" value="" className={`${styles.inputCheck}`} />
                        <label for="default-checkbox" className={`${styles.labelCheck}`}>Border</label>
                    </div>

                </div>
              
            </div>



            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris ss:leading-[95px] leading-[45px]">
                    Text Settings
                </h1>

            </div>
            <div className='bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md '>

       
                <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1 ">

            

                <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Color</label>
                        <select className={`${styles.select}`} value={textColor} onChange={handleTextColorChange}>
                          <option value={'#70c58f'}>green</option>
                            <option value={'#E7870B'}>orange</option>
                            <option value={'#0F43C8'}>bleu</option>
                            <option value={'#d8102c'}>red</option>
                            <option value={'#010A0E'}>black</option>
                            <option value={'#720FAC'}>purple</option>
                            <option value={'#57525A'}>gris</option>
                            <option value={'#DFE810'}>yellow</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                        </div>
                  

                  

                    

          
                
               
         
                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Police</label>
                        <select className={`${styles.select}`} value={fontFamily} onChange={handleFontFamilyChange}>
                            <option value={'Goudy Bookletter 1911,sans-erif'} >Goudy Bookletter 1911</option>
                            <option value={'Georgia, serif'}>Georgia</option>
                            <option value={'cursive'} >cursive</option>
                            <option value={'Gill Sans, sans-serif'} >Gill Sans</option>

                        </select>   
                    
                        
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Style</label>
                        <select className={`${styles.select}`} value={fontStyle} onChange={handleFontStyleChange}>
                            <option value={'normal'} >Norml</option>
                            <option value={'italic'}>Italic</option>
                            <option value={'oblique'} >Oblique</option>

                        </select>   
                    
                        
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-gris ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                    <div className={`${styles.fomatLabel}`}>
                        <label className={`${styles.label}`}>Size</label>
                        <select className={`${styles.select}`} value={fontSize} onChange={handleFontSizeChange}>
        {fontSizeOptions}
      </select>
      
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 py-3 text-white ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </div>
                    </div>
                   

                

         
                   
             

                </div>
               
            </div>
            <div className='flex justify-center'>
                    <button type="button" onClick={generateChart} className={` w-56 py-3 px-6 m-3 font-poppins font-medium text-[18px] text-white  bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
                        Generate
                    </button>
                    <Modal id='modal'
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Chart Modal"
        ariaHideApp={false}
        style={{
          content: {
            width:'70%',
            height:'90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:'5.5cm',
            

          },
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        }}
      >
        <h2 style={textStyle}>{title}</h2>
        <h4 >{subTitle}</h4>
        <Chart id='chart' ref={chartRef} type={graphiqueType}   width={width} height={height}         series={chartData.series}
 options={options} />
        <div id='modalbtns'>
          <button className="modalbtns">Save</button>
          <button className="modalbtns" onClick={generatePDF}>Download</button>
          <button className="modalbtns">Interpret</button>
          <button className="modalbtns" onClick={closeModal}>Close</button>

        </div>
      </Modal>
      <div>

    </div>
                </div>
        </section>
      
    )
}

export default GenerateForm