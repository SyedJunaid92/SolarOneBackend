import {
    Injectable,
    forwardRef,
    Inject,
    Scope,
    UseGuards
} from '@nestjs/common';
import { paginationOptions } from 'src/helperfunction/PaginationOption';
import { customerInterface, Customer } from 'src/Models/customers';
import { AddCustomerDTO, EditCustomerDTO, deleteCustomerDTO, getAllCustomertDTO, getCustomertDTO } from './customer.dto';
import * as moment from 'moment'


@Injectable({ scope: Scope.REQUEST })
export class CustomerService {

    async addCustomer(obj: AddCustomerDTO) {
        try {
            if (obj.cnic) {

                let checkExist = await Customer.findOne({ cnic: obj.cnic?.trim() })
                if (checkExist) {
                    return {
                        status: 400,
                        message: 'User Email Already Exist',

                    };
                }
            }



            let customerToAdd: customerInterface = {
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


            let response = await Customer.create(customerToAdd);

            if (response) {
                console.log(
                    'Customer add success  ',
                    customerToAdd._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Customer Added successfully',

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
            console.log("Error While Adding Customer " + err.message)
            return { status: 500, message: err.message }
        }
    }

    async getAllCustomerPagination(obj: getCustomertDTO) {
        try {
            let query = Customer.aggregate();

            let options = paginationOptions(
                obj.page_number,
                obj.page_size,
                'creation_time',
                'desc',
            );

            query = Customer.aggregate([{ $match: {} }]);


            let allItems = await Customer.aggregatePaginate(query, options.options);

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
            console.log("Error While getting Customer " + err.message)
            return { status: 500, message: err.message }
        }
    }
    async getAllCustomer(obj: getAllCustomertDTO) {
        try {
            let allItems = await Customer.find({});

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

    async updateCustomer(obj: EditCustomerDTO) {
        try {




            let customerToUpdate = {

                name: obj.name ? obj.name?.trim() : '',
                profile_picture: obj.profile_picture ? obj.profile_picture : '',
                cnic: obj.cnic ? obj.cnic?.trim() : '',
                contact_no: obj.contact_no ? obj.contact_no?.trim() : '',
                status: true,

            };


            let response = await Customer.findByIdAndUpdate({ _id: obj._id }, customerToUpdate);

            if (response) {
                console.log(
                    'Customer update success  ',
                    obj._id,
                    ' ',
                    new Date().toString().slice(0, 24),

                );

                return {
                    status: 200,
                    message: 'Customer Update successfully',

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
            console.log("Error While Updating Customer " + err.message)
            return { status: 500, message: err.message }
        }
    }


    async deleteCustomer(obj: deleteCustomerDTO) {
        try {
            await Customer.findOneAndDelete({ _id: obj._id })



            return { status: 200, message: "Customer Successfully Deleted" }

        } catch (err) {
            console.log("Error While Deleting Customer " + err.message)
            return { status: 500, message: err.message }

        }
    }






}