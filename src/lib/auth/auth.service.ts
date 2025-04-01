import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    if (response.status === 200) {
      const { token } = response.data;
      sessionStorage.setItem('token', token);
      return { token, error: null };
    } else {
      return { token: null, error: 'Invalid credentials' };
    }
  } catch (error: any) {
    return { token: null, error: error.response?.data?.message || 'Login failed' };
  }
}

export function logoutUser() {
  sessionStorage.removeItem('token');
}
