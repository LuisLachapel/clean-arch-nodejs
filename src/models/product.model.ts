import {prop, getModelForClass} from "@typegoose/typegoose"

class Product {

    @prop({required: true, trim: true, type: () => String})
    private name: string;

    @prop({required: false, trim: true, type: () => String})
    private description: string;

    @prop({required: true,  type: () => Number, min: 1})
    private price: number;

    @prop({required: true,  type: () => Number, min: 1})
    private quantity: number;

    @prop({required: true, trim: true, type: () => String})
    private status: string


    constructor(name: string, description: string, price: number, quantity: number, status: string){
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.status = status;

    }

    
}

const ProductModel = getModelForClass(Product)
export default ProductModel