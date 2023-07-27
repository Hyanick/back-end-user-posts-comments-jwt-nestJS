import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/createPostDto';
import { Request } from 'express';
import { DeletePostDto } from './dto/deletePostDto';
import { UpdatePostDto } from './dto/updatePostDto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    getAll() {
        return this.postService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(
        @Body() createPostDto: CreatePostDto,
        @Req() request: Request // Pour récupérer le user connecté
    ) {
        const userId = request.user['userId']; // ** userId du user connecté
        return this.postService.create(createPostDto, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id') // ** /:id permet d'avoir un id dynamique
    delete(
        // @Body() deletePostDto: DeletePostDto,
        @Param('id', ParseIntPipe) postId: number, // ** @Param permet de récupérer les données depuis les parmètres de l'URL/ ParseIntPipe converti en INT
        @Req() request: Request
    ) {
        const userId = request.user['userId'];
        // return this.postService.delete(deletePostDto, userId);
        return this.postService.delete(postId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id') // ** /:id permet d'avoir un id dynamique
    update(
        @Body() updatePostDto: UpdatePostDto,
        @Param('id', ParseIntPipe) postId: number, // ** @Param permet de récupérer les données depuis les parmètres de l'URL/ ParseIntPipe converti en INT
        @Req() request: Request
    ) {
        const userId = request.user['userId'];
        // return this.postService.delete(deletePostDto, userId);
        return this.postService.update(updatePostDto, postId, userId);
    }
}
