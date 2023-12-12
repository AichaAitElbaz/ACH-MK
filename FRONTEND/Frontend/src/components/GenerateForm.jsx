import React, { useState, useRef,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Modal from 'react-modal';
import styles, { layout } from "../style";
import { Select, initTE } from "tw-elements";
import * as XLSX from 'xlsx';
import { updown, down, logo ,close} from '../assets';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const GenerateForm = () => {
    const [csvContent, setCSVContent] = useState('');
    const [interpretation, setInterpretation] = useState('');
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
    const [yData, setYData] = useState('yData');
    const [xData, setXData] = useState('xData');

    const[yMin,setYMin]= useState('yMin');
    const[yMax,setYMax]= useState('yMax');

    const [chartData, setChartData] = useState({ labels: [], series: [] });
    const [pieChartData, setPieChartData] = useState({ labels: [], series: [] });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const chartRef = useRef(null);
    const chartRef1 = useRef(null);
    const [showManualInput, setShowManualInput] = useState(false);

 
  


  
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
    const handleYDataChange = (event) => {
      setYData(event.target.value);
  }; 
  const handleXDataChange = (event) => {
    setXData(event.target.value);
}; 
    const handleYMinChange = (event) => {
        setYMin(event.target.value);
    }; 
    const handleYMaxChange = (event) => {
        setYMax(event.target.value);
    }; 
    const isValidData = (data) => {
      return data.every((value) => value !== null && value !== undefined);
    };

    const generateChartFromFile= () => {
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
          
            let series = [];
             

            if (!isValidData(xData) || !isValidData(yData) ) {
              // Gérer les valeurs manquantes ici (remplacement par des valeurs par défaut, suppression, etc.)
              alert('please check your data');
              return;
            }

            if (graphiqueType === 'line' || graphiqueType === 'bar'|| graphiqueType==='area' 
            || graphiqueType==='radar'||graphiqueType==='scatter' || graphiqueType==='heatmap') {
                series = [{ name: y, data: yData }];
              } else if (graphiqueType === 'donut' || graphiqueType === 'pie') {
                series = yData
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
            openModal();
            console.log(chartData)
          } catch (error) {
            console.error('Error reading file or creating chart:', error);
          }
        };
    
        reader.readAsArrayBuffer(selectedFile);
      };
      const generateChartManual = () => {
        let series = [];
        // Vérifier et traiter les valeurs manquantes dans xData, yData et sizeData
         

    
        if (graphiqueType === 'line' || graphiqueType === 'bar'|| graphiqueType==='area' 
        || graphiqueType==='radar'||graphiqueType==='scatter' || graphiqueType==='heatmap') {
            series = [{ name: y, data: yData.split('\n').map(value => value.trim()) }];
          } else if (graphiqueType === 'donut' || graphiqueType === 'pie') {
           series = yData.split('\n').map(value => parseFloat(value.trim())); 
            
          } else if (graphiqueType === 'boxplot') {
            // Utilisez les données de xData comme labels des boîtes
            const labels = xData.split('\n').map(value => value.trim());
            
            // Utilisez les données de yData pour créer les séries de boîtes
            series = yData.map((data, index) => {
              return {
                name: labels[index],  // Nommez chaque boîte avec l'étiquette correspondante
                data: data,  // Données pour chaque boîte (quartiles Q1, médiane, Q3, min, max)
              };
            });
        }else if (graphiqueType === 'bubble') {
            // Utilisez les données de xData, yData et sizeData pour créer les séries de données
            series = (xData.split('\n').map(value => value.trim())).map((x, index) => {
              return {
                x: x,           // Valeur x
                y:( yData.split('\n').map(value => value.trim()))[index], // Valeur y
                z: sizeData[index], // Taille de la bulle
              };
            });
          };
        const chartData = {
          labels: xData.split('\n').map(value => value.trim()),
          series: series,
        };
  
        setChartData(chartData);
        openModal();
        console.log(chartData)
     
      };
      const generateChart = () => {
        if (selectedFile && (xData || yData)) {
          alert('Please select just one method to insert data.');
          return;
   
        } else if (selectedFile) {
          // Si un fichier a été sélectionné mais aucune donnée manuelle n'a été saisie
          generateChartFromFile();
        } else if (xData || yData) {
          // Si des données manuelles ont été saisies sans sélection de fichier
          generateChartManual();
        } else {
          alert('Please select insert data.');
          return;

        }
      };
      const handleManualDataInput = () => {
      //  chartData.labels=xData.split('\n').map(value => value.trim()); // Séparer les valeurs de X par saut de ligne
      //  chartData.series.yData=yData.split('\n').map(value => value.trim()); // Séparer les valeurs de Y par saut de ligne
    
        // Votre logique pour utiliser les valeurs de xValues et yValues ici
        // ...
    
        console.log(chartData);

  
      };

      const options = {

        xaxis: {
          categories: chartData.labels,
        },
        labels: chartData.labels,

   
        colors: [color], 
        chart: {
            type: graphiqueType,
          },
        plotOptions: {
            
             bar: {
                horizontal: chartLayout === 'horizontal',
              },
              line: {
                horizontal: chartLayout === 'horizontal',
              },
          },
       
       
        };
      // const options = {
      //   labels: chartData.labels,

      //   xaxis: {
      //     categories: chartData.labels,
      //   },
   
      //   colors: [color], 
      //   chart: {
      //       type: graphiqueType,
      //     },
      //   plotOptions: {
      //       bar: {
      //           horizontal: chartLayout === 'horizontal',
      //         },
             
              
      //     },
       
       
      //   };
        const handleSubmit = async (e) => {
          e.preventDefault();
    
          // Extract relevant chart content data here from your existing variables
          const chartContent = {
            chartType: graphiqueType,
            chartData:chartData
            // Add other necessary data properties from your chart if needed
          };
        
          try {
            const response = await axios.post('http://127.0.0.1:8000/generate_interpretation/', { chart_content: chartContent });
            setInterpretation(response.data.interpretation);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
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
        <section id="generate" className=' px-16 py-6' >
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris ss:leading-[95px] leading-[45px]">
                    Chart Settings
                </h1>

            </div>
            <div className='bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md '>

            <div className="text-center" style={{ paddingTop: "20px" }}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
         
        />
        
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px' }}>
          <label htmlFor="xDataTextarea">Données X :</label>
          <textarea
            id="xDataTextarea"
            value={xData}
            onChange={handleXDataChange}
            rows={10} // Nombre de lignes pour la zone de texte
            cols={50} // Nombre de colonnes pour la zone de texte
            placeholder="Saisissez vos données X ici (une valeur par ligne)..."
          />
        </div>

        <div>
          <label htmlFor="yDataTextarea">Données Y :</label>
          <textarea
            id="yDataTextarea"
            value={yData}
            onChange={handleYDataChange}
            rows={10} // Nombre de lignes pour la zone de texte
            cols={50} // Nombre de colonnes pour la zone de texte
            placeholder="Saisissez vos données Y ici (une valeur par ligne)..."
          />
        </div>
   
      </div>
      {/* <button onClick={handleManualDataInput}>
        Insérer 
      </button> */}
      {/* Graphique et autres éléments ici */}
      ...
  

      </div>
                <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1 ">

                    <div class="inline-block relative w-56 mx-2 my-6">
      
      
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

                    <div class="inline-block relative w-56 mx-2 my-6" id='test'>
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
                    <div class="inline-block relative w-56 mx-2 my-6">
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
                    <div class="inline-block relative w-56 mx-2 my-6">
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
                    <div class="inline-block relative w-56 mx-2 my-6">
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

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Graphique Title</label>
                        <input type="text" className={`${styles.input}`} value={title} onChange={handleTitleChange} />
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Graphique SubTitle</label>
                        <input className={`${styles.input}`} value={subTitle} onChange={handleSubTitleChange}/>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Axe X Title</label>
                        <input type="text" className={`${styles.input}`} onChange={handleXChange} value={x}/>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Axe Y Title</label>
                        <input type="text" className={`${styles.input}`} onChange={handleYChange} value={y}/>
                    </div>

                    {/* <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Source</label>
                        <input type="text" className={`${styles.input}`} />
                    </div> */}

         
                   
                   
{/* 
                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Y Minimal</label>
                        <input type="text" className={`${styles.input}`} value={yMin} onChange={handleYMinChange}/>
                    </div>

                    <div class="inline-block relative w-56 mx-2 my-6">
                        <label className={`${styles.label}`}>Y Maximal</label>
                        <input type="text" className={`${styles.input}`}  value={yMax} onChange={handleYMaxChange}/>
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
                    </div> */}

                </div>
              
            </div>



            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins text-center font-medium ss:text-[38px] text-[22px] text-gris ss:leading-[95px] leading-[45px]">
                    Text Settings
                </h1>

            </div>
            <div className='bg-white border-2 border-schemes rounded-[10px] py-[20px] px-4 shadow-md '>

       
                <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1 ">

            

                <div class="inline-block relative w-56 mx-2 my-6">
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
                  

                  

                    

          
                
               
         
                    <div class="inline-block relative w-56 mx-2 my-6">
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
                    <div class="inline-block relative w-56 mx-2 my-6">
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
                    <div class="inline-block relative w-56 mx-2 my-6">
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
        <Chart id='chart' ref={chartRef}  type={graphiqueType}   width={width} height={height}   series={chartData.series} options={options} />
        <div id='modalbtns'>
          <button className="modalbtns">Save</button>
          <button className="modalbtns" onClick={generatePDF}>Download</button>
          <button className="modalbtns"  onClick={handleSubmit} >Interpret</button>
          <button className="modalbtns" onClick={closeModal}>Close</button>

        </div>
        <div>
 

      {interpretation && (
        <div>
          <h3>Graph Interpretation:</h3>
          <p>{interpretation}</p>
        </div>
      )}
    </div>
      </Modal>
      <div>

    </div>
                </div>
        </section>
      
    )
}

export default GenerateForm