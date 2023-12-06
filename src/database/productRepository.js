const fs = require('fs');
const products = require('./products.json');

/**
 * 
 * @param {number}limit 
 * @param {string} sort desc or asc
 * @returns {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]}
 */
function getAll(limit, sort) {
    let result = products
    if (sort) {
        result.sort((a, b) => {
            const sortCondition = sort.toLowerCase() === 'desc' ? 'desc' : 'asc';
            const orderBy = sortCondition === 'desc' ? -1 : 1;
            return orderBy * (new Date(a.createdAt) - new Date(b.createdAt));
        })
    }
    if (limit) {
        result = result.slice(0, parseInt(limit))
    }
    return result;
}

/**
 * 
 * @param {number} id 
 * @returns {number}
 */
function getIndexById(id) {
    return products.findIndex(product => product.id === parseInt(id));
}


/**
 * 
 * @param {{name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}} data 
 */
function add(data) {
    console.log(products[products.length - 1].id)
    const updateProduct = [...products, { ...data, id: products[products.length - 1].id }];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify(updateProduct, null, 4));
}

/**
 * 
 * @param {number} id 
 */
function deleteById(id) {
    const deletedProducts = products.filter(product =>
        product.id !== parseInt(id)
    );
    return fs.writeFileSync('./src/database/products.json', JSON.stringify(deletedProducts, null, 4));

}

/**
 * 
 * @param {number} index 
 * @param {{name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}} data 
 */
function updateById(index, data) {
    products[index] = { ...products[index], ...data, };
    return fs.writeFileSync('./src/database/products.json', JSON.stringify(products, null, 4));
}

/**
 * 
 * @param {number} id 
 * @param {string[]} fields 
 * @returns {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]}
 */
function getOne(id, fields) {
    const product = products.find(product => product.id === parseInt(id))
    if (fields.length) {
        let filterProduct = {}
        fields.forEach((field) => {
            filterProduct[field] = product[field];
        })
        return filterProduct;
    }
    return product;
}

module.exports = {
    getOne,
    getAll,
    add,
    deleteById,
    getIndexById,
    updateById,
}
