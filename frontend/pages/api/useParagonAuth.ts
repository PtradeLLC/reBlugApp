import { useEffect, useState } from "react";

async function getParagonUserToken(): Promise<string | null> {
  try {
    // Replace this with the logic that your app uses for
    // fetching the Paragon User Token.
    // For example, make an API request to your server to get the token.
    const response = await fetch("/api/auth/paragonToken");
    const data = await response.json();

    if (data.token) {
      return data.token;
    } else {
      throw new Error("Token not available");
    }
  } catch (error) {
    console.error("Error fetching Paragon User Token:", error);
    return null;
  }
}

// Define the Paragon interface
interface Paragon {
    getUser(): any; // Replace 'any' with the actual return type of getUser
    subscribe(eventName: string, listener: () => void): void;
    unsubscribe(eventName: string, listener: () => void): void;
    authenticate(projectId: string, token: string): Promise<void>;
    // Add other methods or properties as needed
  }

export default function useParagonAuth(paragon: Paragon) {
    const [token, setToken] = useState<string | null>(null); 
    const [user, setUser] = useState<any>();
    const [error, setError] = useState<string | undefined>();


useEffect(() => {
    getParagonUserToken()
      .then((token) => setToken(token))
      .catch(setError);
  }, []);
  

useEffect(() => {
    getParagonUserToken()
      .then((token) => setToken(() => token))  // Use a function that takes the current state
      .catch(setError);
  }, []);
  


  // Listen for account state changes
  useEffect(() => {
    const listener = () => {
      if (paragon) {
        setUser({ ...paragon.getUser() });
      }
    };
    paragon?.subscribe("onIntegrationInstall", listener);
    paragon?.subscribe("onIntegrationUninstall", listener);
    return () => {
      paragon?.unsubscribe("onIntegrationInstall", listener);
      paragon?.unsubscribe("onIntegrationUninstall", listener);
    };
  }, [paragon]);

  useEffect(() => {
    if (paragon && token && !error && process.env.PARAGON_PROJECT_ID) {
      paragon
        .authenticate(process.env.PARAGON_PROJECT_ID, token)
        .then(() => setUser(paragon.getUser()))
        .catch(setError);
    }
  }, [paragon, token, error]);
  

  return { user, error };
}
