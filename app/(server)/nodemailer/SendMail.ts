import axios from "axios";
const nodemailer = require("nodemailer");

// הגדרת תצורת SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail", // ניתן לשנות לכל שירות SMTP אחר (SendGrid, Mailgun וכדומה)
  auth: {
    user:" nmambition2022@gmail.com", // המייל שלך
    pass: 'pqbv rbiv dqie rtss', // הסיסמה שלך
  },
});
interface PageDetails {
  BrideName: string;
  GroomName: string;
  Title: string;
  Location: string;
  Year: number;
  Month: number;
  Day: number;
  Hour: number;
  Minute: number;
  Description?: string;
  img?: string;
}

// פונקציה לשליחת מייל אישור הרשמה
const sendRegistrationSuccessEmail = async (GuestsEmail: any) => {
  
  axios
    .get(`https://rsv-ps.vercel.app/api/DitelsOfThePage`)
    .then((res) => {
      let detels = res.data.data;
      console.log(detels);

      const mailOptions = {
        from: "nmambition2022@gmail.com",
        to: GuestsEmail,
        subject: "אישור הגעתך לחתונה",
        html: `<!DOCTYPE html>
    <html lang="he">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>אישור הגעה לחתונה</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                padding: 20px 0;
            }
    
            .header img {
                max-width: 100px;
                border-radius: 50%;
            }
    
            .header h1 {
                font-size: 24px;
                margin: 10px 0;
                color: #333;
            }
    
            .content {
                text-align: center;
                padding: 20px;
            }
    
            .content h2 {
                font-size: 20px;
                color: #666;
            }
    
            .content p {
                font-size: 16px;
                color: #555;
                line-height: 1.5;
            }
    
            .details {
                background-color: #f7f7f7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            }
    
            .details p {
                margin: 10px 0;
                font-size: 16px;
                color: #333;
            }
    
            .footer {
                text-align: center;
                padding: 20px;
                color: #999;
                font-size: 14px;
            }
    
            .footer p {
                margin: 5px 0;
            }
    
            .footer a {
                color: #0066cc;
                text-decoration: none;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1>אישור הגעה לחתונה </h1>
                <h1>${detels.GroomName} & ${detels.BrideName}</h1>

            </div>
            <div class="content">
                <h2>שלום רב</h2>
                <p>${detels.Description}</p>
                <div class="details">
                    <p><strong> תאריך החתונה:</strong> ${detels.Day}/${detels.Month}/${detels.Year}</p>
                    <p><strong>שעת החופה:</strong> ${detels.Hour}:${detels.Minute}</p>
                    <p><strong>מיקום:</strong> ${detels.Location}</p>
                </div>
                <p>נשמח לראותך בין אורחינו באירוע.</p>
            </div>
            <div class="footer">
                <p>לפרטים נוספים ולשאלות, אל תהססו לפנות אלינו.</p>
                <p><a href="tel:+0585202271">התקשרו אלינו</a> | <a href="nmambition2022@gmail.com">שלחו לנו מייל</a></p>
            </div>
        </div>
    </body>
    
    </html>
    `,
      };

      transporter.sendMail(
        mailOptions,
        (error: any, info: { response: string }) => {
          if (error) {
            return console.log(error);
          }
          console.log("Email sent: " + info.response);
        }
      );
      console.log();
    })
    .catch((error) => {
      console.error("Error fetching API data:", error.message);
    });
};
export default sendRegistrationSuccessEmail;
