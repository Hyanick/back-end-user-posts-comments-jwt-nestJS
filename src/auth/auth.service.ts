import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signupDto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }
    async signup(signupDto: SignupDto) {
        const { email, password, username } = signupDto;
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.prismaService.user.findUnique({ where: { email } })
        if (user) throw new ConflictException('User already exits');
        // ** Hasher le mot de passe: Utilisation du package 'bcrypt': npm i bcrypt et npm i -D @types/bcrypt
        const hash = await bcrypt.hash(password, 10);
        // ** Enregistrer l'utilisateur dans la base de données
        await this.prismaService.user.create({
            data: { email, username, password: hash },
        })
        // ** Envoyer un email de confirmation
        // ** Retourner une réponse de succès
        return { data: 'User succesfuly created' };
    }
}
