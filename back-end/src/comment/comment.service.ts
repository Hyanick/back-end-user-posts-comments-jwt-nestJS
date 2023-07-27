import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/createCommentDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(createCommentDto: CreateCommentDto, userId: number) {
        const { content, postId } = createCommentDto;
        // ** Vérifier que le post existe
        const post = await this.prismaService.post.findUnique({ where: { postId } });
        console.log(post);
        if (!post) throw new NotFoundException('Post not found');

        const user = await this.prismaService.user.findUnique({ where: { userId } })
        if (!user) throw new UnauthorizedException('Vous n\'êtes pas connecté!');

        await this.prismaService.comment.create({ data: { ...createCommentDto, userId } });

        return { data: `Comment successfully created in post <strong> ${post.title}</strong> by user <strong>${user.username}</strong>` }

    }
}
