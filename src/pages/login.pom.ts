import { Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    readonly errorMessage: string;
    constructor(page: Page){
        this.page = page;
        this.errorMessage = "Epic sadface: Sorry, this user has been locked out.";
    }
    async loginWithUser(username: string, password: string){
        await this.page.getByRole('textbox',{name: 'Username'}).fill(username);
        await this.page.getByRole('textbox',{name: 'Password'}).fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}