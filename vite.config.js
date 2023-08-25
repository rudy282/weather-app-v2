import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/weather-app-v2/",
	plugins: [
		react(),
		VitePWA({
			manifest: {
				name: "weather-app",
				short_name: "weather-app",
				theme_color: "#fafafa",
				start_url: "/weather-app-v2/",
				background_color: "#fafafa",
				categories: ["weather"],
				description:
					"Weather-app, experience weather like never before, created for everyone from simple users to professionals.",
				display: "standalone",
				icons: [
					{
						src: "icon192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icon512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
});
