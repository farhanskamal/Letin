import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostsProvider } from "@/context/PostsContext";
import { BookmarksProvider } from "@/context/BookmarksContext";
import { VerifiedUsersProvider } from "@/context/VerifiedUsersContext";
import { AppShell } from "@/components/AppShell";
import BoardPage from "@/pages/BoardPage";
import PostDetailPage from "@/pages/PostDetailPage";
import AdminPage from "@/pages/AdminPage";
import SubmitPage from "@/pages/SubmitPage";
import MissionPage from "@/pages/MissionPage";
import ImpactPage from "@/pages/ImpactPage";

export default function App() {
  return (
    <VerifiedUsersProvider>
      <PostsProvider>
        <BookmarksProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AppShell>
              <Routes>
                <Route path="/" element={<BoardPage />} />
                <Route path="/mission" element={<MissionPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                <Route path="/submit" element={<SubmitPage />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </BookmarksProvider>
      </PostsProvider>
    </VerifiedUsersProvider>
  );
}
