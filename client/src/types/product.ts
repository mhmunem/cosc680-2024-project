export type Product = {
    store_products: {
        id: number;
        storeID: number;
        productID: number;
        price: number;
    }
    units: {
        id: number;
        name: string;
    }
    category: {
        id: number;
        name: string;
    }
    stores: {
        id: number;
        name: string;
        chainID: number;
    }
    chains: {
        id: number;
        name: string;
        image_logo: string;
    }
    products: {
        id: number;
        name: string;
        brand: string;
        details: string;
        amount: number;
        image: string;
        unitID: number;
        categoryID: number;
    }
}
