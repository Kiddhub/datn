
const baseURL = "http://localhost:8080/api"

export const getFetch = async (url, token = '') => {
  let headers = {}
  console.log(url)
  console.log(`${baseURL}${url}`)

  if (token !== '') {
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: headers
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      if (response.status === 403) {
        return Promise.reject(new Error('invalid credentials and/or access level'))
      }
      
    }
  })
}

export const getFetchWithParams = async (url, params = {}, token = '') => {
  const headers = {};

  if (token !== '') {
    headers.Authorization = `Bearer ${token}`;
  }
  // Append query parameters to the URL
  const queryString = new URLSearchParams(params);
  const fullURL = `${baseURL}${url}${queryString ? `?${queryString}` : ''}`;

  return fetch(fullURL, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 403) {
          return Promise.reject(new Error('invalid credentials and/or access level'));
        }
        // Handle other error cases as needed
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
};
export const putFetch = async (url, payload = {}, token = '') => {
  let headers = {
    'Content-Type': 'application/json' // Đặt Content-Type là application/json
  };
  if (token !== '') {
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${baseURL}${url}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: headers
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      if (response.status === 403) {
        return Promise.reject(new Error('invalid credentials and/or access level'))
      }
      
    }
  })
}

export const postFetch = async (url, payload = {}, token = '') => {

  const headers = {
    'Content-type': 'application/json'
  }

  if (token !== '') {
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${baseURL}/${url}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: headers
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      if (response.status === 403) {
        return Promise.reject(new Error('invalid credentials and/or access level'))
      }
    }
  })
  //.catch(err => {
  //  return Promise.reject(new Error(err))
 // })

  /*
  .then(response => response.json())
  .then(json => {
    if (json?.data?.token) {
      dispatch(setter(json.data.token))
      //setResult(`token: ${json.data.token}`)
    }
    //return json
  })
  return res*/
}
export const deleteFetch = async (url, payload = {}, token = '') => {
  const headers = {
    'Content-Type': 'application/json' // Thiết lập header Content-Type là application/json
  };

  if (token !== '') {
    headers.Authorization = `Bearer ${token}`; // Thêm token vào header nếu có
  }

  try {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(payload) // Chuyển đổi payload thành chuỗi JSON và gửi đi
    });

    if (response.ok) {
      return { success: true, message: 'Delete request successful' }; // Trả về thông báo nếu xóa thành công
    } else {
      if (response.status === 403) {
        return Promise.reject(new Error('Invalid credentials and/or access level')); // Xử lý lỗi khi không có quyền truy cập
      }
      const errorMessage = await response.text();
      return Promise.reject(new Error(`Delete request failed with status ${response.status}: ${errorMessage}`)); // Xử lý các lỗi khác nếu có
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Ném ra lỗi để được xử lý bởi người gọi
  }
};
