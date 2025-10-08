import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="pt-16 pb-16 text-center">
      <h2 className="text-2xl font-semibold mt-6">Profile</h2>
      {user && (
        <div className="mt-4">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <p className="mt-2 text-lg">{user.name}</p>
          <p className="text-sm text-gray-400">{user.phone}</p>
          <button
            onClick={logout}
            className="mt-4 bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;