import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border rounded-lg border-primary">
        <div className="flex flex-col gap-4 justify-center bg-gray-100 p-10">
          <button onClick={() => window.location.assign("/api/auth/google/login")} className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FaGoogle className="mr-3" />
            <span>Login with Google</span>
          </button>
          <button onClick={() => window.location.assign("/api/auth/x/login")} className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FaTwitter className="mr-3" />
            <span>Login with Twitter</span>
          </button>

          <button onClick={() => window.location.assign("/api/auth/facebook/login")} className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FaFacebook className="mr-3" />
            <span>Login with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;