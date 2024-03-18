import {
    Body,
    Controller,
    Post,
    Response,
    Request,
    HttpStatus,
    Get,
    UseGuards,
    Query,
    Param,
    Put,
    Delete
  } from '@nestjs/common';
import { SaleService } from './sale.service';
import { addSaleDTO, getSalePaginateDTO } from './sale.dto';



  @Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}


  @Post('/')
  async add(@Body() obj: addSaleDTO, @Response() res, @Request() req) {
    
      const response = await this.saleService.addSale(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

 

  @Get('/by-paginate')
  async getAllSaleByPaginate(@Query() obj:getSalePaginateDTO, @Response() res, @Request() req) {
   
      const response = await this.saleService.getAllSalePagination(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  

 

  
 

}
