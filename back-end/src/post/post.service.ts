import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPostDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }
    async create(createPostDto: CreatePostDto, userId: number) {
        const { title, body } = createPostDto;
        await this.prismaService.post.create({ data: { body, title, userId } });
        return {data: 'post created'}
    }
}
