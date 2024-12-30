import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/login.pom"
import {InventoryPage} from "../pages/inventory.pom"
import * as user from "../data/userInfo.json";
import { log } from "node:util";
import { start } from "node:repl";
import exp from "node:constants";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
const loginUrl = process.env.LOGIN_URL as string
const inventoryPageUrl = process.env.INVENTORY_URL as string;
test.beforeEach(async({page})=>{
    await page.goto(loginUrl);
    loginPage = new LoginPage(page);
})
test.describe("Login Test",()=>{
    test('standard user should logged in properly',async({page})=>{
        await loginPage.loginWithUser(user.standard_user.username, user.standard_user.password);
        inventoryPage = new InventoryPage(page);
        await expect(page).toHaveURL(inventoryPageUrl);
        await expect(inventoryPage.cartIcon).toBeVisible();
        const items = await inventoryPage.getInventoryItems();
        await expect(items.length).toBeGreaterThan(0);
    });
    test('locked user should not be allowed to login', async({page})=>{
        await loginPage.loginWithUser(user.locked_user.username, user.locked_user.password);
        await expect(page.getByText(loginPage.errorMessage)).toBeVisible();
    });
    test('problem user should login in but will have issues', async ({page}) => {
        await loginPage.loginWithUser(user.problem_user.username, user.problem_user.password);
        await expect(page).toHaveURL(inventoryPageUrl);
        inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCart("Sauce Labs Bike Light");
        await inventoryPage.removeFromCart("Sauce Labs Bike Light");
        await expect(inventoryPage.removeItemButton).toBeVisible();
    })
    test('performance glitch user test', async ({page}) => {
        const start = Date.now();
        await loginPage.loginWithUser(user.performance_glitch_user.username, user.performance_glitch_user.password);
        await expect(page).toHaveURL(inventoryPageUrl);
        const loadingTime = Date.now() - start;
        await expect(loadingTime).toBeGreaterThan(5000);
    })
    test('error user should face issue with checkout',async({page})=>{
        await loginPage.loginWithUser(user.error_user.username, user.error_user.password);
        await expect(page).toHaveURL(inventoryPageUrl);
        inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCart("Sauce Labs Bolt T-Shirt");
        await expect(inventoryPage.removeItemButton).not.toBeVisible();

    });
    test('visual user should face issue with visual contents',async({page})=>{
        await loginPage.loginWithUser(user.visual_user.username, user.visual_user.password);
        await expect(page).toHaveURL(inventoryPageUrl);
        inventoryPage = new InventoryPage(page);
        const cartBox = await inventoryPage.cartIcon.boundingBox();
        await expect(cartBox).not.toEqual(inventoryPage.cartBoxDefaultPosition);
        
    });
    
})