import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";

const posts = [
  {
    id: 1,
    caption: "Morning glow routine with La Roche-Posay 🌅",
    hashtag: "#AsperGlow",
    gradient: "from-rose-200 via-amber-100 to-sky-100",
  },
  {
    id: 2,
    caption: "Pharmacist-approved sunscreen picks for summer ☀️",
    hashtag: "#SanctuaryOfScience",
    gradient: "from-amber-100 via-yellow-50 to-orange-100",
  },
  {
    id: 3,
    caption: "Hydration heroes: CeraVe vs Vichy deep dive 💧",
    hashtag: "#AsperReviews",
    gradient: "from-blue-100 via-cyan-50 to-teal-100",
  },
  {
    id: 4,
    caption: "Pregnancy-safe skincare essentials 🤰",
    hashtag: "#SafeBeauty",
    gradient: "from-green-100 via-emerald-50 to-lime-100",
  },
  {
    id: 5,
    caption: "Behind the scenes: how we vet every product 🔬",
    hashtag: "#PharmacistLed",
    gradient: "from-purple-100 via-violet-50 to-fuchsia-100",
  },
  {
    id: 6,
    caption: "Customer spotlight: Sara's acne journey ✨",
    hashtag: "#AsperStories",
    gradient: "from-pink-100 via-rose-50 to-red-100",
  },
];

export default function SocialGallery() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-accent text-accent font-body text-xs tracking-[0.2em] px-4 py-1.5"
          >
            <Instagram className="h-3 w-3 mr-2" />
            COMMUNITY
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            The <span className="text-primary">Inner Circle</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Real stories, expert tips, and curated routines from our community.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Placeholder gradient — replace with real images when available */}
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-3">
                  <p className="text-card font-body text-xs leading-relaxed mb-1">
                    {post.caption}
                  </p>
                  <span className="text-accent text-[10px] font-body font-semibold">
                    {post.hashtag}
                  </span>
                </div>
              </div>

              {/* Instagram icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="h-3.5 w-3.5 text-card" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-accent transition-colors"
          >
            <Instagram className="h-4 w-4" />
            Follow @AsperBeauty
          </a>
        </div>
      </div>
    </section>
  );
}
