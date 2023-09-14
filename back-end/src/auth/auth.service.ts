import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import * as speakesasy from "speakeasy";
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }
    private async checkEmailExist(email) {
        return await this.prismaService.user.findUnique({ where: { email } })
    }
    async signup(signupDto: SignupDto) {
        const { email, password, username, passwordConfirm, lastDateConnexion } = signupDto;
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.checkEmailExist(email);
        if (user) throw new ConflictException('User already exits');
        // ** Hasher le mot de passe: Utilisation du package 'bcrypt': npm i bcrypt et npm i -D @types/bcrypt
        if(password !== passwordConfirm) throw new ConflictException('Les 2 mots de passe ne sont pas identiques')
        const hash = await bcrypt.hash(password, 10);
        // ** Enregistrer l'utilisateur dans la base de données
        await this.prismaService.user.create({
            data: { email, username,  password: hash, passwordConfirm:hash, lastDateConnexion: new Date()},
        })
        // ** Envoyer un email de confirmation
        await this.mailerService.sendSignupConfiguration(email, username);
        // ** Retourner une réponse de succès
        return { data: 'User succesfuly created' };
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.checkEmailExist(email);
        // Si pas d'utilisateur
        if (!user) throw new NotFoundException('User not found')
        // ** Comparer le mot passe saisi et celui présent en BDD
        const match = await bcrypt.compare(password, user.password);
        // Si les mots de passe ne correspondent pas
        if (!match) throw new UnauthorizedException('email or password does not match ')
        // ** Retourner un token jwt
        const payload = {
            /* Encodage des élements */
            sub: user.userId,// Par convention jwt, le sub c'est l'id
            email: user.email
        }
        const token = this.jwtService.sign(
            payload,
            {
                expiresIn: '2h', // durée de session du token
                secret: this.configService.get('SECRET_KEY')
            }
        );
        return {
            token,
            user: {
                username: user.username,
                email: user.email ,
                lastDateConnexion: user.lastDateConnexion     
            }
        }
    }

    async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
        const { email } = resetPasswordDemandDto;
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.checkEmailExist(email);
        // Si pas d'utilisateur
        if (!user) throw new NotFoundException('User not found');
        // Génération des codes OTP envoyés à l'utilisateur de manière auto
        const code = speakesasy.totp({
            secret: this.configService.get('OTP_CODE'),
            digits: 5, // code à 5 chiffres
            step: 60 * 15, // durée en seconde (1 équivaut à 1 seconde)
            encoding: 'base32'
        })

        const url = 'http://localhost:300/auth/reset-password-confirmation'; // En mode réel, il faudrait rediriger vers une url front-end
        await this.mailerService.sendResetPassword(email, url, code);
        return { data: 'Reset password mail has been sent' }

    }

    async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        const { email, password, code } = resetPasswordConfirmationDto
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.checkEmailExist(email);
        // Si pas d'utilisateur
        if (!user) throw new NotFoundException('User not found');
        // Permet la vérification des informations fournis
        const match = speakesasy.totp.verify({
            secret: this.configService.get('OTP_CODE'),
            token: code,
            digits: 5, // code à 5 chiffres
            step: 60 * 15, // durée en seconde (1 équivaut à 1 seconde)
            encoding: 'base32'
        })

        if (!match) throw new UnauthorizedException('Invalid/expired token')
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.update({
            where: { email },
            data: { password: hash }
        })

        return { data: 'password updated' }
    }

    async deleteAccount(userId: number, deleteAccountDto: DeleteAccountDto) {
        const { password } = deleteAccountDto;
        const user = await this.prismaService.user.findUnique({where: {userId: userId}});
        // Si pas d'utilisateur
        if (!user) throw new NotFoundException('User not found');
        // ** Comparer le mot passe saisi et celui présent en BDD
        const match = await bcrypt.compare(password, user.password);
        // Si les mots de passe ne correspondent pas
        if (!match) throw new UnauthorizedException('email or password does not match ')
        await this.prismaService.user.delete({ where: { userId } });
        return {data: 'user successfully deleted'}
    }
}
