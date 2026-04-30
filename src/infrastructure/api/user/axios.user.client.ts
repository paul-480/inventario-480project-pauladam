import axios from "axios";
import { axiosClient } from "../axios.client";

export const axiosUserClient = axios.create({
    baseURL: axiosClient.defaults.baseURL + '/users',
});