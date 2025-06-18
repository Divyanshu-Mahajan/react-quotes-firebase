import { Route, Routes,Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes";
import QuoteDetail from "./components/pages/QuoteDetail";
import NotFound from "./components/pages/NotFound";
import NewQuotes from "./components/pages/NewQuotes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/quotes"/>}/>
        <Route path="/quotes" element={<AllQuotes />}/>
        <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}/>
        <Route path="/new-quotes" element={<NewQuotes />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <ToastContainer position="top-center" />
    </Layout>
  );
}

export default App;
