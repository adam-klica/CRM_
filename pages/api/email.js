const mail = require("@sendgrid/mail");
import excuteQuery from "../../lib/db";

mail.setApiKey(process.env.SENGRID_API_KEY);

export default async (req, res) => {
  try {
    const user = await excuteQuery({
      query: "SELECT * FROM users WHERE email=?",
      values: [req.body.email],
    });

    const message = `
    Hello there,

    Link for password reset is: http://localhost:3000/reset-password/${user[0].id}
  `;

    const data = {
      to: req.body.email,
      from: "adamklica2@gmail.com",
      subject: "Passwrod Reset",
      text: message,
    };
    mail.send(data);
  } catch (err) {
    console.log(err);
  }
};
