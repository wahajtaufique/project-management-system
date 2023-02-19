import Register from "../scenes/register";
import Login from "../scenes/login";
import Dashboard from "../scenes/dashboard";
import AddProject from "../scenes/add";
import Archived from "../scenes/archived";
import Completed from "../scenes/completed";
import InProgress from "../scenes/inprogress";

const userRoutes = [
  {path: "/", component: Dashboard},
  {path: "/completed", component: Completed},
  {path: "/archived", component: Archived},
  {path: "/in-progress", component: InProgress},
  {path: "/add", component: AddProject}
];

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
]

export { userRoutes, authRoutes }