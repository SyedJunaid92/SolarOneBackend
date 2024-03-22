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
import { InventoryService } from './inventory.service';
import { AddInventoryDTO, getAllInventorytDTO, getInventorytDTO, updateInventoryQuantitytDTO } from './inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }


    @Post('/')
    async add(@Body() obj: AddInventoryDTO, @Response() res, @Request() req) {
        const response = await this.inventoryService.addInventory(obj);
        return res.status(response.status).json({
            ...response
        });

    }

    @Get('/by-paginate')
    async getAllInventoryByPaginate(@Query() obj:getInventorytDTO, @Response() res, @Request() req) {
     
        const response = await this.inventoryService.getAllInventoryPagination(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Get('/')
    async getAllInventory(@Query() obj:getAllInventorytDTO, @Response() res, @Request() req) {
     
        const response = await this.inventoryService.getAllInventory(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }

    @Put('/update-quantity')
    async update(@Body() obj: updateInventoryQuantitytDTO, @Response() res, @Request() req) {
      
        const response = await this.inventoryService.updateInventoryQuantity(obj);
        return res.status(response.status).json({
          ...response
        });
      
    }



}