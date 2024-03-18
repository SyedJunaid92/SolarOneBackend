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


  import { ProductService } from './product.service';
  import { addProductDTO, deleteProductDTO, editProductDTO, getAllProductDTO, getProductDTO } from './product.dto';
  @Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post('/')
  async add(@Body() obj: addProductDTO, @Response() res, @Request() req) {
    
      const response = await this.productService.addProduct(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  @Put('/update')
  async update(@Body() obj: editProductDTO, @Response() res, @Request() req) {
    
      const response = await this.productService.editProduct(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  @Get('/by-paginate')
  async getAllProductByPaginate(@Query() obj:getProductDTO, @Response() res, @Request() req) {
   
      const response = await this.productService.getAllProductPagination(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  @Get('/')
  async getAllProduct(@Query() obj:getAllProductDTO, @Response() res, @Request() req) {
   
      const response = await this.productService.getAllProduct(obj);
      return res.status(response.status).json({
        ...response
      });
    
  }

  @Delete('/delete')
  async deleteProduct(@Query() obj:deleteProductDTO, @Response() res, @Request() req) {
   
      const response = await this.productService.deleteProduct(obj);
      return res.status(HttpStatus.OK).json({
        ...response
      });
    
  }

  
 

}
