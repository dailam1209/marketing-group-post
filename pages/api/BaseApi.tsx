import axios from 'axios'
import { getCookie } from 'cookies-next'
import { COOKIE_KEY } from '../nhan-su'

const currentUrlQlc = process.env.NEXT_PUBLIC_BASE_URL_QLC
const currentUrlHR = process.env.NEXT_PUBLIC_BASE_URL_HR
const currentUrlVT = process.env.NEXT_PUBLIC_BASE_URL_VT
const curentUrlTL = process.env.NEXT_PUBLIC_BASE_URL_TL

export const getCurrentToken = () => {
  const currentAccessToken = getCookie(COOKIE_KEY)
  // console.log(currentAccessToken)
  const tokenJson = currentAccessToken && JSON.parse(`${currentAccessToken}`)
  return tokenJson && tokenJson['access_token']
}

export const GET = async (url: string) => {
  const currentToken = getCurrentToken()

  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.get(`${currentUrlQlc}/${url}`, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const POST = async (url: string, body: any) => {
  const currentToken = getCurrentToken()
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.post(`${currentUrlQlc}/${url}`, body, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function DELETE(url: string, body: any) {
  const currentToken = getCurrentToken()

  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
    data: body,
  }
  try {
    const res = await axios.delete(`${currentUrlQlc}/${url}`, config)
    if (res?.status === 200) {
      return res?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getCookieSS = (context: any) => {
  const cookieData = context?.req?.cookies[COOKIE_KEY]
  const json = cookieData && JSON.parse(cookieData)
  return json?.['access_token']
}

export const getCompIdSS = (context) => {
  const cookieData = context?.req?.cookies[COOKIE_KEY]
  const json = cookieData && JSON.parse(cookieData)
  return json?.['com_info']?.['com_id']
}

export const getCompIdCS = () => {
  const cookieData = getCookie(COOKIE_KEY)?.toString()

  if (cookieData) {
    const json = JSON.parse(cookieData ?? '')

    return json?.com_info?.com_id
  }
  return null
}

export const GET_SS = async (
  url: string,
  context: any,
  type: string = 'qlc'
) => {
  const currentToken = getCookieSS(context)

  let domain = ''
  switch (type) {
    case 'qlc':
      domain = currentUrlQlc || ''
      break
    case 'hr':
      domain = currentUrlHR || ''
      break
    case 'vt':
      domain = currentUrlVT || ''
      break
    case 'tl':
      domain = curentUrlTL || ''
      break
    default:
      domain = ''
      break
  }
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.get(`${domain}/${url}`, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const POST_SS = async (
  url: string,
  body: any,
  context: any,
  type: string = 'qlc'
) => {
  const currentToken = getCookieSS(context)
  let domain = ''
  switch (type) {
    case 'qlc':
      domain = currentUrlQlc || ''
      break
    case 'hr':
      domain = currentUrlHR || ''
      break
    case 'vt':
      domain = currentUrlVT || ''
      break
    case 'tl':
      domain = curentUrlTL || ''
      break

    default:
      domain = ''
      break
  }
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.post(`${domain}/${url}`, body, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const POST_SS_HR = async (url: string, body: any, context: any) => {
  const currentToken = getCookieSS(context)

  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.post(`${currentUrlHR}/${url}`, body, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

//HR

export const GET_HR = async (url: string) => {
  const currentToken = getCurrentToken()

  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.get(`${currentUrlHR}/${url}`, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const POST_HR = async (url: string, body: any) => {
  const currentToken = getCurrentToken()
  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.post(`${currentUrlHR}/${url}`, body, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function DELETE_HR(url: string, body: any) {
  const currentToken = getCurrentToken()

  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
    data: body,
  }
  try {
    const res = await axios.delete(`${currentUrlHR}/${url}`, config)
    if (res?.status === 200) {
      return res?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

// VT

export const POST_SS_VT = async (url: string, body: any, context: any) => {
  const currentToken = getCookieSS(context)

  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.post(`${currentUrlVT}/${url}`, body, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const GET_VT = async (url: string) => {
  const currentToken = getCurrentToken()

  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  }

  try {
    const res = await axios.get(`${currentUrlVT}/${url}`, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const POST_VT = async (url: string, body: any) => {
  const currentToken = getCurrentToken()
  // console.log(currentToken)

  const config = {
    headers: {
      Authorization: `Bearer ${currentToken}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  try {
    const res = await axios.post(`${currentUrlVT}/${url}`, body, config)
    if (res?.status === 200) {
      return res?.data?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function DELETE_VT(url: string, body: any) {
  const currentToken = getCurrentToken()

  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
    data: body,
  }
  try {
    const res = await axios.delete(`${currentUrlVT}/${url}`, config)
    if (res?.status === 200) {
      return res?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

// tinh luong
export const POST_SS_TL = async (
  url: string,
  body: any,
  context: any,
  type: string = 'tl'
) => {
  const currentToken = getCookieSS(context)

  let domain = ''
  switch (type) {
    case 'qlc':
      domain = currentUrlQlc || ''
      break
    case 'hr':
      domain = currentUrlHR || ''
      break
    case 'vt':
      domain = currentUrlVT || ''
      break
    case 'tl':
      domain = curentUrlTL || ''
      break
    default:
      domain = ''
      break
  }
  // const config = {
  //   headers: { Authorization: `Bearer ${currentToken}` }
  // }

  const newBody = {
    token: currentToken,
    ...body,
  }

  try {
    const res = await axios.post(`${domain}/${url}`, newBody)
    if (res?.status === 200) {
      return res?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const POST_TL = async (url: string, body: any) => {
  const currentToken = getCurrentToken()
  // const config = {
  //   headers: { Authorization: `Bearer ${currentToken}` }
  // }

  const newBody = {
    token: currentToken,
    ...body,
  }

  try {
    const res = await axios.post(`${curentUrlTL}/${url}`, newBody)
    if (res?.status === 200) {
      return res?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function DELETE_TL(url: string, body: any) {
  const currentToken = getCurrentToken()

  const config = {
    // headers: { Authorization: `Bearer ${currentToken}` },
    data: {
      token: currentToken,
      ...body,
    },
  }
  try {
    const res = await axios.delete(`${currentUrlQlc}/${url}`, config)
    if (res?.status === 200) {
      return res?.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
