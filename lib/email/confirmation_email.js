import nodemailer from 'nodemailer';

export function sendConfirmationEmail(receiver = '', verificationLink = '') {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Chotha Mail Service <noreply.${process.env.GMAIL_ID}>`,
      to: receiver,
      subject: 'Confirm your email',
      html: `
      <div style="height: 100vh;">
        <div
          style="
            width: 400px;
            height: auto;
            padding: 1rem;
            background-color: rgb(47, 50, 55);
            border-radius: 16px;
            color: white;
          "
        >
          <div
            style="
              font-size: 32px;
              font-weight: 600;
              text-align: center;
            "
          >
            <a
              style="color: white; text-decoration: none"
              href="https://chotha.vercel.app"
            >
              Chotha
            </a>
          </div>
          <p style="font-size: 20px; text-align: center">
            Almost done 😀<br />
            Please click this link to verify your email. Link will expire in 3 minutes so hurry up!!
            <a style="color: rgb(158, 158, 255)" href="${verificationLink}"
              >${verificationLink}</a
            >
          </p>
        </div>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject({ message: 'Failed to send email', err });
      } else {
        resolve({ message: 'Mail sent successfully!', info });
      }
    });
  });
}
