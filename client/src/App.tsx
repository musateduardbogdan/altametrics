import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser } from 'src/controllers/users.controller';
import { setUser } from 'src/store/slices/auth.slice';
import { Toaster } from 'src/components/ui/sonner';
import { Layout } from 'src/routes/layout';
import { Home } from 'src/routes/home';
import { Invoices } from 'src/routes/invoices/invoices';
import { Invoice } from 'src/routes/invoices/invoice';
import { AuthLayout } from 'src/routes/auth/auth-layout';
import { SignIn } from 'src/routes/auth/sign-in';
import { SignUp } from 'src/routes/auth/sign-up';

function App() {
  const dispatch = useDispatch();

  const { data, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, [dispatch, data, isSuccess]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/:id" element={<Invoice />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
          </Route>
        </Routes>
      </Router>

      <Toaster richColors closeButton />
    </>
  );
}

export default App;
