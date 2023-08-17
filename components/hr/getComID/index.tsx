import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { getToken } from '@/pages/api/api-hr/token'

const GetComId = () => {
  const COOKIE_KEY = 'token_base365'
  const currentCookie = getToken(COOKIE_KEY)
  if (currentCookie) {
    const decodedToken: any = jwt_decode(currentCookie)
    return decodedToken?.data?.com_id
  }
}

export default GetComId
