import { useEffect, useState, useRef } from "react";
import type { Post, PostCategory } from "@/lib/types";
import { storeImage } from "@/lib/imageStore";
import { useImage } from "@/lib/hooks/useImage";
import { generatePostId } from "@/lib/utils";
import { RichTextEditor } from "@/components/RichTextEditor";
import { geocodeAddress } from "@/lib/geocoding";

type AdminPostFormProps = {
  initialData?: Post;
  onSubmit: (data: Omit<Post, "id" | "postedAt">) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

type FormData = {
  title: string;
  description: string;
  category: PostCategory | "";
  tags: string;
  deadline: string;
  link: string;
  pinned: boolean;
  postedBy: string;
  imageUrl: string;
  imageType: "thumbnail" | "poster";
  locationName: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const CATEGORIES: PostCategory[] = [
  "opportunity",
  "event",
  "deadline",
  "resource",
  "announcement",
];

const EMPTY_FORM: FormData = {
  title: "",
  description: "",
  category: "",
  tags: "",
  deadline: "",
  link: "",
  pinned: false,
  postedBy: "Admin",
  imageUrl: "",
  imageType: "poster",
  locationName: "",
};

function toFormData(post?: Post): FormData {
  if (!post) return EMPTY_FORM;
  return {
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags.join(", "),
    deadline: post.deadline ? post.deadline.slice(0, 16) : "",
    link: post.link ?? "",
    pinned: post.pinned,
    postedBy: post.postedBy,
    imageUrl: post.imageUrl ?? "",
    imageType: post.imageType ?? "poster",
    locationName: post.locationName ?? "",
  };
}

export function AdminPostForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Create Post",
}: AdminPostFormProps) {
  const [form, setForm] = useState<FormData>(() => toFormData(initialData));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const previewUrl = useImage(form.imageUrl);

  useEffect(() => {
    setForm(toFormData(initialData));
    setErrors({});
  }, [initialData]);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.category) next.category = "Category is required";
    if (!form.postedBy.trim()) next.postedBy = "Posted by is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsUploading(true);
    let coordinates: [number, number] | undefined = undefined;
    
    if (form.locationName.trim()) {
      const result = await geocodeAddress(form.locationName.trim());
      if (result) coordinates = result;
    }

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category as PostCategory,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined,
      link: form.link.trim() || undefined,
      pinned: form.pinned,
      postedBy: form.postedBy.trim(),
      imageUrl: form.imageUrl.trim() || undefined,
      imageType: form.imageUrl ? form.imageType : undefined,
      locationName: form.locationName.trim() || undefined,
      coordinates,
    });

    setIsUploading(false);

    if (!initialData) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const id = generatePostId();
      const url = await storeImage(id, file);
      update("imageUrl", url);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:ring-red-200"
        : "border-gray-200 bg-white focus:ring-gray-200"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image Upload Area */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Post Image (Optional)
        </label>
        
        {previewUrl ? (
          <div className="mb-4 space-y-3">
            <div className="relative inline-block">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-48 rounded-lg object-contain bg-gray-200"
              />
              <button
                type="button"
                onClick={() => update("imageUrl", "")}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Display as:</label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="imageType"
                  value="poster"
                  checked={form.imageType === "poster"}
                  onChange={() => update("imageType", "poster")}
                  className="text-gray-900 focus:ring-gray-900"
                />
                Full Poster
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="imageType"
                  value="thumbnail"
                  checked={form.imageType === "thumbnail"}
                  onChange={() => update("imageType", "thumbnail")}
                  className="text-gray-900 focus:ring-gray-900"
                />
                Thumbnail
              </label>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
            <span className="mx-3 text-sm text-gray-500">or</span>
            <input
              type="url"
              placeholder="Paste image URL..."
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputClass("title")}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={form.description}
          onChange={(val) => update("description", val)}
          error={!!errors.description}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass("category")}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Posted By <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.postedBy}
            onChange={(e) => update("postedBy", e.target.value)}
            className={inputClass("postedBy")}
          />
          {errors.postedBy && (
            <p className="mt-1 text-xs text-red-500">{errors.postedBy}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          placeholder="internship, paid, NYC"
          className={inputClass("tags")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="datetime-local"
            value={form.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            className={inputClass("deadline")}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={form.locationName}
            onChange={(e) => update("locationName", e.target.value)}
            placeholder="e.g. Times Square, NY or Online"
            className={inputClass("locationName" as any)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            External Link
          </label>
          <input
            type="url"
            value={form.link}
            onChange={(e) => update("link", e.target.value)}
            placeholder="https://example.com"
            className={inputClass("link")}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.pinned}
          onChange={(e) => update("pinned", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Pin this post to the top of the board
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isUploading}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {isUploading ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 ring-1 ring-gray-200 transition-colors hover:bg-board-paper"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
