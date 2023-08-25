import axios from "axios";
import cookieCutter from "cookie-cutter";
// import { getCookie } from 'cookies-next'
// import { COOKIE_KEY } from '..'

const currentUrlQlc = process.env.NEXT_PUBLIC_BASE_URL_QLC;
const currentUrlHR = process.env.NEXT_PUBLIC_BASE_URL_HR;
const currentUrlVT = process.env.NEXT_PUBLIC_BASE_URL_VT;
const curentUrlTL = process.env.NEXT_PUBLIC_BASE_URL_TL;

//! Về sau mới sử dụng hàm này
// export const getCurrentToken = () => {
//   const currentAccessToken = getCookie(COOKIE_KEY);
//   // console.log(currentAccessToken)
//   const tokenJson = currentAccessToken && JSON.parse(`${currentAccessToken}`);
//   return tokenJson && tokenJson["access_token"];
// };

export const getCurrentTokenTien = () => {
  const currentAccessToken = cookieCutter.get("token_base365");
  console.log("token_base365 at BaseAPI", currentAccessToken);
  return currentAccessToken;
};
export const TokenForTinhLuong =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTc0OTYsImlkVGltVmllYzM2NSI6MjQwMDgwLCJpZFFMQyI6MTI0ODMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoidHVhbmFuaGh1c3QwNUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjgxNTMxNzA5LCJ0eXBlIjoyLCJjb21faWQiOjMzMTIsInVzZXJOYW1lIjoiTmd1eeG7hW4gVHXhuqVuIEFuaCJ9LCJpYXQiOjE2OTI2MDgyMzYsImV4cCI6MTY5MjY5NDYzNn0.MOUFu9DAowHWjZp3u8-puOcuWUM7LgKeu1_I-UgGcts";

export const TokenForQuanLyChung =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiaWRUaW1WaWVjMzY1IjoyMzI0MTYsImlkUUxDIjoxNjY0LCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6InRyYW5nY2h1b2k0QGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInR5cGUiOjEsImNvbV9pZCI6MTY2NCwidXNlck5hbWUiOiJNdG4gQ29tcGFueSJ9LCJpYXQiOjE2OTI1ODAxODEsImV4cCI6MTY5MjY2NjU4MX0.o9yt4no4wNVPmdvxS1NaB2UtlEdMpIXJzMt7Q5Dm15k";
export const domain = process.env.NEXT_PUBLIC_API;
export const domainQLC = process.env.NEXT_PUBLIC_API;

// const user_info = JSON.parse(localStorage.getItem("inforuser"));
// const token = cookieCutter.get("token");
// const cp = user_info.data.data.user_info.com_id;
// const ep_id = user_info.data.data.user_info.ep_id;

// export const TokenForTinhLuong = token

export const cp = () => {
  const user_info = JSON.parse(localStorage.getItem("inforuser"));
  const cp = user_info.data.data.user_info.com_id;
};

