import { getItem, getItems, createItems, createBulkItems, 
  updateItems, deleteItems} from '../crudService';
import { Reports, Royalties, RoyaltiesCtrs, RoyaltiesTrks, Incomes, Contracts, 
  ContractsCtrs, Contractors, Tracks, Payments } from '../../database/models/index';

import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";


export async function getReport (id) {
  const data = await getItem(Reports, id);
  return data;
}

export async function getReports () {
  dayjs.extend(customParseFormat);

  const cs = await getItems(Reports);

  const data = [];
  for(const c of cs){

    const [rId] = await getItem(Royalties, c.royaltyId);
    const [ctr] = await getItem(Contractors, rId.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
    const date = dayjs(c.createdAt).format('DD.MM.YYYY HH:mm');

    data.push({
      id: c.id,
      contractor: contractor,
      date: date,
      royaltyId: c.royaltyId,
      totalIncomes: c.totalIncomes,
      totalPayments: c.totalPayments,
      totalSaldo: c.totalSaldo,
    });

    console.log(data);
  }

  return data;
}


export async function createReport (values) {  
  dayjs.extend(customParseFormat);

  const royaltyId = +values.royaltyId;
  const contractorId = +values.contractorId;
  const pdfBody = [[
    '',
    '',
    'I',
    'II',
    'III',
    'IV',
    'сумма ₽',
    'I',
    'II',
    'III',
    'IV',
    'сумма ₽',
  ]];

  let totalIncomes = 0;
  let totalPayments = 0;
  let totalSaldo = 0;
  

  if(isNaN(royaltyId) || isNaN(contractorId)){
    return false;
  }

  // как подсчитать?
  // - проверяем есть ли Роялти по исполнителю (по royaltyId и contractorId)
  const royalty = await Royalties.findOne({
    where: {
      id: royaltyId,
      contractorId: contractorId,
    },
  }).catch(e => e);
  if(!royalty){ return false }

  // - берем все треки (по royaltyId и contractorId) из RoyaltiesTrks
  await RoyaltiesTrks.findAll({
    where: {
      royaltyId: royaltyId,
      contractorId: contractorId,
    },
  }).then(async tracks => {
    if(tracks){
      console.log('tracks.length', tracks.length);

      for(const t of tracks){
        const [track] = await getItem(Tracks, t.trackId);

        // - берем роялти кварталов по годам (по royaltyId и dopContractorId и trackId) из RoyaltiesCtrs
        await RoyaltiesCtrs.findAll({
          where: {
            royaltyId: t.royaltyId,
            dopContractorId: t.contractorId,
            trackId: t.trackId,
          },
        }).then(async years => {
          if(years){
            console.log('contractors.length', years.length);


            for(const year of years){
              // - берем Выплаты кварталов за год
              await Payments.findOne({
                where: {
                  contractorId: year.dopContractorId,
                  trackId: year.trackId,
                  year: year.year,
                },
              }).then(p => {
                if(p){

                  // - считаем разницу, выводим все что можно 
                  const paymentsTotal = +(p.q1 + p.q2 + p.q3 + p.q4).toFixed(2);
                  const saldo = +(year.total - paymentsTotal).toFixed(2);
                  pdfBody.push([
                    track.name,
                    year.year,
                    year.q1,
                    year.q2,
                    year.q3,
                    year.q4,
                    year.total,
                    p.q1,
                    p.q2,
                    p.q3,
                    p.q4,
                    paymentsTotal,
                    saldo
                  ]);

                  totalIncomes += +(year.total).toFixed(2);
                  totalPayments += +(paymentsTotal).toFixed(2);
                  totalSaldo += +(saldo).toFixed(2);

                }

              });
            }
          }
        }).catch(e => e);
      }
    }
  }).catch(e => e);
  // console.log(tracks);

  pdfBody.push([
    { content: '', colSpan: 6},
    totalIncomes,
    { content: '', colSpan: 4},
    totalPayments,
    totalSaldo,
  ]);

  // - сохраняем результат в таблице Reports
  const addValues = {
    royaltyId: royaltyId,
    totalIncomes: totalIncomes,
    totalPayments: totalPayments,
    totalSaldo: totalSaldo,
  }
  const data = await createItems(Reports, addValues);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  // - сохраняем результат в файле PDF 
  const doc = new jsPDF('l', 'mm', [297, 210]); // landscape
  doc.addFont('public/fonts/DejaVuSans.ttf', 'DejaVuSans', 'normal');
  doc.addFont('public/fonts/DejaVuSans-Bold.ttf', 'DejaVuSans', 'bold');
  doc.setFont('DejaVuSans'); // cyrillic

  autoTable(doc, { html: '#my-table' });

  doc.setTextColor(100);
  doc.setFontSize(18);

  const [ctr] = await getItem(Contractors, contractorId);
  const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;

  doc.text(`${contractor}`, 14, 22);
  doc.setFontSize(11);

  const date = dayjs(data.createdAt).format('DD.MM.YYYY HH:mm');
  const text = `Расчет от ${date}`;
  doc.text(text, 14, 30);

  autoTable(doc, {
    head: [
      [
        { content: 'Трек', styles: { valign: 'middle', halign: 'center' }  },
        { content: 'Год', styles: { valign: 'middle', halign: 'center' }  },
        { content: 'Роялти', colSpan: 5, styles: { valign: 'middle', halign: 'center' } },
        { content: 'Выплаты', colSpan: 5, styles: { valign: 'middle', halign: 'center' }  },       
        { content: 'Сальдо', styles: { valign: 'middle', halign: 'center' }  },
      ]
    ],
    body: pdfBody,
    startY: 36,
    styles: { font: 'DejaVuSans' },
    theme: 'grid',
  });

  const reportId = data.id;
  doc.save(`public/pdfs/${reportId}.pdf`);

  return data;
}



export async function deleteReport (id) {
  const data = {};

  const isDeleted = await deleteItems(Reports, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}

