import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
