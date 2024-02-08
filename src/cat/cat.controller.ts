import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Redirect, Res } from '@nestjs/common';

@Controller('cat')
export class CatController {
  @Get('see')
  find(@Res() response) {
    response.status(201).send('this action return all cats')
    // return 'this action returns all cats'
  }
  @Post('see')
  create(): string {
    return 'add a new cat'
  }
  @Get('a*')
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  // @Redirect('http://127.0.0.1:3000/cat/see', 301)
  findAll(): string {
    return 'aaaaa'
  }

  @Get(':id')
  findone(@Param() params: any): string {
    return `return a ${params.id} cat`
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  createone(@Body() body) {
    return body
  }

}
