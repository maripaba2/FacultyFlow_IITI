import Entry from "@models/entry";
import { connectToDB } from "@utils/database";
const nodemailer = require('nodemailer');
const cron = require('node-cron');
async function sendEmail() {
    const emailHtml = `
    <html>
    <head>
        <title>Message from Message Bot</title>
    </head>
    <body>
        <h1>Hello!</h1>
        <p>This is a message from the Message Bot.</p>
        <p>Here is some more information:</p>
        <ul>
            <li><strong>Department:</strong> k</li>
            <li><strong>Name:</strong> l</li>
            <li><strong>Amount:</strong> a</li>
            <li><strong>Date:</strong> m</li>
        </ul>
        <p>Thank you!</p>
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
          to: 'akankshaprasad184@gmail.com', // list of receivers
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
  const { department,name,amount,date,  userId} = await request.json();
  const dateString = date;
  const [year, month, date1] = dateString.split("/");
  
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
  sendEmail().catch(console.error);

  
}
);
cron.schedule(`00 17 ${newDay} ${newMonth} *`, () => {
  sendEmail().catch(console.error);

  
}
);
    console.log('yoyo');
    try {
        await connectToDB();
        const newFund = new Entry({ creator: userId,department,name,amount,date  });
        console.log('r');
        await newFund.save();
        return new Response(JSON.stringify(newFund), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Fund", { status: 500 });
    }
}

