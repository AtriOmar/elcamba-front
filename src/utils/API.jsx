import axios from "axios";

export default {
  getLoginStatus: () => {
    return axios.get("/login/status");
  },
  postUserLogin: (user) => {
    return axios.post("/login", user);
  },
  getLoggedOut: () => {
    return axios.get("/logout");
  },
  postNewUser: (user) => {
    return axios.post("/users", user);
  },
  getAllUsers: () => {
    return axios.get("/users");
  },
  deleteUserById: (id) => {
    return axios.delete(`/users/${id}`);
  },
  updateUser: (id, user) => {
    return axios.put(`/users/${id}`, user);
  },
  getProducts: () => {
    return axios.get("/products");
  },
  deleteProductById: (id) => {
    return axios.delete(`/products/${id}`);
  },
  postNewProduct: (product) => {
    return axios.post("/products", product);
  },
  getCategories: () => {
    return axios.get("/categories");
  },
  deleteCategoryById: (id) => {
    return axios.delete(`/categories/${id}`);
  },
  postNewCategory: (category) => {
    return axios.post("/categories", category);
  },
  updateCategory: (id, category) => {
    return axios.put(`/categories/${id}`, category);
  },
  getNews: () => {
    return axios.get("/news");
  },
  deleteNewsById: (id) => {
    return axios.delete(`/news/${id}`);
  },
  postNewNews: (news) => {
    return axios.post("/news", news);
  },
  updateNews: (id, news) => {
    return axios.put(`/news/${id}`, news);
  },
  getPartners: () => {
    return axios.get("/partners");
  },
  deletePartnerById: (id) => {
    return axios.delete(`/partners/${id}`);
  },
  postNewPartner: (partner) => {
    return axios.post("/partners", partner);
  },
  updatePartner: (id, partner) => {
    return axios.put(`/partners/${id}`, partner);
  },

  deleteSubCategoryById: (subCategId) => {
    return axios.delete(`/sub-categories/${subCategId}`);
  },
  postNewSubCategory: (subCateg) => {
    return axios.post("/sub-categories", subCateg);
  },
  updateSubCategory: (subCategId, subCateg) => {
    return axios.put(`/sub-categories/${subCategId}`, subCateg);
  },
  getSubCategoryById: (subCategId) => {
    return axios.get(`/sub-categories/${subCategId}`);
  },
  getSubCategories: () => {
    return axios.get("/sub-categories");
  },
  getSubCategByCategId: (categId) => {
    return axios.get("/sub-categories/getByCategId", {
      query: {
        categId,
      },
    });
  },
};
