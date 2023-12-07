const fs = require('fs');
const products = require('./products.json');

/**
 * 
 * @param {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]} newProducts 
 */
function saveData(newProducts) {
    return fs.writeFileSync('./src/database/products.json', JSON.stringify(newProducts), null, 4);
}

/**
 * 
 * @param {number}limit 
 * @param {string} sort desc or asc
 * @returns {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]}
 */
function getAll(limit, sort) {
    let result = [...products]
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
 * @returns {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]}
 */
function getById(id) {
    return products.find(product => product.id === parseInt(id));
}


/**
 * 
 * @param {{name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}} data 
 */
function add(data) {
    const updateProduct = [...products, { ...data, id: (products[products.length - 1].id + 1) }];
    return saveData(updateProduct);
}

/**
 * 
 * @param {number} id 
 */
function deleteById(id) {
    const deletedProducts = products.filter((product) =>
        product.id !== parseInt(id)
    );
    return saveData(deletedProducts);

}

/**
 * 
 * @param {number} index 
 * @param {{name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}} data 
 */
function updateById(id, data) {
    const newProducts = products.map((product) => {
        return product.id === parseInt(id) ? data : product
    });

    return saveData(newProducts);
}

/**
 * 
 * @param {string[]} fields 
 * @param {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]} product 
 * @returns {{}}
 */
function pickField(fields, product) {
    return fields.reduce((picked, field) => {
        if (product.hasOwnProperty(field)) {
            picked[field] = product[field];
        }
        return picked;
    }, {});
}


module.exports = {
    pickField,
    getAll,
    add,
    deleteById,
    getById,
    updateById,
}
