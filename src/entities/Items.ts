import * as Graphics from "./Graphics";

interface ItemBase {
    type: "weapon" | "armor" | "currency" | "heal" | "shop";
    key: string;
    name: string;
}

export interface Weapon extends ItemBase {
    type: "weapon";
    attack: number;
}

export interface Armor extends ItemBase {
    type: "armor";
    defense: number;
}

export interface Currency extends ItemBase {
    type: "currency";
    amount: number;
}

export interface Heal extends ItemBase {
    type: "heal";
    amount: number;
}

export interface Shop extends ItemBase {
    type: "shop";
    price: number;
    item: ItemData;
}

export type ItemData = Weapon | Armor | Currency | Heal | Shop;

export const Weapons: Record<string, Weapon> = {
    fist: {
        type: "weapon",
        key: "fist",
        name: "Fist",
        attack: 1,
    },
    dagger: {
        type: "weapon",
        key: "dagger",
        name: "Dagger",
        attack: 2,
    },
} as const;

export const Armors: Record<string, Armor> = {
    bare: {
        type: "armor",
        key: "nothing",
        name: "Nothing",
        defense: 0,
    },
    tunic: {
        type: "armor",
        key: "tunic",
        name: "Tunic",
        defense: 1,
    },
    balletShoes: {
        type: "armor",
        key: "balletShoes",
        name: "Ballet Shoes",
        defense: 2,
    },
};

export const Currencies: Record<string, Currency> = {
    scrap: {
        type: "currency",
        key: "scrap",
        name: "Scrap",
        amount: 1,
    },
};

export const Heals: Record<string, Heal> = {
    single: {
        type: "heal",
        key: "singleHeal",
        name: "Single Heal",
        amount: 1,
    },
};

export const Shops: Record<string, Shop> = {
    balletShoes: {
        type: "shop",
        key: "balletShoes",
        name: "Ballet Shoes",
        price: 30,
        item: Armors.balletShoes,
    },
};

export default class Item {
    public readonly sprite: Phaser.GameObjects.Sprite;

    public x: number;
    public y: number;
    public data: ItemData;

    constructor(
        x: number,
        y: number,
        worldX: number,
        worldY: number,
        data: ItemData,
        scene: Phaser.Scene
    ) {
        this.x = worldX;
        this.y = worldY;
        this.data = data;

        this.sprite = scene.add.sprite(
            x + 16,
            y + 16,
            Graphics.items.name,
            Graphics.items.indices[this.data.key]
        );
        this.sprite.setSize(8, 8);
        this.sprite.setScale(2);
        this.sprite.setDepth(10);
    }

    destroy() {
        this.sprite.destroy();
    }
}
