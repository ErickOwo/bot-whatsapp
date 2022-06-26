const XLSX = require('xlsx');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const country_code = '502'
const number = '42261632'

const client = new Client();

client.initialize();

const readXLSX = file =>{
  const workbook = XLSX.readFile(file);
  const workbookSheets = workbook.SheetNames;

  const sheet = workbookSheets[0];

  const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  for(let i=0; i < dataExcel.length; i++){
    const chatId = country_code + number + '@c.us';
    const msg = `Avon: se notifica a ${dataExcel[i].CLIENTE} la solicitud urgentemente su pago vencido de Q. ${dataExcel[i]['SALDO + MORA']}. Evite Intereses y gtos. De cobranza Comuniquese al 57323428`;

    client.sendMessage(chatId, msg)
  }
}

client.on('qr', qr =>{
  qrcode.generate(qr, {small: true});
})

client.on('ready', ()=>{
  // readXLSX('./xela.xlsx');
  console.log('Sessión iniciada.')
})

client.on('message', msg =>{
  const chatId = country_code + number + '@c.us';
  const msgToSend = `Mensage del número: ${msg.from.slice(3,-5)} 
  (${msg._data.notifyName})
  
  Mensaje: ${msg.body}`;
  client.sendMessage(chatId, msgToSend)
})


