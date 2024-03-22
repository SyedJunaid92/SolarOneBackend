import {
    Injectable,
    forwardRef,
    Inject,
    Scope,
    UseGuards
} from '@nestjs/common';
import { paginationOptions } from '../../helperFunction/PaginationOption';
import { Inventory,InventoryInterface } from '../../Models/inventory';
import  moment  from 'moment'
import { AddInventoryDTO, getAllInventorytDTO, getInventorytDTO, updateInventoryQuantitytDTO } from './inventory.dto';


@Injectable({ scope: Scope.REQUEST })
export class InventoryService {

    
    async addInventory(obj: AddInventoryDTO) {
        try {
            const exist = await Inventory.findOne({product_code:obj.product_code?.trim(),product_of_id:obj.product_of_id})
            if(exist)
            {
                return {status :400, message:"Inventory Product Already Exist"}
            }
            

            let inventoryToAdd: InventoryInterface = {
                _id: `${new Date().getTime()}`,
                product_name:obj.product_name?.trim() ? obj.product_name?.trim() :'',
                product_code:obj.product_code?.trim() ? obj.product_code?.trim() :  '',
                creation_time: new Date().getTime(),
                creation_date: moment().format('DD-MM-YYYY'),
                status: true,
                created_by: obj.email?.trim() ? obj.email?.trim()?.toLowerCase() : "",
                product_picture:obj.product_picture ? obj.product_picture : '',
                product_of_name: obj.product_of_name?.trim() ? obj.product_of_name : '',
                product_of_id: obj.product_of_id ? obj.product_of_id : '',
                quantity: obj.quantity ? obj.quantity : 0
            };


            let response = await Inventory.create(inventoryToAdd);

            if (response) {
                console.log(
                    'Inventory add success  ',
                    inventoryToAdd._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Inventory Added successfully',

                };
            }
            else {
                return {
                    status: 400,
                    message: response['message']
                }
            }

        }
        catch (err) {
            console.log("Error While Adding Inventory " + err.message)
            return { status: 500, message: err.message }
        }
    }

    async getAllInventoryPagination(obj: getInventorytDTO) {
        try {
            let query = Inventory.aggregate();

            let options = paginationOptions(
                obj.page_number,
                obj.page_size,
                'creation_time',
                'desc',
            );

            query = Inventory.aggregate([{ $match: {} }]);


            let allItems = await Inventory.aggregatePaginate(query, options.options);

            if (allItems.docs.length > 0) {
                return {
                    status: 200,
                    totalRecords: allItems.totalDocs,
                    data: allItems.docs,
                    totalPages: allItems.totalPages,
                };
            } else {
                return {
                    status: 404,
                    totalRecords: 0,
                    data: [],
                    totalPages: 0,
                    message: 'Record Not Found',
                };
            }


        }
        catch (err) {
            console.log("Error While getting Inventory " + err.message)
            return { status: 500, message: err.message }
        }
    }
    async getAllInventory(obj: getAllInventorytDTO) {
        try {
            let allItems = await Inventory.find({});

            if (allItems.length > 0) {
                return {
                    status: 200,
                    data: allItems,
                   
                };
            } else {
                return {
                    status: 404,
                    totalRecords: 0,
                    data: [],
                    totalPages: 0,
                    message: 'Record Not Found',
                };
            }


        }
        catch (err) {
            console.log("Error While getting Customer " + err.message)
            return { status: 500, message: err.message }
        }
    }

    async updateInventoryQuantity(obj: updateInventoryQuantitytDTO) {
        try {
            let find = await Inventory.findOne({_id:obj._id})

            let updatedQuantity = +find.quantity + +obj.quantity

            let response = await Inventory.findByIdAndUpdate({ _id: obj._id }, {quantity:updatedQuantity});

            if (response) {
                console.log(
                    'Inventory Quantity update success  ',
                    obj._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Inventory Quantity Update successfully',

                };
            }
            else {
                return {
                    status: 400,
                    message: response['message']
                }
            }

        }
        catch (err) {
            console.log("Error While Updating Inventory " + err.message)
            return { status: 500, message: err.message }
        }
    }


}