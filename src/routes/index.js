import routes from "../constants/routes"
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from "../pages/SignUp"
import NotLayout from '../layouts/NotLayout'

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.login, component: Login, layout: NotLayout },
    { path: routes.signup, component: SignUp, layout: NotLayout },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }