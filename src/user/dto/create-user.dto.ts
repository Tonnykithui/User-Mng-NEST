export enum Roles{
    Admin = "Admin",
    User = "User"
}

export class CreateUserDto {
    Name:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
    DoB:Date;
    Role:Roles[];
}
