import axios from "axios";
import Logo from "../../theme/logo";
import { LoginFormParams } from "../../types/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { MIN_PASSWORD } from "../../consts";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormParams>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nav = useNavigate();
  
  const onSubmit = async (data: LoginFormParams) => {
    try {
      const { data: responseData } = await axios.post("api/auth/login", data);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      setErrorMessage(null); 
      toast.success("Đăng nhập thành công");
      nav("/");
    } catch (error) {
      toast.error("Tài khoản hoặc mật khẩu không đúng !");
    }
  };

  return (
    <div className="bg-white z-50 font-sans w-full fixed left-0 top-0">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="/">
            <Logo size={`xs:w-[60px] mx-auto my-auto mix-blend-luminosity xs:w-[120px] md:w-[150px] xl:w-[180px]`}/>
          </a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                  {...register('email', {
                    required: "Email là bắt buộc",
                    validate: value => isEmail(value) || "Địa chỉ email không hợp lệ"
                  })}
                    type="text"
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md `}
                    placeholder="Nhập email của bạn"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Mật khẩu</label>
                <div className="relative flex items-center">
                  <input
                  {...register('password', {
                    required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: MIN_PASSWORD,
                      message: `Mật khẩu phải có ít nhất ${MIN_PASSWORD} ký tự`
                    }
                  })}
                    type="password"
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md `}
                    placeholder="Nhập mật khẩu của bạn"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Lưu đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Đăng nhập
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Bạn chưa có tài khoản?{" "}
                <a href="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Đăng ký tại đây
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
