let BASE_URL =
  "https://backend-itqzdi0ga-paudelsworups-projects.vercel.app/api";

//get all the products
export const getAllProducts = async () => {
  const product = await fetch(`${BASE_URL}/products`);
  const res = await product.json();
  return res;
};

//get single product
export const getProductById = async (id: any) => {
  const product = await fetch(`${BASE_URL}/products/${id}`);
  const res = await product.json();
  return res;
};

//create a order
export const createOrder = async (payload: any, paymentmethod: string) => {
  return fetch(`${BASE_URL}/order/create?mode=${paymentmethod}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())

    .catch((error) => {
      console.error("Error:", error);
    });
};

//login a user
export const signIn = async (payload: any) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
