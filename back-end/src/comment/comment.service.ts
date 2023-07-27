import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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


  async delete(commentId: number, userId: number, postId: number) {
    // ** Vérifier que le comment existe
    const comment = await this.prismaService.comment.findUnique({ where: { commentId } });
    if (!comment) throw new NotFoundException('comment not found');

    // ** Vérifier si le comment appartient à un post
    if (comment.postId !== postId) throw new UnauthorizedException('Post id does not match');

    // ** vérifier que c'est le user qui a créé le comment qui l'efface
    if (comment.userId !== userId) throw new ForbiddenException('Fobidden action: Vous n\êtes l\'auteur de ce commentaire')


    await this.prismaService.comment.delete({ where: { commentId } });

    return { data: `Comment was deleted successfully by ${userId}` }

  }
}
