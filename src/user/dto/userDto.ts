import { Roles } from "./create-user.dto";

export class UserDto {
    constructor(public Name, public Email, public DoB, public Role){
        this.Name = Name;
        this.Email = Email;
        this.DoB = DoB;
        this.Role = Role;
    }
}