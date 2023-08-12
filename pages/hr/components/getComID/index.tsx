import React, { useState, useEffect } from 'react';
import { getToken } from "@/pages/api/token";
import jwt_decode from "jwt-decode";

const GetComId = () => {
    const COOKIE_KEY = "user_365";
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        return (decodedToken?.data?.com_id);
    }
}

export default GetComId;