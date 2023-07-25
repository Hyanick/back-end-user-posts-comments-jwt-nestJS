import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signupDto';
import { MailerService } from 'src/mailer/mailer.service';
import { SigninDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist';

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
        const { email, password, username } = signupDto;
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.checkEmailExist(email);
        if (user) throw new ConflictException('User already exits');
        // ** Hasher le mot de passe: Utilisation du package 'bcrypt': npm i bcrypt et npm i -D @types/bcrypt
        const hash = await bcrypt.hash(password, 10);
        // ** Enregistrer l'utilisateur dans la base de données
        await this.prismaService.user.create({
            data: { email, username, password: hash },
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
                email: user.email
            }
        }
    }
}
