import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from 'src/routes/sign-in';
import { Toaster } from 'src/components/ui/sonner';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/sign-in" element={<SignIn />} />
        </Routes>
      </Router>

      <Toaster richColors closeButton />
    </>
  );
}

export default App;
