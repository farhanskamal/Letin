export type PostCategory =
  | "opportunity"
  | "event"
  | "deadline"
  | "resource"
  | "announcement";

export type Post = {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  tags: string[];
  deadline?: string;
  link?: string;
  pinned: boolean;
  postedAt: string;
  postedBy: string;
  imageUrl?: string;
  imageType?: "thumbnail" | "poster";
  locationName?: string;
  coordinates?: [number, number];
};

export type FilterCategory = PostCategory | "all";
