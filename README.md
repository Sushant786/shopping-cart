## shopping-cart
NodeJS Shopping Cart Exercise

## Version
v1.0

## Running the shopping-cart project locally:
cd to src directory prior to following instructions listed below.

1. Install dependencies:
      ```
      npm install
      ```

2. Start MongoDB:
      ```
      docker-compose up
      ```

3. Setup Catalog data:
      ```
      node setup/setupCatalog.js
      ```

4. Run shopping-cart project:
      ```
      npm start
      ```

## Exposed endpoints:
Open Postman:
1. To check if the project has started successfully:
      ```
      URL:           http://localhost:9000/api/
      HTTP_METHOD:   GET
      ```

2. To see the catalog:
      ```
      URL:           http://localhost:9000/api/catalog
      HTTP_METHOD:   GET
      ```

3. To add an item to the shopping cart:
      ```
      URL:           http://localhost:9000/api/addItem/{:productId}
      HTTP_METHOD:   POST
      ```

4. To delete an item from the shopping cart:
      ```
      URL:           http://localhost:9000/api/deleteItem/{:productId}
      HTTP_METHOD:   DELETE
      ```

5. To view the shopping cart:
      ```
      URL:           http://localhost:9000/api/shoppingcart
      HTTP_METHOD:   GET
      ```

6. To empty the shopping cart:
      ```
      URL:           http://localhost:9000/api/emptycart
      HTTP_METHOD:   DELETE
      ```
