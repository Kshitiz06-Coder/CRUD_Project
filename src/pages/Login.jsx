import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validateLoginForm } from '../utils/validation';

export const Login = () => {
  const [formData, setFormData] = useState({ username: 'emilys', password: 'emilyspass' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("1. Form submitted");

  const validationErrors = validateLoginForm(formData);
  console.log("2. Validation errors:", validationErrors);
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    console.log("3. Blocked by validation");
    return;
  }

  setLoading(true);
  setApiError('');
  try {
    console.log("4. Calling login...");
    const result = await login(formData.username, formData.password);
    console.log("5. Login success, result:", result);
    navigate('/dashboard');
    console.log("6. Navigate called");
  } catch (err) {
    console.log("7. Login FAILED:", err);
    setApiError(err.response?.data?.message || 'Invalid username or password');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Sign in to access your portal</p>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" isLoading={loading} className="w-full mt-2">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};