import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
        const userId = request.user['userId'];
        return this.commentService.create(createCommentDto, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    delete(
        @Param('id', ParseIntPipe) commentId: number,
        @Req() request: Request,
        @Body('postId') postId: number
    ) {
        const userId: number = request.user['userId'];
        return this.commentService.delete(commentId, userId, postId);

    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    update(
        @Param('id', ParseIntPipe) commentId: number,
        @Req() request: Request,
        @Body() updateCommentDto: CreateCommentDto
    ) {
        const userId = request.user['userId'];
        return this.commentService.update(commentId, userId, updateCommentDto)

    }
}
