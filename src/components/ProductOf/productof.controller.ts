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
import { ProductOfService } from './productOf.service';
import { AddProductOfDTO, EditProductOfDTO, deleteProductOfDTO, getAllProductOfDTO, getProductOfDTO } from './productOf.dto';
import { getAllProductDTO, getProductDTO } from '../Product/product.dto';



@Controller('productof')
export class ProductOfController {
    constructor(private readonly productOfService: ProductOfService) { }

    @Post('/')
    async add(@Body() obj: AddProductOfDTO, @Response() res, @Request() req) {
        const response = await this.productOfService.addProductOf(obj);
        return res.status(response.status).json({
            ...response
        });

    }

    @Get('/by-paginate')
    async getAllCustomerByPaginate(@Query() obj:getProductDTO, @Response() res, @Request() req) {
     
        const response = await this.productOfService.getAllProductOfPagination(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Get('/')
    async getAllProductOf(@Query() obj:getAllProductDTO, @Response() res, @Request() req) {
     
        const response = await this.productOfService.getAllProductOf(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Put('/update')
    async update(@Body() obj: EditProductOfDTO, @Response() res, @Request() req) {
      
        const response = await this.productOfService.updateProductOf(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Delete('/delete')
    async deleteProductOf(@Query() obj:deleteProductOfDTO, @Response() res, @Request() req) {
     
        const response = await this.productOfService.deleteProductOf(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }




}

