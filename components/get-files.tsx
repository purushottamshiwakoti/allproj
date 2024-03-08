"use client";

import { fetchUsers } from "@/redux/features/fileSlice";
import { useDispatch, useSelector } from "react-redux";

export const GetFiles = () => {
  const filesData = useSelector((file: any) => file.storeFiles.users.users);
  const dispatch = useDispatch();
  console.log(filesData);
  return (
    <>
      <div>Get files</div>
      <button onClick={() => dispatch(fetchUsers())}>Okay</button>
    </>
  );
};
