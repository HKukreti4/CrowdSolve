import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostProblem from "./pages/PostProblem";
import ProblemPage from "./pages/Problem";
import SolutionPage from "./pages/Solution";
import AddSolutionPage from "./pages/AddSolution";
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Routes with header/footer */}
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<Home />} />
        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="problem/post" element={<PostProblem />} />
          <Route path="problems" element={<ProblemPage />} />
          <Route path="problem/:problemId" element={<SolutionPage />} />
          <Route path="add-solution/:problemId" element={<AddSolutionPage />} />
        </Route>
      </Route>
    </>
  )
);
