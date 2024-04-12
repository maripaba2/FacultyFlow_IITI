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


export const POST = async (request) => {
    
    const { department,name,amount,date,  userId} = await request.json();
    
    cron.schedule('* 17 * * *', () => {
  sendEmail().catch(console.error);
});
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

