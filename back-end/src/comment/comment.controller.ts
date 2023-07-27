import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/createCommentDto';
import { Request } from 'express';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
        const userId = request.user['userId'];
       return  this.commentService.create(createCommentDto, userId);

    }
}
