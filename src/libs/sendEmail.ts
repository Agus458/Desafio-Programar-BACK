import nodemailer from 'nodemailer';
import { google } from "googleapis";

const sendEmail = async (body: string, to: string, subject: string) => {
    let oAuth2Client = new google.auth.OAuth2(process.env.NODEMAILER_CLIENT_ID, process.env.NODEMAILER_CLIENT_SECRET, process.env.NODEMAILER_REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: process.env.NODEMAILER_REFRESH_TOKEN });

    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'desafio.programar@gmail.com',
                clientId: process.env.NODEMAILER_CLIENT_ID,
                clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
                refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
                accessToken: accessToken
            }
        } as nodemailer.TransportOptions);

        const mailOptions = {
            from: 'Desafio Programar <desafio.programar@gmail.com>',
            to: to,
            subject: subject,
            html: body,
        }

        const result = transport.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error;
    }
}