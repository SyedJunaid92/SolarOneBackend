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

  export class AddUserDTO{
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
   password:string

   @IsOptional()
   @IsString()
    profile_picture:string
}

export class SignInUserDTO{
  @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
   password:string


}