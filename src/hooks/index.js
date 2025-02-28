import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnimals } from "../utils/api";

export function useValidateUser(redirect) {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserName(user);
      navigate(redirect);
    } else {
      navigate("/");
    }
  }, [navigate, redirect]);
  return userName;
}

export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    getAnimals()
      .then((data) => {
        setAnimals(data);
      })
      .catch((error) => {
        console.error("useAnimals", error);
      });
  }, []);

  return { animals };
}
