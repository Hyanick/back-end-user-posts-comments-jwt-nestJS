import { Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(AuthGuard())
    @Post('create')
    create() {
    }
}
