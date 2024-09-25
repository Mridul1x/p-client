import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import Overlay from "../../component/Overlay";
import Aos from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signout, updateUser } from "../../store/userSlice";
import { axiosPost } from "../../lib/axiosPost";
import { axiosPut } from "../../lib/axiosPut";

const Profile = () => {
  const { logout, updateUserProfile, loading } = useContext(AuthContext);
  const userStore = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // For loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [photoURL, setPhotoURL] = useState("");

  // Initialize the display name without immediate changes
  useEffect(() => {
    if (userStore) {
      setDisplayName(userStore.name);
      setPhotoURL(userStore.photoURL);
    }
  }, [userStore]);

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
      })
      .catch((error) => console.log(error));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // Set loading state
    let updatedPhotoURL = userStore?.photoURL;

    if (photo) {
      const formData = new FormData();
      formData.append("image", photo);

      try {
        const response = await axiosPost(
          "/api/users/upload",
          formData,
          token,
          true
        );
        updatedPhotoURL = response.photoURL;

        const updatedUser = {
          ...userStore,
          name: displayName,
          photoURL: updatedPhotoURL,
        };
        const result = await axiosPut(
          `/api/users/${userStore._id}`,
          updatedUser,
          token
        );

        dispatch(updateUser({ name: result.name, photoURL: result.photoURL }));

        toast.success("Profile updated successfully.");
      } catch (error) {
        console.error("Failed to upload image", error);
        toast.error("Failed to update profile.");
      }
    } else {
      try {
        await updateUserProfile(displayName, updatedPhotoURL);

        const updatedUser = { ...userStore, name: displayName };
        dispatch(updateUser(updatedUser));

        await axiosPut(`/api/users/${userStore._id}`, updatedUser, token);

        toast.success("Profile updated successfully.");
      } catch (error) {
        console.error("Failed to update profile", error);
        toast.error("Failed to update profile.");
      }
    }
    setIsUpdating(false); // End loading state
  };

  if (loading) {
    return <Overlay />; // Custom loading component
  }

  return (
    <div className="min-h-screen my-20 flex flex-col gap-5 items-center mx-5 md:mx-0">
      <div className="card bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex flex-col items-center">
          {photoURL ? (
            <img
              data-aos="fade-up"
              data-aos-duration="1000"
              src={photoURL}
              alt="Profile"
              className="h-32 w-32 object-cover rounded-full border-2 border-gray-900"
            />
          ) : (
            ""
          )}
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="text-xl font-semibold mt-4"
          >
            Welcome, {userStore.name} {/* Keep original name while typing */}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            className="text-gray-700"
          >
            Email: {userStore.email}
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
            className="text-gray-700"
          >
            Joined: {new Date(userStore.createdAt).toLocaleDateString()}
          </p>
        </div>

        <form onSubmit={handleProfileUpdate} className="mt-6">
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              id="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white h-12 w-full hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
          >
            {isUpdating ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
        <button
          onClick={handleLogOut}
          className="bg-gray-900 text-white h-12 w-full hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase mt-4"
        >
          <FiLogOut /> Sign out
        </button>
        <Link
          to="/"
          className="mt-5  bg-transparent border border-black text-black py-2 px-4 hover:bg-rose-900 transition-colors duration-300 font-serif flex items-center justify-center "
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
