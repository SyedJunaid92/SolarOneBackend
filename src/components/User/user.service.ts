import {
    Injectable,
    forwardRef,
    Inject,
    Scope,
    UseGuards
  } from '@nestjs/common';
  import { paginationOptions } from 'src/helperfunction/PaginationOption';
  import { userInterface, User } from 'src/Models/user';
  import { AddUserDTO, SignInUserDTO } from './user.dto';
  import * as moment from 'moment'
  var jwt = require('jsonwebtoken'); 
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  @Injectable({ scope: Scope.REQUEST })
export class UserService {

    async addUser(obj: AddUserDTO) {
        try {

            let checkExist = await User.findOne({email:obj.email?.toLowerCase()})
            if(checkExist)
            {
                return {
                    status: 400,
                    message: 'User Email Already Exist',
                    
                  };
            }

            const hash = bcrypt.hashSync(obj.password, saltRounds);
          
            let userToAdd:userInterface = {
                _id: `${obj.email}_${new Date().getTime()}`,
                name: obj.name?.trim() ? obj.name?.trim() : "",
                profile_picture:obj.profile_picture ? obj.profile_picture :  '',
                password:  obj.password ? hash :'',
                email:obj.email ? obj.email?.toLowerCase() : '',
                contact_no:obj.contact_no?.trim() ? obj.contact_no?.trim() : '',
                creation_time: new Date().getTime(),
                creation_date: moment().format('DD-MM-YYYY'),
                status: true
            };
    
           
            let response = await User.create(userToAdd);
    
            if(response){
              console.log(
                'User add success  ',
                userToAdd._id,
                ' ',
                new Date().toString().slice(0, 24),
                
              );
             
              return {
                status: 200,
                message: 'User Added successfully',
                
              };
            }
            else{
             return{
              status:400,
              message: response['message']
             }
            }
            
          }
         catch (err) {
         console.log("Error While Adding User "+ err.message)
          return{status:500, message:err.message}
        }
      }

      async signInUser(obj : SignInUserDTO){

        try{
          const Exist = await User.findOne({email:obj.email?.trim()?.toLowerCase()})

          
          if(!Exist)
          {
            return {
              status: 404,
              message: 'Invalid Email',
              
            };

          }

          const comparePassword = bcrypt.compareSync(obj.password, Exist.password)
          if(!comparePassword)
          {
            return {
              status: 404,
              message: 'Invalid Password',
              
            };
          }

          var token = jwt.sign({ email:Exist.email }, process.env.PRIVATE_KEY , { expiresIn: '1h'});

          return { status : 200, message:"Successfully Login" ,data:{...Exist._doc,token}}

        }
        catch (err) {
          console.log("Error While Adding User "+ err.message)
           return{status:500, message:err.message}
         }

      }


     



}