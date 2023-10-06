import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4210/api/bayDins/",
});
