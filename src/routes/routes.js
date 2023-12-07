import Router from 'koa-router';
import * as productHandler from '../handlers/products/productHandlers';
import productInputMiddleware from '../middleware/productInputMiddleware';


const router = new Router({
  prefix: '/api'
});

router.get('/products', productHandler.getProducts)
  .get('/products/:id', productHandler.getProduct)
  .post('/products', productInputMiddleware, productHandler.save)
  .delete('/products/:id', productHandler.deleteProduct)
  .put('/products/:id', productInputMiddleware, productHandler.updateProduct);

export default router;
