import {
    getAll as getAllProducts,
    getOne as getOneProduct,
    add as addProduct,
    deleteById as deleteOneProduct,
    getIndexById,
    updateById,
} from "../../database/productRepository";

export async function getProducts(ctx) {
    try {
        const { limit, sort } = ctx.query;
        const products = getAllProducts(limit, sort);
        if (products.length !== 0) {
            ctx.status = 201;
            return ctx.body = products;
        }
        throw new Error('No Product Found!')
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

export async function getProduct(ctx) {
    try {
        const { id } = ctx.params;
        let { fields } = ctx.query;
        const listFields = fields.split(',');
        const getCurrentProduct = getOneProduct(id, listFields);
        if (getCurrentProduct) {
            ctx.status = 201;
            return ctx.body = {
                data: getCurrentProduct
            }
        }
        throw new Error('No Product Found with the given id!')
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

export async function deleteProduct(ctx) {
    try {
        const { id } = ctx.params;
        const product = getIndexById(id);
        if (product) {
            deleteOneProduct(id);
            ctx.status = 201;
            return ctx.body = {
                success: true
            };
        }
        throw new Error(`Product with id : ${id} doesn't exists!`)
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
}

export async function save(ctx) {
    try {
        const postData = ctx.request.body;
        addProduct({ ...postData, createAt: new Date() });
        ctx.status = 201;
        return ctx.body = {
            success: true
        }

    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message,
        }

    }
}

export async function updateProduct(ctx) {
    try {
        const { id } = ctx.params;
        const updateData = ctx.request.body;
        const productIndex = getIndexById(id);
        if (productIndex !== -1) {
            updateById(productIndex, updateData);
            ctx.status = 201;
            return ctx.body = {
                success: true
            }
        }
        throw new Error(`Product with id : ${id} doesn't exists!`)
    }
    catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message,
        }
    }
}
