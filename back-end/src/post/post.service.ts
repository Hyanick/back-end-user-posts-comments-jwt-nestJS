import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/createPostDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeletePostDto } from './dto/deletePostDto';
import { UpdatePostDto } from './dto/updatePostDto';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getAll() {
        const posts = await this.prismaService.post.findMany({
            include: { // ** Permet d'inclure les autres objets
                // ** user: true ---> ici, il va inclure tout l'objet user avec toutes ses propriétés (username, email, password, etc...),
                user: {
                    select: { // ** select permet de spécifier les proprietés qu'on souhaite afficher
                        username: true,
                        email: true,
                        password: false

                    }
                },
                // ** comments: true
                comments: {
                    include: { // ** Permet d'inclure les autres objets 
                        user: {
                            select: { // ** select permet de spécifier les proprietés qu'on souhaite afficher
                                username: true,
                                email: true,
                                password: false
                            }
                        }

                    }
                },
            }
        });
        return posts;
    }
    async create(createPostDto: CreatePostDto, userId: number) {
        const { title, body } = createPostDto;
        await this.prismaService.post.create({ data: { ...createPostDto, userId } });
        return { data: `post ${title} created `}
    }

    async delete(postId: number, userId: number) {
        // ** Vérifier que la publication existe
        const post = await this.prismaService.post.findUnique({ where: { postId } });
        if (!post) throw new NotFoundException('Post not found');

        // ** Vérifier l'identité de celui qui essaie de supprimer le post
        if (post.userId !== userId) throw new ForbiddenException('Forbidden action: Vous n\'êtes pas l\'auteur du post')

        await this.prismaService.post.delete({ where: { postId } });
        return { data: 'post successfully deleted' }
    }

    async update(updatePostDto: UpdatePostDto, postId: number, userId: number) {
        // ** Vérifier que la publication existe
        const post = await this.prismaService.post.findUnique({ where: { postId } }); 
        if (!post) throw new NotFoundException('Post not found');
        /*
                // ** Vérifier que le user est connecté
                const user = await this.prismaService.*/

        // ** Vérifier l'identité de celui qui essaie de supprimer le post
        if (post.userId !== userId) throw new ForbiddenException('Forbidden action: Vous n\'êtes pas l\'auteur du post')

        await this.prismaService.post.update({ where: { postId }, data: { ...updatePostDto } });
        return { data: 'post successfully updated' }
    }
}
