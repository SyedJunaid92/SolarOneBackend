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


  export class addProductDTO{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    name:string


    @IsNotEmpty()
    @IsString()
    code:string

    @IsNotEmpty()
    @IsString()
    company_name:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsString()
    price:string

    @IsNotEmpty()
    @IsString()
    cost:string

    @IsOptional()
    @IsString()
    alert:string

    @IsNotEmpty()
    @IsString()
    picture:string

    @IsNotEmpty()
    @IsString()
    watt:string





  }

  export class getProductDTO{
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

  export class getAllProductDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string


   

  }

  export class deleteProductDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string


    @IsNotEmpty()
    @IsString()
    id:string

   

  }

  export class editProductDTO{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    name:string

    
    @IsNotEmpty()
    @IsString()
    _id:string


    @IsNotEmpty()
    @IsString()
    code:string

    @IsNotEmpty()
    @IsString()
    company_name:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsString()
    price:string

    @IsNotEmpty()
    @IsString()
    cost:string

    @IsOptional()
    @IsString()
    alert:string

    @IsNotEmpty()
    @IsString()
    picture:string

    
    @IsNotEmpty()
    @IsString()
    watt:string



  }