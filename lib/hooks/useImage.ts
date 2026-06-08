import { useState, useEffect } from "react";
import { getImage } from "@/lib/imageStore";

export function useImage(url?: string) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setObjectUrl(null);
      return;
    }

    let active = true;
    let createdUrl: string | null = null;

    if (url.startsWith("idb://")) {
      const id = url.replace("idb://", "");
      
      getImage(id).then((blob) => {
        if (active && blob) {
          createdUrl = URL.createObjectURL(blob);
          setObjectUrl(createdUrl);
        }
      }).catch(console.error);
    } else {
      setObjectUrl(url);
    }

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [url]);

  return objectUrl;
}
