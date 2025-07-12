import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { useAuth } from "./components/AuthProvider";
import { getAccountDetail } from "./apis/accountService";
import { postLogin } from "./apis/auth";
import { jwtDecode } from "jwt-decode";
import "./Login.scss"
import LogoBanner from "/assets/images/login-banner.png"
import placePdf from "/assets/images/placePdf.svg";
import buttonMedium from "/assets/images/buttonMedium.svg";
import IcLogo2 from "/assets/images/logo2.svg";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const { login, isAuthenticated, setUserData } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await postLogin(data.username, data.password);
      const { token, role, id } = response;
      if (token) {
        login(token, role, id);
        const dataDetail = await getAccountDetail(id.toString());
        const decodedToken: { roles: string[]; sub: string } = jwtDecode(token);
        setUserData({
          sub: decodedToken.sub,
          info: dataDetail,
        });
        navigate('/');
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (_) {
      setError("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  function handleChange(_event: ChangeEvent<HTMLInputElement>): void {
    if (error) setError("");
  }

  return (
    <div className="flex h-screen">
      {/* LEFT - IMAGE BANNER */}
      <div className="w-2/5 hidden lg:block relative">
        <img
          src={LogoBanner}
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-14 w-full flex items-center justify-center">
          <img
            src={IcLogo2}
            alt="Login Banner"
            className="w-[206px]"
          />
        </div>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className="w-full lg:w-3/5 flex items-center justify-center bg-white relative overflow-hidden">
        <div className="w-full lg:max-w-[60%] md:max-w-[80%] px-8">
          {/* <img src={Logo} alt="Logo" className="mb-8 w-[180px]" /> */}
          <h1 className="text-[30px] font-semibold text-[#333] mb-2">Đăng nhập</h1>
          <p className="text-[#555] mb-10 text-[16px]">Chào mừng đến với HanVina Travel</p>
          <Form className="space-y-5" onFinish={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium">Tài khoản</label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
              >
                <Input
                  id="username"
                  placeholder="Nhập tài khoản"
                  className="mt-2 block w-full !h-[48px] border border-gray-300 rounded-md"
                  onChange={handleChange}
                  autoComplete="off"
                  size="large"
                />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">Mật khẩu</label>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  size="large"
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="mt-2 w-full py-0 border border-gray-300 rounded-md custom-login-password"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Lưu thông tin đăng nhập
              </label>
              <a href="#" className="text-sm text-[#36383A]">Quên mật khẩu?</a>
            </div>
            <div className="mt-4 flex justify-center items-center cursor-pointer relative z-[100]">
              <button
                type="submit"
                className="relative h-[48px] cursor-pointer"
              >
                <img
                  src={buttonMedium}
                  className="mx-auto object-cover h-[43px] lg:h-auto"
                  alt="button"
                />
                <div
                  className="absolute w-full top-[10px] text-center font-[500] text-[16px] text-white"

                >
                  Đăng nhập
                </div>
              </button>
            </div>
          </Form>
        </div>

        <div className="w-full absolute bottom-[-20px]">
          <img src={placePdf} alt="" className="w-full" />
        </div>
      </div>
    </div >
  );
};


export default Login;
