import {
    Injectable,
    forwardRef,
    Inject,
    Scope,
    UseGuards
  } from '@nestjs/common';
  import { paginationOptions } from '../../helperFunction/PaginationOption';
  import { Sale, salesInterface } from '../../Models/sales';
  import { addSaleDTO, getSalePaginateDTO} from './sale.dto';
  import * as moment from 'moment'

  
  @Injectable({ scope: Scope.REQUEST })
  export class SaleService {
  
    async addSale(obj: addSaleDTO) {
      try {
        let sale_id = ""

        while(sale_id == "")
        {
            sale_id = this.generateRandomCode()
            let checkExist = await Sale.findOne({ sale_id })
            if(checkExist)
            {
                sale_id = ""
            }

        }

  
  
        let saleToAdd: salesInterface = {
            _id: `${sale_id}_${new Date().getTime()}`,
            sale_id:sale_id ? sale_id : '',
            sale_details:obj.sale_details ? obj.sale_details : [],
            customer_name:obj.customer_name ? obj.customer_name : '',
            customer_id: obj.customer_id ? obj.customer_id :'',
            discount:obj.discount ? obj.discount : 0,
            sub_total: obj.sub_total ? obj.sub_total :0,
            total:obj.total ? obj.total : 0,
            vehicle_number: obj.vehicle_number? obj.vehicle_number?.trim() :'',
            details:obj.details ? obj.details?.trim() : '',
            payment_method:obj.payment_method ? obj.payment_method : '',
            creation_time: new Date().getTime(),
            creation_date: moment().format('DD-MM-YYYY'),
            created_by:obj.email ? obj.email?.trim()?.toLowerCase() : '',
            status: true,
            customer_type:obj.customer_type ? obj.customer_type : ''
        };
  
  
        let response = await Sale.create(saleToAdd);
  
        if (response) {
          console.log(
            'Sale add success  ',
            saleToAdd._id,
            ' ',
            new Date().toString().slice(0, 24),
  
          );
  
          return {
            status: 200,
            message: 'Sale Added successfully',
  
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
        console.log("Error While Adding Sale " + err.message)
        return { status: 500, message: err.message }
      }
    }
  
  
    
  
    async getAllSalePagination(obj: getSalePaginateDTO) {
      try {
        let query = Sale.aggregate();
  
        let options = paginationOptions(
          obj.page_number,
          obj.page_size,
          'creation_time',
          'desc',
        );
  
        query = Sale.aggregate([{ $match: {} }]);
  
  
        let allItems = await Sale.aggregatePaginate(query, options.options);
  
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
        console.log("Error While getting Sale " + err.message)
        return { status: 500, message: err.message }
      }
    }



     generateRandomCode() {
  
        const characters = '0123456789';
      
        let code = '';
      
        
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
      
        return code;
      }
  
    
  
  
  }