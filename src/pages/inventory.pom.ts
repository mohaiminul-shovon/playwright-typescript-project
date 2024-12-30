import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;
  readonly sortComboBox: Locator;
  readonly menuButton: Locator;
  readonly removeItemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortComboBox = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.removeItemButton = page.locator('button[data-test^="remove"]')
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('button[data-test^="add-to-cart"]').click();
  }
  async removeFromCart(itemName: string): Promise<void> {
    const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('button[data-test^="remove"]').click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async getInventoryItems(): Promise<string[]> {
    return this.inventoryItems.allTextContents();
  }
  async cartBoxDefaultPosition(): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
} | null>{
    const cartBox = { x: 1203.2000732421875, y: 10, width: 40, height: 40 }
    return cartBox;
    
  }
}
