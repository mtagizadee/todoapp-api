import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type Receiver = {
    fullName: string;
    email: string;
}

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendConfirmationMail(params: {
        receiver: {
            nickname: string,
            email: string
        },
        content: string,
        template: string
    }) {
        await this.mailerService.sendMail({
            to: params.receiver.email,
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            subject: 'RoadMates!',
            template: params.template,
            context: {
                nickname: params.receiver.nickname,
                content: params.content
            }
        });
    }

    async sendConfirmationCodeMail(receiver: Receiver, code: number) {
        const {email, fullName} = receiver;

        await this.mailerService.sendMail({
            to: email,
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            subject: 'TodoApp confirmation code',
            template: './templates/code-confirmation.hbs',
            context: {
                code,
                fullName: fullName
            }
        });

        return { message: 'Mail was successfully sent!' }
    }
}
