import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('/mandates')
  // reg(@Body() reg_data): string {
  //   console.log(reg_data);
  //   return this.appService.getHello();
  // }

  @Get('/q')
  all_params(@Query() query_data): string {
    console.log(query_data);
    return this.appService.getHello();
  }
}
