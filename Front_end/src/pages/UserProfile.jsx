import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Avatar2 from "../images/avatar2.jpg";
import { FaCheck } from "react-icons/fa6";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className="flex justify-center items-center bg-gray-100 py-4">
      <div className="w-full max-w-md p-8 ">
        <div className="flex justify-center mb-4">
          <Link
            to={`/myposts/asdfs`}
            className="inline-block px-4 py-2 bg-white rounded-md shadow-md font-semibold "
          >
            {" "}
            My posts
          </Link>
        </div>
        <div>
          <div>
            <div>
              <img
                src={avatar}
                alt=""
                className="w-48 h-48 rounded-full shadow-md object-cover border-8 border-white mx-auto"
              />
            </div>
            <form className="relative">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png,jpg,jpeg"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-16 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300"
              >
                <FaEdit />
              </label>
              <button className="absolute bottom-0 right-16 bg-green-500 text-white p-2 rounded-full cursor-pointer">
                <FaCheck />
              </button>
            </form>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center">
            Blogger
          </h1>

          <form className="space-y-4">
            <p className="inline-block mt-4 bg-red-500 w-full rounded-md p-2 text-white shadow-md text-center">
              This is an error message
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passowrd
              </label>
              <input
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New password
              </label>
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm your password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="inline-block px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300"
            >
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
