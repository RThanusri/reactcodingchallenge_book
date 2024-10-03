import { Route, Routes } from "react-router-dom";
import AllBookCard from "./AllBookCard";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";
import GetBook from "./GetBook";

import HomePage from "../Home/HomePage";

const SRoutes = () => {
  return (
    <Routes>
      <Route path="/AllBookCard" element={<AllBookCard />} />
      <Route path="/AddBook" element={<AddBook/>}/>
      <Route path ="/UpdateBook" element={<UpdateBook/>}/>
      <Route path="/DeleteBook" element={<DeleteBook/>}/>
      <Route path="/GetBook" element={<GetBook/>}/>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  );
};

export default SRoutes;
