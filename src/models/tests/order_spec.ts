import {Order, OrderStore} from '../order';

const store = new OrderStore();

describe("Order Model", () => {
    
    //Tests for definitions
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    //MISSING: Test for create definition? Check Joins

    //Tests for functionality
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    //MISSING: Test for the show route. Based on inner join

});