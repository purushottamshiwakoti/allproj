"use client";

import { useDispatch, useSelector } from "react-redux";

export const GetFiles = () => {
  const filesData = useSelector((file: any) => file.storeFiles.users.users);
  const dispatch = useDispatch();
  console.log(filesData);
  return (
    <>
      <div>Get files</div>
      <button>Okay</button>
    </>
  );
};
