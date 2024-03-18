import {
    IsNotEmpty,
    IsEmail,
    Matches,
    IsString,
    IsOptional,
    IsLowercase,
    IsBoolean,
    IsArray,
    IsNumber
  } from 'class-validator';

  export class AddCustomerDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    contact_no:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
   cnic:string

   @IsOptional()
   @IsString()
    profile_picture:string
}

export class getCustomertDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string


  @IsNotEmpty()
  @IsString()
  page_size:string

  @IsNotEmpty()
  @IsString()
  page_number:string

}

export class getAllCustomertDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string



}

export class EditCustomerDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string

  @IsNotEmpty()
  @IsString()
  _id:string

  @IsOptional()
  @IsString()
  contact_no:string

  @IsNotEmpty()
  @IsString()
  name:string

  @IsNotEmpty()
  @IsString()
 cnic:string

 @IsOptional()
 @IsString()
  profile_picture:string
}


export class deleteCustomerDTO{
  @IsNotEmpty()
  @IsEmail()
  email:string


  @IsNotEmpty()
  @IsString()
  _id:string

 

}


