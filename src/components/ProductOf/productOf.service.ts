import {
  Injectable,
  forwardRef,
  Inject,
  Scope,
  UseGuards
} from '@nestjs/common';
import { paginationOptions } from '../../helperFunction/PaginationOption';
import { productOfInterface,ProductOf } from '../../Models/productof';
import  moment from 'moment'
import { AddProductOfDTO, EditProductOfDTO, deleteProductOfDTO, getAllProductOfDTO, getProductOfDTO } from './productOf.dto';


@Injectable({ scope: Scope.REQUEST })
export class ProductOfService {

  async addProductOf(obj: AddProductOfDTO) {
      try {
          if (obj.cnic) {

              let checkExist = await ProductOf.findOne({ cnic: obj.cnic?.trim() })
              if (checkExist) {
                  return {
                      status: 400,
                      message: 'User Email Already Exist',

                  };
              }
          }



          let productOfToAdd: productOfInterface = {
              _id: `${new Date().getTime()}`,
              name: obj.name ? obj.name?.trim() : '',
              profile_picture: obj.profile_picture ? obj.profile_picture : '',
              cnic: obj.cnic ? obj.cnic?.trim() : '',
              contact_no: obj.contact_no ? obj.contact_no?.trim() : '',
              creation_time: new Date().getTime(),
              creation_date: moment().format('DD-MM-YYYY'),
              status: true,
              created_by: obj.email ? obj.email?.trim()?.toLowerCase() : ""
          };


          let response = await ProductOf.create(productOfToAdd);

          if (response) {
              console.log(
                  'productOf  add success  ',
                  productOfToAdd._id,
                  ' ',
                  new Date().toString().slice(0, 24),

              );

              return {
                  status: 200,
                  message: 'productOf Added successfully',

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
          console.log("Error While Adding productOf " + err.message)
          return { status: 500, message: err.message }
      }
  }

  async getAllProductOfPagination(obj: getProductOfDTO) {
      try {
          let query = ProductOf.aggregate();

          let options = paginationOptions(
              obj.page_number,
              obj.page_size,
              'creation_time',
              'desc',
          );

          query = ProductOf.aggregate([{ $match: {} }]);


          let allItems = await ProductOf.aggregatePaginate(query, options.options);

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
          console.log("Error While getting ProductOf " + err.message)
          return { status: 500, message: err.message }
      }
  }
  async getAllProductOf(obj: getAllProductOfDTO) {
      try {
          let allItems = await ProductOf.find({});

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
          console.log("Error While getting ProductOf " + err.message)
          return { status: 500, message: err.message }
      }
  }

  async updateProductOf(obj: EditProductOfDTO) {
      try {




          let productOfToUpdate = {

              name: obj.name ? obj.name?.trim() : '',
              profile_picture: obj.profile_picture ? obj.profile_picture : '',
              cnic: obj.cnic ? obj.cnic?.trim() : '',
              contact_no: obj.contact_no ? obj.contact_no?.trim() : '',
              status: true,

          };


          let response = await ProductOf.findByIdAndUpdate({ _id: obj._id }, productOfToUpdate);

          if (response) {
              console.log(
                  'Product Of update success  ',
                  obj._id,
                  ' ',
                  new Date().toString().slice(0, 24),

              );

              return {
                  status: 200,
                  message: 'ProductOf Update successfully',

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
          console.log("Error While Updating Product Of " + err.message)
          return { status: 500, message: err.message }
      }
  }


  async deleteProductOf(obj: deleteProductOfDTO) {
      try {
          await ProductOf.findOneAndDelete({ _id: obj._id })



          return { status: 200, message: "Product Of Successfully Deleted" }

      } catch (err) {
          console.log("Error While Deleting Product Of " + err.message)
          return { status: 500, message: err.message }

      }
  }






}