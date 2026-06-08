import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import type { Post } from "@/lib/types";
import { CATEGORY_CONFIG } from "@/lib/utils";

// Fix missing marker icons in react-leaflet when using webpack/vite
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type MapViewProps = {
  posts: Post[];
};

export function MapView({ posts }: MapViewProps) {
  // Filter posts with coordinates
  const mappedPosts = posts.filter((p) => p.coordinates);

  // Default to a central US location if no posts
  const center: [number, number] =
    mappedPosts.length > 0 ? mappedPosts[0].coordinates! : [39.8283, -98.5795];

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card animate-fade-in-up relative z-0">
      <MapContainer
        center={center}
        zoom={mappedPosts.length > 0 ? 12 : 4}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        {/* Using a clean, light map theme (CartoDB Voyager) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {mappedPosts.map((post) => {
          const categoryColor = CATEGORY_CONFIG[post.category].hex;
          
          return (
            <Marker key={post.id} position={post.coordinates!}>
              <Popup>
                <div className="min-w-[200px] p-1">
                  <div
                    className="mb-2 h-1 w-full rounded-full"
                    style={{ backgroundColor: categoryColor }}
                  />
                  <h3 className="mb-1 font-display font-bold text-gray-900 m-0 leading-tight">
                    {post.title}
                  </h3>
                  <p className="mb-3 text-xs text-gray-500 m-0 mt-1">
                    {post.locationName}
                  </p>
                  <Link
                    to={`/post/${post.id}`}
                    className="block w-full rounded-lg bg-gray-900 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-gray-800 !text-white hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
