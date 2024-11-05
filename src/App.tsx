import { lazy, Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const Demo = lazy(() => import('./pages/Demo'));

  return (
    <Suspense fallback={<div>loading</div>}>
      <div className="container-fluid appBox">
        <Routes>
          <Route path="/demo" element={<Demo />} />
          <Route path="/" element={<Navigate to="demo" />} />
          <Route
            path="*"
            element={<div className="not-found">not found</div>}
          />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
