import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterFormParams } from '../../types/register';
import isEmail from 'validator/lib/isEmail';
import { MIN_PASSWORD } from '../../consts';
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormParams>();
  
  const onSubmit = async (data: RegisterFormParams) => {
    try {
      const response = await axios.post("api/auth/register", data);
      setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
      setEmail('');
      setPassword('');
      setError('');
      console.log(response.data);
      toast.success("Đăng ký thành công");
      nav("/login");
    } catch (err) {
      console.error('Error registering user:', err.response?.data);
      toast.error(err.response?.data?.message || 'Đăng ký không thành công!');
    }
  };

  return (
    <div className="bg-white w-full h-full fixed left-0 top-0 z-50">
      <div className="font-sans bg-white max-w-4xl mx-auto flex items-center md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow rounded-xl overflow-hidden">
          <div className="md:flex xl:flex flex-col justify-center h-full md:space-y-16 bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <h4 className="text-white text-lg font-semibold">Tạo tài khoản của bạn</h4>
            <p className="text-xs text-gray-300 mt-3 leading-relaxed">
              Chào mừng bạn đến với trang đăng ký của chúng tôi! Bắt đầu bằng cách tạo tài khoản của bạn.
            </p>
          </div>

          <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">Tạo tài khoản</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                {...register('email', {
                  required: "Email is required",
                  validate: value => isEmail(value) || "Invalid email address"
                })}
                  type="email"
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500`}
                  placeholder="Nhập email"
                  required
                />
                {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Mật khẩu</label>
                <input
                  type="password"
                  {...register('password', {
                    required: "Password is required",
                    minLength: {
                      value: MIN_PASSWORD,
                      message: `Password must be at least ${MIN_PASSWORD} characters long`
                    }
                  })}
                  className={`text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500`}
                  placeholder="Nhập mật khẩu"
                  required
                />
                {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              >
                Tạo tài khoản
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Đã có tài khoản?{' '}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">Đăng nhập tại đây</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
