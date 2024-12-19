import { Page } from "@playwright/test";
import * as users from "../data/userInfo.json"
export class LoginPage{
    page: Page;
    constructor(page: Page){
        this.page = page;
    }
    async loginWithStandardUser(){
        let usernameField = this.page.getByRole('textbox',{name: 'Username'});
        await usernameField.fill(users.standard_user.username);
        let passowrdField = this.page.getByRole('textbox',{name: 'Password'});
        await passowrdField.fill(users.standard_user.password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
    // async loginWith(){
    //     this.page.getByRole('textbox',{name: 'Username'}).fill(users.standard_user.username);
    //     this.page.getByRole('textbox',{name: 'Password'}).fill(users.standard_user.password);
    //     this.page.getByRole('button', {name: 'Login'}).click();
    // }
}