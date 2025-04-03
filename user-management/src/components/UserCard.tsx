import React from "react";
import { User, ThemeMode } from "../types";

interface UserCardProps {
  user: User;
  onDelete: () => void;
  onEdit: () => void;
  theme: ThemeMode;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onDelete,
  onEdit,
  theme,
}) => {
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-700" : "bg-white"
      } rounded-lg shadow p-6`}
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
          {user.initials}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } text-sm`}
          >
            Email: {user.email}
          </p>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } text-sm`}
          >
            Status:{" "}
            <span
              className={
                user.status === "active" ? "text-green-500" : "text-red-500"
              }
            >
              {user.status}
            </span>
          </p>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } text-sm`}
          >
            Date of Birth: {formatDate(user.dateOfBirth)}
          </p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

export default UserCard;
