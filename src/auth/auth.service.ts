import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }
    signup(signupDto: SignupDto) {
        // ** Vérifier si l'utilisateur est déjà inscrit
        // ** Hasher le mot de passe
        // ** Enregistrer l'utilisateur dans la base de données
        // ** Envoyer un email de confirmation
        // ** Retourner une réponse de succès
        throw new Error('Method not implemented.');
    }
}
