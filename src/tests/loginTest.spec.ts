import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/login.pom"
import * as user from "../data/userInfo.json";

let loginPage: LoginPage;
test.beforeEach(async({page})=>{
    await page.goto(process.env.LOGIN_URL as string);
    loginPage = new LoginPage(page);
})
test.describe("Login Test",()=>{
    test('standard user should logged in properly',async()=>{
        await loginPage.loginWithUser(user.standard_user.username, user.standard_user.password);
        expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    test('locked user should not be allowed to login', async()=>{
        await loginPage.loginWithUser(user.locked_user.username, user.locked_user.password);
        await expect(loginPage.page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    });
    test('problem user should login in but will have issues', async () => {
        await loginPage.loginWithUser(user.problem_user.username, user.problem_user.password);
        expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        //add some more assertions on items page.
    })
    test('performance glitch user test', async () => {
        await loginPage.loginWithUser(user.performance_glitch_user.username, user.performance_glitch_user.password);
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html',{timeout: 3000});
        //add some more assertions on items page.
    })
    test('error user should face issue with checkout',async()=>{
        await loginPage.loginWithUser(user.error_user.username, user.error_user.password);
        expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    test('visual user should face issue with visual contents',async()=>{
        await loginPage.loginWithUser(user.visual_user.username, user.visual_user.password);
        expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    
})