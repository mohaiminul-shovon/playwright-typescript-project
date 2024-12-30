import { Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    constructor(page: Page){
        this.page = page;
    }
    async loginWithUser(username: string, password: string){
        await this.page.getByRole('textbox',{name: 'Username'}).fill(username);
        await this.page.getByRole('textbox',{name: 'Password'}).fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();

    }
}