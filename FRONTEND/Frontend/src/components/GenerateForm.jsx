import React, { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Modal from 'react-modal';
import styles, { layout } from "../style";
import { Select, initTE } from "tw-elements";
import * as XLSX from 'xlsx';
import { updown, down, logo, close } from '../assets';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { DragDropFiles } from './index';
import './DragDropFile/drop.css';

import { ImageConfig } from './DragDropFile/ImageConfig';
import { uploadImg } from '../assets/index';
import { useSelector } from 'react-redux';
import { toBase64Image } from 'chartjs-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GenerateForm = () => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [newFile];
      setFileList(updatedList);

      setSelectedFile(newFile);
      const filename = newFile.name;
      setFilename(filename);

    }


  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  }
  const [csvContent, setCSVContent] = useState('');
  const [interpretation, setInterpretation] = useState('');

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
  const [filename, setFilename] = useState('');

  const fontSizeOptions = [];
  const [chartLayout, setChartLayout] = useState('vertical'); // Initialisez la disposition à "vertical"


  const [x, setX] = useState('x');
  const [y, setY] = useState('y');
  const [yData, setYData] = useState('yData');
  const [xData, setXData] = useState('xData');

  const [yMin, setYMin] = useState('yMin');
  const [yMax, setYMax] = useState('yMax');

  const [chartData, setChartData] = useState({ labels: [], series: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], series: [] });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);
  const [showManualInput, setShowManualInput] = useState(false);


  const [interpretationFile, setInterpretationFile] = useState(null);

  const user = useSelector(state => state.auth.user);
  const [userId, setUserId] = React.useState(null);



  const handleeSubmit = async () => {
    // Utilize useSelector to retrieve the user from the Redux state
    setUserId(user.id);
    const formData = new FormData();
    const chart = document.getElementById('chart');

    // Convert the chart to a PDF document using jsPDF
    const doc = new jsPDF();
    html2canvas(chart).then(async (canvas) => {
      const chartImage = canvas.toDataURL('image/png');
      doc.addImage(chartImage, 'JPEG', 10, 10, 90, 70);
      // Save the PDF document content as a Blob
      const pdfBlob = doc.output('blob');
      // Create a File object from the Blob
      const pdfFile = new File([pdfBlob], `${filename}_chart.pdf`, { type: 'application/pdf' });
      // Append the PDF file to the FormData for the 'graph' key
      formData.append('graph', pdfFile);


      const doc2 = new jsPDF();
      const fontSize = 12; // Ajustez selon vos besoins
      doc2.setFontSize(fontSize);
      const textX = 10; // Ajustez selon vos besoins

      // Ajouter la chaîne interpretation à doc2
      const interpretationText = interpretation || 'Aucune interprétation disponible';

      // Positionner le texte au centre horizontalement
      const textWidth = doc2.getStringUnitWidth(interpretationText) * fontSize / doc2.internal.scaleFactor;
      const textXCentered = (doc2.internal.pageSize.width - textWidth) / 2;

      // Ajouter le contenu de la chaîne interpretation à doc2
      doc2.text(textXCentered, 10, interpretationText); // 10 est la coordonnée y, ajustez selon vos besoins

      // Générer le fichier PDF
      const pdfBlob2 = doc2.output('blob');
      const pdfFile2 = new File([pdfBlob2], `${filename}_interpretation.pdf`, { type: 'application/pdf' });
      formData.append('interpretation', pdfFile2);






      if (selectedFile) {
        // Si selectedFile existe, l'ajouter à formData
        formData.append('source', selectedFile);
      } else {


        const doc = new jsPDF();

        // Ajouter le contenu du graphique dans le PDF
        doc.text(10, 10, 'Labels: ' + chartData.labels.join(', ')); // Ajoutez les étiquettes
        doc.text(10, 20, 'Series: ' + JSON.stringify(chartData.series)); // Ajoutez les séries

        // Générer le Blob du PDF
        const pdfBlob3 = doc.output('blob');

        const pdfFile3 = new File([pdfBlob3], 'DATA.pdf', { type: 'application/pdf' });

        // Ajouter le Blob du PDF à formData
        formData.append('source', pdfFile3);

      }

      formData.append('userid', user.id);

      try {
        const response = await fetch('http://localhost:8000/account/api/add_graph/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Graph saved successefly');
          // Add your logic for success here
        } else {
          toast.error('You have to login first');
          // Add your logic for failure here
        }
      } catch (error) {
        toast.error('Error while saving');
        // Handle the error here
      }
    });
  };










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

    if (file) {
      // Obtenez le nom du fichier
      const fileName = file.name;
      setFilename(fileName);



    }


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

  const generateChartFromFile = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    } if (!x || !y) {
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


        if (!isValidData(xData) || !isValidData(yData)) {
          // Gérer les valeurs manquantes ici (remplacement par des valeurs par défaut, suppression, etc.)
          alert('please check your data');
          return;
        }

        if (graphiqueType === 'line' || graphiqueType === 'bar' || graphiqueType === 'area'
          || graphiqueType === 'radar' || graphiqueType === 'scatter' || graphiqueType === 'heatmap') {
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
        } else if (graphiqueType === 'bubble') {
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

    if (graphiqueType === 'line' || graphiqueType === 'bar' || graphiqueType === 'area'
      || graphiqueType === 'radar' || graphiqueType === 'scatter' || graphiqueType === 'heatmap') {
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
    } else if (graphiqueType === 'bubble') {
      // Utilisez les données de xData, yData et sizeData pour créer les séries de données
      series = (xData.split('\n').map(value => value.trim())).map((x, index) => {
        return {
          x: x,           // Valeur x
          y: (yData.split('\n').map(value => value.trim()))[index], // Valeur y
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

    console.log(chartData);


  };

  const options = {
    labels: xData.split('\n').map(value => value.trim()),

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract relevant chart content data here from your existing variables
    const chartContent = {
      chartType: graphiqueType,
      chartData: chartData
      // Add other necessary data properties from your chart if needed
    };

    try {
      const response = await axios.post('http://localhost:8000/account/generate_interpretation/', { chart_content: chartContent });
      setInterpretation(response.data.interpretation);

      const doc = new jsPDF();

      // Add the interpretation text to the PDF
      doc.text(interpretationText, 10, 10);
      setInterpretationFile(doc);
      toast.success('Interpretation Generated');

    } catch (error) {
      toast.error('Error');
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
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    fontStyle: fontStyle,
    color: textColor,
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

    // Capture the React component as an image with html2canvas.
    const chart = document.getElementById('chart');
    const interpretation = document.getElementById('interpretation').innerText; // Get text from the 'interpretation' element

    html2canvas(chart).then((canvas) => {
      const chartImage = canvas.toDataURL('image/png');

      const imageWidth = 90; // Adjust as needed
      const imageHeight = 70; // Adjust as needed
      const imageX = (doc.internal.pageSize.width - imageWidth) / 2; // Center horizontally
      const imageY = (doc.internal.pageSize.height - imageHeight) / 2; // Center vertically

      doc.addImage(chartImage, 'JPEG', imageX, imageY, imageWidth, imageHeight);

      // Reduce the font size for the text
      const fontSize = 12; // Adjust as needed
      doc.setFontSize(fontSize);

      // Calculate text width and position it in the center
      const textWidth = doc.getStringUnitWidth(interpretation) * fontSize / doc.internal.scaleFactor;
      const textX = (doc.internal.pageSize.width - textWidth) / 2; // Center horizontally

      // Add the content from the 'interpretation' element to the PDF
      doc.text(textX, imageY + imageHeight + 10, interpretation); // Positioned below the image

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

      {/* /Drag file */}

      <div
        ref={wrapperRef}
        className="drop-file-input my-8"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" accept=".xlsx, .xls" value="" onChange={onFileDrop} />
      </div>
      {
        fileList.length == 1 ? (
          <div className="drop-file-preview">
            <p className="drop-file-preview__title">
              Ready to upload
            </p>
            {
              fileList.map((item, index) => (
                <div key={index} className="drop-file-preview__item">
                  <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                  <div className="drop-file-preview__item__info">
                    <p>{item.name}</p>
                    <p>{item.size}B</p>
                  </div>
                  <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                </div>
              ))
            }
          </div>
        ) : null
      }

      <div className=' form_division my-4 shadow-md bg-white'>


        <div className='sky-form '>
          Insertion Manuelle
        </div>

        <div className=" grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1  ">



          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '20px' }}>
              <label className={`${styles.label}`}>Données X :</label>
              <label htmlFor="xDataTextarea" className={`${styles.label}`}>Données X :</label>
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
              <label htmlFor="yDataTextarea" className={`${styles.label}`}>Données Y :</label>
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

          ...


        </div>


      </div>

      <div className=' form_division  shadow-md bg-white'>


        <div className='sky-form '>
          Paramètres du Graphique
        </div>
        <div className=" grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 content-evenly items-center py-6 grid-cols-1 ">


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
            <input className={`${styles.input}`} value={subTitle} onChange={handleSubTitleChange} />
          </div>

          <div className={`${styles.fomatLabel}`}>
            <label className={`${styles.label}`}>Axe X Title</label>
            <input type="text" className={`${styles.input}`} onChange={handleXChange} value={x} />
          </div>

          <div className={`${styles.fomatLabel}`}>
            <label className={`${styles.label}`}>Axe Y Title</label>
            <input type="text" className={`${styles.input}`} onChange={handleYChange} value={y} />
          </div>
        </div>

        <div>
          <h3 className='m-4 text-gray-700'>Text Paramètres</h3>
        </div>
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
              width: '70%',
              height: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '5.5cm',


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
          <Chart id='chart' ref={chartRef} type={graphiqueType} width={width} height={height} series={chartData.series} options={options} />
          <div id='modalbtns'>
          <ToastContainer/>

            <button className="modalbtns" onClick={handleeSubmit} >Save</button>
            <button className="modalbtns" onClick={generatePDF}>Download</button>
            <button className="modalbtns" onClick={handleSubmit} >Interpret</button>
            <button className="modalbtns" onClick={closeModal}>Close</button>

          </div>
          <div>


            {interpretation && (
              <div>
                <h3>Graph Interpretation:</h3>
                {/* <p contentEditable="true" id='interpretation'>{interpretation}</p> */}
                <p contentEditable="true" id='interpretation'>{interpretation}</p>

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