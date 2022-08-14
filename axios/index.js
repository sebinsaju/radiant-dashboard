import axios from "axios";
import { useContext, useState } from "react";
import { baseURL } from "../config/config";
import { AuthContext } from "../context/AuthContext";
  
let token;
if(typeof window != 'undefined'){
  token = localStorage.getItem('Token')
}
export const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}` 
    }
  });