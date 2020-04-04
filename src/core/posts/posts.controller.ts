import { Controller, Post, Body, Get, Param, UsePipes, Patch } from '@nestjs/common';
import { ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';

import { PostsService } from './posts.service';

import { CreatePostDto } from './dto/create-post.dto';

import { ValidationPipe } from '../../shared/validation.pipe';

@ApiTags('posts')
@Controller('posts')
export class PostsController {

  constructor(
    private postService: PostsService,
  ) {}

  @ApiBody({ type: CreatePostDto })
  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() createPostDto: CreatePostDto) {
    return this.postService.store(createPostDto);
  }

  @Get()
  async index() {
    return this.postService.index();
  }

  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async show(@Param('id') id: string) {
    return this.postService.show(id);
  }

  @Patch(':id/likes')
  async patchLike(@Param('id') id: string) {
    return this.postService.patchLike(id);
  }
}
