import nodemailer from 'nodemailer';

// The initial configuration of NODEMAMARER
export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.LOGIN,
    pass: process.env.PASS,
  },
});

export const mailOptions = {
  from: process.env.LOGIN,
  to: process.env.LOGIN,
};
