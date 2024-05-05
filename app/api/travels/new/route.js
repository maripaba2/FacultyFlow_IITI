import Travel from "@models/travel";
import { connectToDB } from "@utils/database";
const nodemailer = require('nodemailer');
const cron = require('node-cron');
async function sendEmail(email) {
    const emailHtml = `
    <html>
    <head>
        <title>Message from Faculty Flow Team</title>
    </head>
    <body>
        <h1>Hello!</h1>
        <p>This is a message from the Faculty Flow.</p>
        <p>A gentle reminder to check whether you have received the funds for your latest leave.</p>
        <p>Thank You!</p>
        
    </body>
    </html>
`;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'flowfaculty00@gmail.com',
          pass: 'svdc ttzf fepc cidt'
        }
      })
      try {
        await transporter.sendMail({
          from: '"Message bot" flowfaculty00@gmail.com', // sender address
          to: email, // list of receivers
          subject: 'Message from ', // Subject line
          text: 'danger', // plain text body
          html: emailHtml // html body
        })
        return new Response.json({ status: 200 })
      } catch (err) {
        console.log(err)
        return new Response.json({ status: 500 })
      }
}
async function sendEmail2(email) {
  const emailHtml = `
  <html>
  <head>
      <title>Message from Faculty Flow Team</title>
  </head>
  <body>
      <h1>Hello!</h1>
      <p>This is a message from the Faculty Flow.</p>
      <p>A gentle reminder to fill the form for Leaves at http://intranet.iiti.ac.in/.</p>
      <p>Thank You!</p>
      
  </body>
  </html>
`;
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'flowfaculty00@gmail.com',
        pass: 'svdc ttzf fepc cidt'
      }
    })
    try {
      await transporter.sendMail({
        from: '"Message bot" flowfaculty00@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Message from ', // Subject line
        text: 'danger', // plain text body
        html: emailHtml // html body
      })
      return new Response.json({ status: 200 })
    } catch (err) {
      console.log(err)
      return new Response.json({ status: 500 })
    }
}



// sendEmail().catch(console.error);
// {const year = deadlineDate.getFullYear();
//   const month = String(deadlineDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const day = String(deadlineDate.getDate()).padStart(2, '0');
//     toast.warn(`The deadline for ${item.name} is within the current week at: ${year}-${month}-${day} `);
//     setDisplayedFundIds(prevIds => [...prevIds, item.fundId]);
// }

export const POST = async (request) => {
  const {  departure,arrival,title,place,type ,userId,email} = await request.json();
  const dateString = arrival;
  const [year, month, date1] = dateString.split("/");
  console.log(email);
  console.log("Year:", year);
  console.log("Month:", month);
  console.log("Date:", date1);
    // Given date string


// Create a new Date object using the given date
const originalDate = new Date(year, month - 1, date1);

// Add 7 days to the original date
const newDate = new Date(originalDate);
newDate.setDate(originalDate.getDate() + 7);

// Format the new date as yyyy/mm/dd
const newYear = newDate.getFullYear();
const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
const newDay = String(newDate.getDate()).padStart(2, "0");

// Construct the new date string
const newDateString = `${newYear}/${newMonth}/${newDay}`;

console.log("Date after 7 days:", newDateString);

  
  console.log(`${year}-${month}-${date1}`);
    cron.schedule(`00 17 ${date1} ${month} *`, () => {
  sendEmail2(email).catch(console.error);

  
}
);
cron.schedule(`00 17 ${newDay} ${newMonth} *`, () => {
  sendEmail(email).catch(console.error);

  
}
);
    console.log('yoyo');
    try {
        await connectToDB();
        const newFund = new Travel({ creator: userId,departure,arrival,title,place,type  });
        console.log('r');
        await newFund.save();
        return new Response(JSON.stringify(newFund), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Fund", { status: 500 });
    }
}