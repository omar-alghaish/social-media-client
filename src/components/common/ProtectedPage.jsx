import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {}, [user, dispatch]);

  return user ? children : null;
};

export default ProtectedPage;
