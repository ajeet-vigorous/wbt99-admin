

import axios from "axios";
import { CONST } from '../appRedux/sagas/HTTP'
import CryptoJS from "crypto-js";
import settings from "../domainConfig";

function authHeader() {
  const user = JSON.parse(localStorage.getItem(`user_id`) || 'null');
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}

async function encryptPayload(payload) {
  if (process.env.REACT_APP_DECREPT_FLAG) {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      process.env.REACT_APP_SECRET_KEY_DECREPT
    ).toString();
    return { data: encryptedData };
  }
  return payload;
}

async function decryptResponse(response) {
  if (response.data.dataEncrupt && response.data.dataEncrupt == true) {
    if (response.data) {
      let encruptedData = response.data.data
      const bytes = CryptoJS.AES.decrypt(encruptedData, process.env.REACT_APP_SECRET_KEY
      );
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedData && decryptedData != null && decryptedData != "" && decryptedData != undefined) {
        response.data.data = JSON.parse(decryptedData)
      }
    }
  }


  return response.data;
}

const HeaderNewKey = settings.domainName

const httpGet = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    };
    if (HeaderNewKey === 'BABAJI99') {
      headers['X-Frontend-Secret'] = '7-s54ebvQQpsdDA';
    }

    const payload = await encryptPayload(params);

    const result = await axios({
      method: "GET",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    await decryptResponse(result);

    invalidToken(result);

    return result;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPost = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    };
    if (HeaderNewKey === 'BABAJI99') {
      headers['X-Frontend-Secret'] = '7-s54ebvQQpsdDA';
    }

    const payload = await encryptPayload(params);

    const result = await axios({
      method: "POST",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    await decryptResponse(result);

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPostFormData = async (url, data, isNotify) => {
  try {
    const result = await axios({
      method: "POST",
      url: CONST.BACKEND_URL + url,
      data: data, // FormData encrypt nahi karte
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader()
      },
    });

    await decryptResponse(result);

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPatch = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    };
    if (HeaderNewKey === 'BABAJI99') {
      headers['X-Frontend-Secret'] = '7-s54ebvQQpsdDA';
    }

    const payload = await encryptPayload(params);

    const result = await axios({
      method: "PATCH",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    await decryptResponse(result);

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const invalidToken = async (result) => {
  if (result.data?.code === 3) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  }
};

const invalidHeadres = async (status = "") => {
  if (status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  }
};

export { httpGet, httpPost, httpPatch, httpPostFormData };
