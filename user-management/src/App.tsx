import React, { useState, useEffect } from "react";
import UserCard from "./components/UserCard";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserForm from "./components/UserForm";
import { User, UserStatus, ThemeMode } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      dateOfBirth: "1990-05-15",
      initials: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "locked",
      dateOfBirth: "1988-10-22",
      initials: "JS",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "active",
      dateOfBirth: "1995-02-10",
      initials: "AJ",
    },
    {
      id: 4,
      name: "Bob",
      email: "bob.martin@example.com",
      status: "locked",
      dateOfBirth: "1980-08-05",
      initials: "B",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      status: "active",
      dateOfBirth: "1992-03-12",
      initials: "CB",
    },
    {
      id: 6,
      name: "David Lee",
      email: "david.lee@example.com",
      status: "active",
      dateOfBirth: "1985-11-18",
      initials: "DL",
    },
    {
      id: 7,
      name: "Eve",
      email: "eve.green@example.com",
      status: "locked",
      dateOfBirth: "1991-07-30",
      initials: "E",
    },
    {
      id: 8,
      name: "Frank White",
      email: "frank.white@example.com",
      status: "active",
      dateOfBirth: "1993-04-25",
      initials: "FW",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeMode>("light");

  // Apply theme to body element
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  const handleDelete = (userId: number): void => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleCreateUser = (): void => {
    setEditingUser(null);
    setIsUserFormOpen(true);
  };

  const handleEditUser = (user: User): void => {
    setEditingUser(user);
    setIsUserFormOpen(true);
  };

  const handleSaveUser = (user: User): void => {
    if (user.id) {
      // Edit existing user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Create new user
      const newUser = {
        ...user,
        id: Math.max(...users.map((u) => u.id), 0) + 1,
      };
      setUsers([...users, newUser]);
    }
    setIsUserFormOpen(false);
    setEditingUser(null);
  };

  const handleCancelUserForm = (): void => {
    setIsUserFormOpen(false);
    setEditingUser(null);
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
  };

  const handleLogin = (): void => {
    setIsLoggedIn(true);
  };

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
        }`}
      >
        <div
          className={`p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <p className="mb-6">You have been logged out.</p>
          <button
            onClick={handleLogin}
            className="w-full bg-[#3251D0] text-white py-2 rounded hover:bg-[#3251D0] transition duration-200"
          >
            Log Back In
          </button>
          <button
            onClick={toggleTheme}
            className={`mt-4 w-full py-2 rounded transition duration-200 ${
              theme === "dark"
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50"
      }`}
    >
      <Header
        onCreateUser={handleCreateUser}
        onLogout={handleLogout}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <main className="container mx-auto px-4 py-4 sm:py-6">
        <SearchBar onSearch={handleSearch} theme={theme} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={() => handleDelete(user.id)}
                onEdit={() => handleEditUser(user)}
                theme={theme}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">
                No users found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {isUserFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <UserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={handleCancelUserForm}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}

export default App;
