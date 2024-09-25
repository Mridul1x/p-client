import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";
import toast from "react-hot-toast";
import { axiosPost } from "../../lib/axiosPost";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing icons
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { createUser, userSignIn, resetPassword, googleAuth } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const userStore = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (userStore) {
      navigate("/profile");
    }
  }, [navigate, userStore?.result]);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password && !isForgotPassword)
      newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    try {
      let result;
      if (isForgotPassword) {
        await resetPassword(email);
        toast.success("Password reset link sent to your email.");
        setIsForgotPassword(false);
        return;
      }

      if (isSignUp) {
        result = await createUser(email, password);
        toast.success("Account created successfully.");
      } else {
        result = await userSignIn(email, password);
        toast.success("Logged in successfully.");
      }

      const user = result.user;
      const saveUser = {
        name: user.displayName || email.split("@")[0],
        email: user.email,
        photoURL: user.photoURL,
      };
      const data = await axiosPost("/api/users", saveUser);
      if (data) {
        const { result, token } = data;
        await dispatch(login({ user: result, token }));
        const from = location.state?.from?.pathname || "/profile";
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (isSignUp && error.code === "auth/email-already-in-use") {
        toast.error("Email already exists. Please log in.");
      } else if (!isSignUp) {
        toast.error("Failed to log in. Please check your credentials.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleAuth();
      const user = result.user;
      const saveUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL, // Save the photoURL
      };
      const data = await axiosPost("/api/users", saveUser);
      if (data) {
        const { result, token } = data;
        await dispatch(login({ user: result, token }));
        const from = location.state?.from?.pathname || "/profile";
        navigate(from, { replace: true });
        toast.success("Successfully logged in.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google.");
    }
  }, [googleAuth, location, navigate, dispatch]);
  return (
    <div className="min-h-screen my-20 flex flex-col gap-5 items-center">
      <h2 className="section-title">
        {isForgotPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Log In"}
      </h2>
      <button
        onClick={handleGoogleSignIn}
        className="bg-gray-900 text-white h-12 w-full  max-w-xs md:max-w-md hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
      >
        <span>
          <FcGoogle />
        </span>{" "}
        Sign in with Google
      </button>
      <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md">
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={`input input-bordered w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        {!isForgotPassword && (
          <div className="w-full">
            <div className="flex items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className={`input input-bordered w-full pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                className="absolute right-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
        )}
        <button
          onClick={handleAuth}
          className="bg-blue-600 text-white h-12  hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
        >
          {isForgotPassword
            ? "Reset Password"
            : isSignUp
            ? "Sign Up"
            : "Log In"}
        </button>
        {!isForgotPassword && (
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline"
          >
            {isSignUp
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </button>
        )}
        {!isSignUp && !isForgotPassword && (
          <button
            onClick={() => setIsForgotPassword(true)}
            className="text-blue-600 underline"
          >
            Forgot Password?
          </button>
        )}
        {isForgotPassword && (
          <button
            onClick={() => setIsForgotPassword(false)}
            className="text-blue-600 underline"
          >
            Remembered your password? Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialLogin;
