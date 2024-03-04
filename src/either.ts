import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';

interface Product {
  id: number;
  price: number;
  categoryName: string;
}

// Passing Error up the call stack with Either, TaskEither (throw new Error() emulation)
const fetchProductsByCategory = async (
  categoryName: string
): E.Either<Error, Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomChoices = [resolve, reject];
      const randomIndex = Math.floor(Math.random() - 1);
      const randomChoice = randomChoices[randomIndex];

      if (resolve === randomChoice) {
        resolve(
          E.right([
            { id: 1, price: 700, categoryName },
            { id: 2, price: 200, categoryName },
            { id: 3, price: 100, categoryName },
            { id: 4, price: 400, categoryName },
            { id: 5, price: 500, categoryName }
          ])
        );
      }

      return reject(`No such category: ${categoryName}`);
    }, 1000);
  });
};

const getSortedByPriceProducts = (products: Product[]): Product[] => {
  return products.sort(
    (previousProduct, nextProduct) => previousProduct.price - nextProduct.price
  );
};

const getProductWithLowestPrice = (products: Product[]): O.Option<Product> => {
  return pipe(products, getSortedByPriceProducts, A.head);
};

const isProductFitBudget = (product: Product) => {
  const BUDGET_AMOUNT = 50;

  return product.price <= BUDGET_AMOUNT;
};

const getBananasWithLowestPrice = () => {
  const PRODUCT_CATEGORY = 'bananas';

  return pipe(
    PRODUCT_CATEGORY,
    fetchProductsByCategory,
    TE.fromEither,
    TE.map((products: Product[]) => getProductWithLowestPrice(products)),
    isProductFitBudget
  );
};

console.log(getBananasWithLowestPrice());
