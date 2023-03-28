import fetch from 'node-fetch';
import { mailOptions, transporter } from '../../lib/nodemailer';

export default async function handler(req, res) {
  
  const { body, method } = req;

  // Extract the sendData and captcha code from the request body
  const { sendData, captcha } = body;

  if (method === 'POST') {
    // If sendData or captcha are missing return an error
    if (!sendData || !captcha) {
      return res.status(422).json({
        message: 'Unproccesable request, please provide the required fields',
      });
    }

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
          method: 'POST',
        }
      );
      const captchaValidation = await response.json();

      // Types check
      if (typeof captchaValidation === 'object') {
        if ('success' in captchaValidation) {
          /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
          if (captchaValidation.success) {
            // Replace this with the API that will save the data received
            // to your backend
            // await sleep();
            // Return 200 if everything is successful
            await transporter.sendMail({
              ...mailOptions,
              subject: `Заявка с сайта от ${sendData.name}`,
              text: 'text',
              html: `
        <h1>Заявка с сайта от ${sendData.name}</h1>
        <p>Имя: ${sendData.name}</p>
        <p>Телефон: ${sendData.phone}</p>
        <p>Email: ${sendData.email}</p>
        <p>Дополнительная информация: ${sendData.info}</p>
        `,
            });

            return res.status(200).send('OK');
          }
        }
      }
      return res.status(422).json({
        message: 'Unproccesable request, Invalid captcha code',
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: 'Something went wrong' });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send('Not found');
}
