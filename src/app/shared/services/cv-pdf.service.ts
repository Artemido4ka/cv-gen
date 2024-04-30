import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { sendingCVFormatedInterface } from '../types/cv.type';

@Injectable({
  providedIn: 'root',
})
export class CvPdfService {
  handlePDF(data: sendingCVFormatedInterface) {
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    this.createHeader(doc, pageWidth, pageHeight);

    //INFO_TEXT
    doc.setFontSize(24).text(`${data.firstName} ${data.lastName}`, 10, 40);
    doc.setFontSize(16).text(data.department, 10, 50);

    this.createSideBar(doc, data);
    this.createProjects(doc, data);

    // doc.save(data.cvName);
    doc.output('dataurlnewwindow');
  }

  createHeader(doc: jsPDF, pageWidth: number, pageHeight?: number) {
    doc.setFontSize(16);
    doc.text('CVgen', pageWidth - 30, 12);

    //H Line
    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(10, 20, pageWidth - 10, 20);

    //V Line
    doc.setLineWidth(0.3);
    doc.line(90, 70, 90, pageHeight - 10);
  }

  createSideBar(doc: jsPDF, data: sendingCVFormatedInterface) {
    const STEP_BETWEEN_ITEMS = 8;
    const STEP_BETWEEN_GROUPS = 20;
    const STEP_BETWEEN_ARRAY_ITEMS = 4;
    const X_DEFAULT_POS = 10;
    const STEP_BETWEEN_LANG = 40;

    let yPosSideBar = 80;
    let xPosSideBar = X_DEFAULT_POS;

    doc.setFontSize(14);

    doc.setFont(undefined, 'bold').text('Email:', X_DEFAULT_POS, yPosSideBar);
    yPosSideBar += STEP_BETWEEN_ITEMS;
    doc.setFont(undefined, 'normal').text(data.email, X_DEFAULT_POS, yPosSideBar);

    yPosSideBar += STEP_BETWEEN_GROUPS;
    doc.setFont(undefined, 'bold').text('Specialization:', X_DEFAULT_POS, yPosSideBar);
    yPosSideBar += STEP_BETWEEN_ITEMS;
    doc.setFont(undefined, 'normal').text(data.specialization, X_DEFAULT_POS, yPosSideBar);

    yPosSideBar += STEP_BETWEEN_GROUPS;
    doc.setFont(undefined, 'bold').text('Skills:', X_DEFAULT_POS, yPosSideBar);

    yPosSideBar += STEP_BETWEEN_ITEMS;
    data.skills.forEach(s => {
      const skillWidth = doc.getTextWidth(s);
      doc.setFont(undefined, 'normal').text(s, xPosSideBar, yPosSideBar);
      if (xPosSideBar > 60) {
        yPosSideBar += STEP_BETWEEN_ITEMS;
        xPosSideBar = X_DEFAULT_POS;
        return;
      }

      xPosSideBar = xPosSideBar + skillWidth + STEP_BETWEEN_ARRAY_ITEMS;
    });

    yPosSideBar += STEP_BETWEEN_GROUPS;
    doc.setFont(undefined, 'bold').text('Languages:', X_DEFAULT_POS, yPosSideBar);

    data.language.forEach(l => {
      doc
        .setFont(undefined, 'normal')
        .text(l.name.name, X_DEFAULT_POS, yPosSideBar + STEP_BETWEEN_ITEMS)
        .text(l.level.name, X_DEFAULT_POS + STEP_BETWEEN_LANG, yPosSideBar + STEP_BETWEEN_ITEMS);
      yPosSideBar += STEP_BETWEEN_ITEMS;
    });
  }

  createProjects(doc: jsPDF, data: sendingCVFormatedInterface) {
    const X_DEFAULT_POS = 110;
    const STEP_BETWEEN_ITEMS = 10;
    const STEP_BETWEEN_PROJECTS = 20;

    let yPosProj = 80;
    const xPosProj = X_DEFAULT_POS;
    const contentMaxW = { maxWidth: 100 };

    doc.setFontSize(14).setFont(undefined, 'bold').text('Projects:', xPosProj, yPosProj);
    yPosProj += STEP_BETWEEN_PROJECTS;

    data.projects.forEach(p => {
      doc.setFont(undefined, 'bold').text(p.projectName, xPosProj, yPosProj);
      doc.setFont(undefined, 'normal');
      doc.text(`${p.startDate}- ${p.endDate}`, xPosProj, yPosProj + STEP_BETWEEN_ITEMS);

      yPosProj = this.checkPage(yPosProj, doc);
      doc.text(`Team size: ${p.teamSize}`, xPosProj, yPosProj + STEP_BETWEEN_ITEMS);

      yPosProj = this.checkPage(yPosProj, doc);
      doc.text(
        `Description: ${p.description}`,
        xPosProj,
        yPosProj + STEP_BETWEEN_ITEMS,
        contentMaxW
      );

      const descriptionSize = doc.getTextDimensions(p.description, contentMaxW);
      yPosProj = this.checkPage(yPosProj, doc, descriptionSize.h);
      doc.text(
        `Responsibilities: ${p.responsibilities}`,
        xPosProj,
        yPosProj + STEP_BETWEEN_ITEMS,
        contentMaxW
      );

      const responsibilitiesSize = doc.getTextDimensions(
        `Responsibilities: ${p.responsibilities}`,
        contentMaxW
      );
      yPosProj = this.checkPage(yPosProj, doc, responsibilitiesSize.h);
      doc.text(`TechStack: ${p.techStack}`, xPosProj, yPosProj + STEP_BETWEEN_ITEMS, contentMaxW);

      const techStackSize = doc.getTextDimensions(`TechStack: ${p.techStack}`, contentMaxW);
      yPosProj = this.checkPage(yPosProj, doc, techStackSize.h, STEP_BETWEEN_PROJECTS);
    });
  }

  checkPage(pos: number, doc: jsPDF, step = 0, margin = 10) {
    if (pos > doc.internal.pageSize.height - 40) {
      doc.addPage();
      this.createHeader(doc, doc.internal.pageSize.width, doc.internal.pageSize.height);
      return margin + 60;
    }

    return (pos += margin + step);
  }
}
