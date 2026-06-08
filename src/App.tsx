import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostsProvider } from "@/context/PostsContext";
import { BookmarksProvider } from "@/context/BookmarksContext";
import { VerifiedUsersProvider } from "@/context/VerifiedUsersContext";
import BoardPage from "@/pages/BoardPage";
import PostDetailPage from "@/pages/PostDetailPage";
import AdminPage from "@/pages/AdminPage";
import SubmitPage from "@/pages/SubmitPage";

export default function App() {
  return (
    <VerifiedUsersProvider>
      <PostsProvider>
        <BookmarksProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<BoardPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
        </BookmarksProvider>
      </PostsProvider>
    </VerifiedUsersProvider>
  );
}
