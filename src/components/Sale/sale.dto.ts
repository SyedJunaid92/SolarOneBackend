import {
    IsNotEmpty,
    IsEmail,
    Matches,
    IsString,
    IsOptional,
    IsLowercase,
    IsBoolean,
    IsArray,
    IsNumber,
    isNotEmpty
  } from 'class-validator';

  export class addSaleDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsArray()
    sale_details:string[]

    @IsNotEmpty()
    @IsString()
    customer_name:string

    @IsNotEmpty()
    @IsString()
    customer_id:string

    @IsNotEmpty()
    @IsNumber()
    discount:number

    @IsNotEmpty()
    @IsNumber()
    sub_total:number

    @IsNotEmpty()
    @IsNumber()
    total:number

    @IsOptional()
    @IsString()
    vehicle_number:string

    @IsOptional()
    @IsString()
    details:string

    @IsNotEmpty()
    @IsString()
    payment_method:string

    @IsNotEmpty()
    @IsString()
    customer_type:string


  }

  export class getSalePaginateDTO{
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