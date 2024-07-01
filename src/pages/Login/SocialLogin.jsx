import React, { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { axiosPost } from "../../lib/axiosPost";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";

const SocialLogin = () => {
  const { googleAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.user?.user);
  console.log(userStore);

  useEffect(() => {
    if (userStore) {
      navigate("/profile");
    }
  }, [navigate, userStore?.result]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleAuth();
      const user = result.user;
      console.log(user);
      const saveUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      const data = await axiosPost("/api/users", saveUser);
      if (data) {
        const { result, token } = data;
        await dispatch(login({ user: result, token }));
        console.log(data);
        const from = location.state?.from?.pathname || "/profile";
        navigate(from, { replace: true });
        toast.success("Successfully logged in.");
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen my-20 flex flex-col gap-5 items-center">
      <h2 className="section-title">You are not signed in.</h2>
      <button
        onClick={handleGoogleSignIn}
        className="bg-gray-900 text-white h-12 w-72 hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
      >
        <span>
          <FcGoogle />
        </span>{" "}
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
