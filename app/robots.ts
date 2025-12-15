import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/config/", "/_next/", "3dModelDebug"],
    },
    sitemap: "https://baraproject.site/sitemap.xml",
  };
}
