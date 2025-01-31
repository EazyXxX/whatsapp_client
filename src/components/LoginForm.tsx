import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  setInitialInstanceSettings,
  validateCredentials,
} from "../api/greenApi";
import { Loader2 } from "lucide-react";

export const LoginForm: React.FC = () => {
  const [idInstance, setidInstance] = useState("");
  const [apiTokenInstance, setapiTokenInstance] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    setIdInstance: setStoreidInstance,
    setApiTokenInstance: setStoreapiTokenInstance,
    setIsAuthenticated,
  } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const isValid = await validateCredentials(idInstance, apiTokenInstance);

      if (isValid) {
        setStoreidInstance(idInstance);
        setStoreapiTokenInstance(apiTokenInstance);
        setIsAuthenticated(true);
        setInitialInstanceSettings(idInstance, apiTokenInstance);
      } else {
        setError(
          "Invalid credentials. Please check your idInstance and apiTokenInstance"
        );
      }
    } catch {
      setError(
        "An error occurred while verifying the credentials. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          WhatsApp Web Client
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="idInstance"
              className="block text-sm font-medium text-gray-700"
            >
              idInstance
            </label>
            <input
              type="text"
              id="idInstance"
              value={idInstance}
              onChange={(e) => setidInstance(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apiTokenInstance"
              className="block text-sm font-medium text-gray-700"
            >
              apiTokenInstance
            </label>
            <input
              type="password"
              id="apiTokenInstance"
              value={apiTokenInstance}
              onChange={(e) => setapiTokenInstance(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Проверка...
              </>
            ) : (
              "Войти"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
