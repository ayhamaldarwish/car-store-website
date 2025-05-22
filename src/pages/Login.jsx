import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'اسم المستخدم مطلوب';
    }
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Check for admin credentials
      if (formData.username === 'admin' && formData.password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        toast.success('تم تسجيل الدخول بنجاح');
        navigate('/admin');
      } else {
        // Regular user login
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (registeredUser && 
            registeredUser.username === formData.username && 
            registeredUser.password === formData.password) {
          localStorage.setItem('isLoggedIn', 'true');
          toast.success('تم تسجيل الدخول بنجاح');
          navigate('/');
        } else {
          toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            تسجيل الدخول
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaUser className="inline-block ml-2 text-primary" />
                اسم المستخدم
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:ring-2 focus:ring-primary focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-all duration-300`}
                placeholder="أدخل اسم المستخدم"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaLock className="inline-block ml-2 text-primary" />
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:ring-2 focus:ring-primary focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-all duration-300`}
                placeholder="أدخل كلمة المرور"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3.5 px-6 
                       rounded-full transition-all duration-300 transform hover:scale-105 
                       shadow-lg hover:shadow-primary/30"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              ليس لديك حساب؟{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
              >
                إنشاء حساب جديد
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 