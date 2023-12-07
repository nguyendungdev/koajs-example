import {
    getAll as getAllProducts,
    add as addProduct,
    deleteById as deleteOneProduct,
    getById,
    updateById,
    pickField,
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
        const { fields } = ctx.query;
        let product = getById(id);
        if (!product) {
            throw new Error('No Product Found with the given id!')
        }
        if (fields) {
            const listFields = fields.split(',');
            product = pickField(listFields, product);
        }
        ctx.status = 201;
        return ctx.body = {
            data: product
        }

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
        const product = getById(id);
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
        const product = getById(id);
        if (!product) {
            throw new Error(`Product with id : ${id} doesn't exists!`);
        }
        updateById(id, { ...updateData });
        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    }
    catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message,
        }
    }
}
