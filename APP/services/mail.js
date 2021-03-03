const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "172.16.59.111",
  port: 825,
  secure: false, // true for 465, false for other ports
});

module.exports = (email, subject, content) => {
    let info = await transporter.sendMail({
        from: '"No-Reply APP <no_reply@app.co.id>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: content, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });

    console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
