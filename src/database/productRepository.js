const fs = require('fs');
const products = require('./products.json');
const faker = require('faker');

/**
 * 
 * @param {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]} newProducts 
 */
function saveData(newProducts) {
    return fs.writeFileSync('./src/database/products.json', JSON.stringify(newProducts), null, 4);
}

/**
 * 
 * @param {{limit:number,sort:string}}query
 * @returns {[{id:number,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]}
 */
function getAll(query) {
    let result = [...products]
    if (query.sort) {
        result.sort((a, b) => {
            const sortCondition = query.sort.toLowerCase() === 'desc' ? 'desc' : 'asc';
            const orderBy = sortCondition === 'desc' ? -1 : 1;
            return orderBy * (new Date(a.createdAt) - new Date(b.createdAt));
        })
    }
    if (query.limit) {
        result = result.slice(0, parseInt(query.limit))
    }
    return result;
}

/**
 * 
 * @param {string} id 
 * @returns {[{id:string,name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}]}
 */
function getById(id) {
    return products.find(product => product.id === id);
}


/**
 * 
 * @param {{name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}} data 
 */
function add(data) {
    const updateProduct = [...products, { ...data, id: faker.datatype.uuid() }];
    return saveData(updateProduct);
}

/**
 * 
 * @param {string} id 
 */
function deleteById(id) {
    const deletedProducts = products.filter((product) =>
        product.id !== id
    );
    return saveData(deletedProducts);

}

/**
 * 
 * @param {string} id
 * @param {{name:string,price:number,description:string,product:string,color:string,createAt:Date,image:string}} data 
 */
function updateById(id, data) {
    const newProducts = products.map((product) => {
        return product.id === id ? data : product
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
