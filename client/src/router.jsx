import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostProblem from "./pages/PostProblem";
import RootLayout from "./layouts/RootLayout";
import ProblemPage from "./pages/Problem";
import SolutionPage from "./pages/Solution";
import AddSolutionPage from "./pages/AddSolution";
import Register from "./pages/Register";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="problem/post" element={<PostProblem />} />
      <Route path="problems" element={<ProblemPage />} />
      <Route path="problem/:problemId" element={<SolutionPage />} />
      <Route path="add-solution/:problemId" element={<AddSolutionPage />} />
    </Route>
  )
);
