import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/login.pom"
let loginPage: LoginPage;
test.beforeEach(async({page})=>{
    await page.goto(process.env.LOGIN_URL as string);
    loginPage = new LoginPage(page);
})
test.describe("Login Test",()=>{
    test('standard user should logged in properly',async()=>{
        await loginPage.loginWithStandardUser();
        expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
})

