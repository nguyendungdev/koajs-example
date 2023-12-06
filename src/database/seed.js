const faker = require('faker');
const fs = require('fs');

let count = 1;
const generateProduct = () => {
    return {
        id: count++,
        name: faker.commerce.productName(),
        price: faker.datatype.number({ min: 5, max: 1000, precision: 0.01 }),
        description: faker.lorem.sentence(),
        product: faker.commerce.product(),
        color: faker.commerce.color(),
        createdAt: faker.date.past().toISOString(),
        image: faker.image.imageUrl(),
    };
};

const generateProducts = (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push(generateProduct());
    }
    return products;
};

const products = generateProducts(10);

const jsonContent = JSON.stringify(products, null, 2);

fs.writeFileSync('src/database/products.json', jsonContent);

