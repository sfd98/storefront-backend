import {User, UserStore} from '../user';

const store = new UserStore();

describe("User Model", () => {
    
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
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('create method should create a new product', async () => {
        const result = await store.create({
            firstName: 'UserOne',
            lastName: 'Test',
            password: ''    //CHECK PASSWORDS!
        });
        expect(result).toEqual({
            firstName: 'UserOne',
            lastName: 'Test',
            password: ''    //CHECK PASSWORDS! 
        });
    });

    it('show method should show a certain product', async() => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            firstName: 'UserOne',
            lastName: 'Test',
            password: ''    //CHECK PASSWORDS! 
        });
    });
});