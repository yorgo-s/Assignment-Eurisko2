import React, { useState, useEffect } from "react";
import { User, UserStatus, ThemeMode } from "../types";

interface UserFormProps {
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
  theme: ThemeMode;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  onSave,
  onCancel,
  theme,
}) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    status: "active" as UserStatus,
    dateOfBirth: "",
    initials: "",
  });

  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate initials automatically when name changes
    if (name === "name") {
      const nameParts = value.split(" ");
      const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
      setFormData((prev) => ({
        ...prev,
        initials: initials.substring(0, 2), // Limit to 2 characters
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError("Valid email is required");
      return;
    }

    if (!formData.dateOfBirth) {
      setFormError("Date of birth is required");
      return;
    }

    // Clear any previous errors
    setFormError("");

    // Save the user
    onSave({
      ...formData,
      id: user?.id || 0,
    });
  };

  return (
    <div
      className={`rounded-lg shadow-lg p-6 w-full max-w-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        {user ? "Edit User" : "Create New User"}
      </h2>

      {formError && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="dateOfBirth"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="initials">
            Initials (auto-generated)
          </label>
          <input
            type="text"
            id="initials"
            name="initials"
            value={formData.initials}
            readOnly
            className={`w-full p-2 border rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            } opacity-75`}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
