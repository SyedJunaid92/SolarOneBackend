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
import { CustomerService } from './customer.service';
import { AddCustomerDTO, EditCustomerDTO, deleteCustomerDTO, getAllCustomertDTO, getCustomertDTO } from './customer.dto';


@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post('/')
    async add(@Body() obj: AddCustomerDTO, @Response() res, @Request() req) {
        const response = await this.customerService.addCustomer(obj);
        return res.status(response.status).json({
            ...response
        });

    }

    @Get('/by-paginate')
    async getAllCustomerByPaginate(@Query() obj:getCustomertDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.getAllCustomerPagination(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Get('/')
    async getAllCustomer(@Query() obj:getAllCustomertDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.getAllCustomer(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Put('/update')
    async update(@Body() obj: EditCustomerDTO, @Response() res, @Request() req) {
      
        const response = await this.customerService.updateCustomer(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Delete('/delete')
    async deleteCustomer(@Query() obj:deleteCustomerDTO, @Response() res, @Request() req) {
     
        const response = await this.customerService.deleteCustomer(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }




}

