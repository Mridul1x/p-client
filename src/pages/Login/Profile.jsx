import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import Overlay from "../../component/Overlay";
import Aos from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/userSlice";

const Profile = () => {
  const { logout, loading } = useContext(AuthContext);
  const userStore = useSelector((state) => state.user?.user);
  console.log(userStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init();
    if (!userStore) {
      navigate("/login");
    }
  }, [navigate, userStore]);

  const handleLogOut = () => {
    logout()
      .then(() => {
        dispatch(signout());
        navigate("/login");
        toast.success("Successfully logged out.");
        // Navigate to the login page after successful logout
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <Overlay />;
  }

  return (
    <div className="min-h-screen my-20 flex flex-col gap-5 items-center">
      {userStore && (
        <>
          <img
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1000"
            src={userStore.photoURL}
            width={500}
            height={500}
            alt={userStore.photoURL}
            className="h-32 w-32 rounded-full border-2 border-gray-900"
          />
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="section-title text-center"
          >
            Welcome, {userStore.name}!
          </h2>
          <button
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            onClick={handleLogOut}
            className="bg-gray-900 text-white h-12 w-72 hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
          >
            <span>
              <FiLogOut />
            </span>
            Sign out
          </button>
          <Link
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
            to="/"
            className="mt-5 inline-block bg-transparent border  border-black text-black py-2 px-4 hover:bg-rose-900  transition-colors duration-300 font-serif "
          >
            Back to Home
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
