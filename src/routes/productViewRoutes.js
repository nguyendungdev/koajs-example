const Router = require("koa-router");
const { getAll: getAllProducts } = require("../database/productRepository")
const routes = new Router({});

routes.get("/products", async (ctx) => {
    const products = getAllProducts();
    await ctx.render("index", { products });
});
module.exports = routes;
