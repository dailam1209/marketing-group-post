import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'

const PdfGenerator = async (contentId) => {
    console.log('not html2pdf')

    const contentElement = document.getElementById(contentId);

    // Check if the element is found
    if (!contentElement) {
        console.error(`Element with id '${contentId}' not found.`);
        return;
    }

    // Save the initial visibility state
    const initialVisibility = contentElement.style.visibility;

    // Make the element temporarily visible
    contentElement.style.visibility = 'visible';

    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait mode

    const canvas = await html2canvas(contentElement, {
        width: contentElement.offsetWidth,
        height: contentElement.offsetHeight,
        scale: 1, // Set the scale factor to 1 to avoid additional scaling
    });

    const imageData = canvas.toDataURL('image/png', 1.0);

    // Calculate the position to center the content on the A4 page
    const xPos = (210 - (canvas.width * 25.4 / 96)) / 2; // Convert pixels to mm
    const yPos = (297 - (canvas.height * 25.4 / 96)) / 2; // Convert pixels to mm

    pdf.addImage(imageData, 'PNG', xPos, yPos, canvas.width * 25.4 / 96, canvas.height * 25.4 / 96); // Convert pixels to mm

    // Restore the initial visibility state
    contentElement.style.visibility = initialVisibility;

    // Open the PDF in a new tab
    window.open(pdf.output('bloburl'), '_blank');


    // var element = document.getElementById(contentId);
    // html2pdf(element);
};

export default PdfGenerator;