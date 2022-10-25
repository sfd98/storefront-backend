import {Product, ProductStore} from '../product';

const store = new ProductStore();

describe("Product Model", () => {
    
    //Tests for definitions
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    //Tests for functionality
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should create a new product', async () => {
        const result = await store.create({
            name: 'Test Product',
            price: 12,
        });
        expect(result).toEqual({
            id: 1,
            name: 'Test Product',
            price: 12 
        });
    });

    it('show method should show a certain product', async() => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'Test Product',
            price: 12 
        });
    });
});