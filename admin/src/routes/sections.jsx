import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const DashboardPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const AddBlogPage = lazy(() => import('src/pages/addBlog'));
export const EditBlogPage = lazy(() => import('src/pages/editBlog'));

export const UserPage = lazy(() => import('src/pages/user'));
export const AddUserPage = lazy(() => import('src/pages/addUser'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const EditProductPage = lazy(() => import('src/pages/editProduct'));
export const AddProductPage = lazy(() => import('src/pages/addProduct'));

export const DogsPage = lazy(() => import('src/pages/dogs'));
export const AddDogPage = lazy(() => import('src/pages/addDog'));
export const EditDogPage = lazy(() => import('src/pages/editDog'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { path: '/', element: <LoginPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'addUser', element: <AddUserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'addProduct', element: <AddProductPage /> },
        { path: 'editProduct/:_id', element: <EditProductPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addBlog', element: <AddBlogPage /> },
        { path: 'editBlog/:_id', element: <EditBlogPage /> },
        { path: 'dogs', element: <DogsPage /> },
        { path: 'addDog', element: <AddDogPage /> },
        { path: 'editDog/:_id', element: <EditDogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