export const GET = async (url) => {
  const currentToken = cookieCutter.get("token_base365");
  console.log("Đang vào hàm get ở baseAPI với token là:", currentToken);
  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };

  try {
    const res = await axios.get(`${url}`, config);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const POST = async (url, body) => {
  const currentToken = cookieCutter.get("token_base365");
  console.log("Đang vào hàm post ở baseAPI với token là: ", currentToken);
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };

  try {
    const res = await axios.post(`${url}`, body, config);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function DELETE(url, body) {
  const currentToken = TokenForQuanLyChung;

  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
    data: body,
  };
  try {
    const res = await axios.delete(`${currentUrlQlc}/${url}`, config);
    if (res?.status === 200) {
      return res?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

//! ve sau moi su dung ham nay
// export const getCookieSS = (context) => {
//   const cookieData = context?.req?.cookies[COOKIE_KEY]
//   const json = cookieData && JSON.parse(cookieData)
//   return json?.['access_token']
// }

// export const getCompIdSS = (context) => {
//   const cookieData = context?.req?.cookies[COOKIE_KEY]
//   const json = cookieData && JSON.parse(cookieData)
//   return json?.['com_info']?.['com_id']
// }

//! Chua biet no la gi nen chua su dung
// export const getCompIdCS = () => {
//   const cookieData = getCookie(COOKIE_KEY)?.toString()

//   if (cookieData) {
//     const json = JSON.parse(cookieData ?? '')

//     return json?.com_info?.com_id
//   }
//   return null
// }

export const POST_SS = async (url, body, context, type = "qlc") => {
  const currentToken = TokenForQuanLyChung;

  let domain = "";
  switch (type) {
    case "qlc":
      domain = currentUrlQlc || "";
      break;
    case "hr":
      domain = currentUrlHR || "";
      break;
    case "vt":
      domain = currentUrlVT || "";
      break;
    case "tl":
      domain = curentUrlTL || "";
      break;
    default:
      domain = "";
      break;
  }
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };

  try {
    const res = await axios.post(`${domain}/${url}`, body, config);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const POST_SS_HR = async (url: string, body: any, context: any) => {
//   const currentToken = getCookieSS(context)

//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//   }

//   try {
//     const res = await axios.post(`${currentUrlHR}/${url}`, body, config)
//     if (res?.status === 200) {
//       return res?.data?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

//! HR

// export const GET_HR = async (url: string) => {
//   const currentToken = getCurrentToken()

//   // console.log(currentToken)
//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//   }

//   try {
//     const res = await axios.get(`${currentUrlHR}/${url}`, config)
//     if (res?.status === 200) {
//       return res?.data?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export const POST_HR = async (url: string, body: any) => {
//   const currentToken = getCurrentToken()
//   // console.log(currentToken)
//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//   }

//   try {
//     const res = await axios.post(`${currentUrlHR}/${url}`, body, config)
//     if (res?.status === 200) {
//       return res?.data?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export async function DELETE_HR(url: string, body: any) {
//   const currentToken = getCurrentToken()

//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//     data: body,
//   }
//   try {
//     const res = await axios.delete(`${currentUrlHR}/${url}`, config)
//     if (res?.status === 200) {
//       return res?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

//! VT

// export const POST_SS_VT = async (url: string, body: any, context: any) => {
//   const currentToken = getCookieSS(context)

//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//   }

//   try {
//     const res = await axios.post(`${currentUrlVT}/${url}`, body, config)
//     if (res?.status === 200) {
//       return res?.data?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export const GET_VT = async (url: string) => {
//   const currentToken = getCurrentToken()

//   // console.log(currentToken)
//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//   }

//   try {
//     const res = await axios.get(`${currentUrlVT}/${url}`, config)
//     if (res?.status === 200) {
//       return res?.data?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export const POST_VT = async (url: string, body: any) => {
//   const currentToken = getCurrentToken()
//   // console.log(currentToken)

//   const config = {
//     headers: {
//       Authorization: `Bearer ${currentToken}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   }

//   try {
//     const res = await axios.post(`${currentUrlVT}/${url}`, body, config)
//     if (res?.status === 200) {
//       return res?.data?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export async function DELETE_VT(url: string, body: any) {
//   const currentToken = getCurrentToken()

//   const config = {
//     headers: { Authorization: `Bearer ${currentToken}` },
//     data: body,
//   }
//   try {
//     const res = await axios.delete(`${currentUrlVT}/${url}`, config)
//     if (res?.status === 200) {
//       return res?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

//! tinh luong
// export const POST_SS_TL = async (
//   url: string,
//   body: any,
//   context: any,
//   type: string = 'tl'
// ) => {
//   const currentToken = getCookieSS(context)

//   let domain = ''
//   switch (type) {
//     case 'qlc':
//       domain = currentUrlQlc || ''
//       break
//     case 'hr':
//       domain = currentUrlHR || ''
//       break
//     case 'vt':
//       domain = currentUrlVT || ''
//       break
//     case 'tl':
//       domain = curentUrlTL || ''
//       break
//     default:
//       domain = ''
//       break
//   }
//   // const config = {
//   //   headers: { Authorization: `Bearer ${currentToken}` }
//   // }

//   const newBody = {
//     token: currentToken,
//     ...body,
//   }

//   try {
//     const res = await axios.post(`${domain}/${url}`, newBody)
//     if (res?.status === 200) {
//       return res?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export const POST_TL = async (url: string, body: any) => {
//   const currentToken = getCurrentToken()
//   // const config = {
//   //   headers: { Authorization: `Bearer ${currentToken}` }
//   // }

//   const newBody = {
//     token: currentToken,
//     ...body,
//   }

//   try {
//     const res = await axios.post(`${curentUrlTL}/${url}`, newBody)
//     if (res?.status === 200) {
//       return res?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

// export async function DELETE_TL(url: string, body: any) {
//   const currentToken = getCurrentToken()

//   const config = {
//     // headers: { Authorization: `Bearer ${currentToken}` },
//     data: {
//       token: currentToken,
//       ...body,
//     },
//   }
//   try {
//     const res = await axios.delete(`${currentUrlQlc}/${url}`, config)
//     if (res?.status === 200) {
//       return res?.data
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }
