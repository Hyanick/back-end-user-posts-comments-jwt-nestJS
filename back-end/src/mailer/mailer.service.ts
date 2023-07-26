import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"

@Injectable()
export class MailerService {

    /**
     * Méthode de configuration du transporteur
     */
    private async transporter() {
        // Création compte de test
        const testAccount = await nodemailer.createTestAccount()
        //Configuration du smtp
        const transport = nodemailer.createTransport({
            host: "localhost",
            port: 1025,
            ignoreTLS: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        return transport;
    }

    /**
     * ToDo 
     * @param userEmail 
     */
    private async sendMail(userEmail: string) {

    }

    async sendSignupConfiguration(userEmail: string, userName: string) {
        (await this.transporter()).sendMail({
            from: 'app@localhost.com',
            to: userEmail,
            subject: 'Inscription', // Optionel
            html: `
                    <h3>Confirmation of Inscription</h3> </br>
                    <p>The user <strong>${userName}</strong> succesfuly created</p>
                    `
        })
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        (await this.transporter()).sendMail({
            from: 'app@localhost.com',
            to: userEmail,
            subject: 'Reset password', // Optionel
            html: `
                    <a href="${url}">Reset password</a>
                    <p>Secret code <strong>${code}</strong></p>
                    <p>Code will expire in <strong> 15 minutes</strong></p>
                    `
        });

    }

}
