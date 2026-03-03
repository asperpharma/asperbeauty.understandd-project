import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { CampaignHero } from "@/components/home/CampaignHero";
import { ProductSlider } from "@/components/home/ProductSlider";
import { EditorialSpotlight } from "@/components/home/EditorialSpotlight";
import { BrandOfTheWeek } from "@/components/home/BrandOfTheWeek";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { USPBar } from "@/components/home/USPBar";
import { NPSSurvey } from "@/components/home/NPSSurvey";
import BrandStory from "@/components/home/BrandStory";
import CelestialFeaturedCollection from "@/components/CelestialFeaturedCollection";
import { Footer } from "@/components/Footer";
import { PageLoadingSkeleton } from "@/components/PageLoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load below-the-fold components for better initial load performance
const FeaturedBrands = lazy(() =>
  import("@/components/FeaturedBrands").then((m) => ({
    default: m.FeaturedBrands,
  }))
);
const Testimonials = lazy(() =>
  import("@/components/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Newsletter = lazy(() =>
  import("@/components/Newsletter").then((m) => ({ default: m.Newsletter }))
);
const TrustBanner = lazy(() =>
  import("@/components/TrustBanner").then((m) => ({ default: m.TrustBanner }))
);
const ScrollToTop = lazy(() =>
  import("@/components/ScrollToTop").then((m) => ({ default: m.ScrollToTop }))
);
const FloatingSocials = lazy(() =>
  import("@/components/FloatingSocials").then((m) => ({
    default: m.FloatingSocials,
  }))
);

// Lightweight skeleton for lazy sections
const SectionSkeleton = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-asper-stone animate-pulse`}>
    <div className="luxury-container py-12">
      <Skeleton className="h-8 w-48 mx-auto mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch new arrivals
  const { data: newArrivals = [] } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      return (data || []).map((p) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price ?? 0,
        image_url: p.image_url || "/placeholder.svg",
        category: p.primary_concern,
        tags: p.is_available_in_jordan === false ? ["Not available in your country"] : [],
        is_new: true,
      }));
    },
  });

  // Fetch bestsellers
  const { data: bestsellers = [] } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(8);

      if (error) throw error;
      return (data || []).map((p) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price ?? 0,
        image_url: p.image_url || "/placeholder.svg",
        category: p.primary_concern,
        is_on_sale: false,
      }));
    },
  });

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <main>
        {/* 1. Campaign Hero - "Wonder Women Edit" Style */}
        <CampaignHero
          badge="Special Edition"
          badgeAr="إصدار خاص"
          campaignTitle="WONDER WOMEN EDIT"
          campaignTitleAr="إصدار النساء المبدعات"
          subtitle="Female Founders"
          subtitleAr="المؤسسات الإناث"
          description="Celebrating the women behind iconic beauty brands like Phlur and Mirror Water. Discover their stories and shop their revolutionary products."
          descriptionAr="احتفالاً بالنساء وراء علامات الجمال الأيقونية مثل Phlur و Mirror Water. اكتشف قصصهن وتسوق منتجاتهن الثورية."
          imageUrl="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600"
          ctaText="Shop Now"
          ctaTextAr="تسوقي الآن"
          ctaLink="/shop"
        />

        {/* 2. Product Discovery - Just Landed! What's New */}
        {newArrivals.length > 0 && (
          <ProductSlider
            title="Just Landed! What's New"
            titleAr="وصل حديثاً! ما الجديد"
            subtitle="New Arrivals"
            subtitleAr="المنتجات الجديدة"
            products={newArrivals}
            ctaText="View All New Arrivals"
            ctaLink="/shop"
          />
        )}

        {/* 3. USP Bar - Trust Signals */}
        <USPBar />

        {/* 4. Editorial Spotlight - "WANTED!" Section */}
        <EditorialSpotlight
          badge="WANTED!"
          badgeAr="مطلوب!"
          title="Hydration Heroes"
          titleAr="أبطال الترطيب"
          description="Discover the power trio from Augustinus Bader. These revolutionary products work together to deliver intense hydration and restore your skin's natural glow. Pharmacist-approved for all skin types."
          descriptionAr="اكتشف الثلاثي القوي من Augustinus Bader. تعمل هذه المنتجات الثورية معًا لتوفير ترطيب مكثف واستعادة التوهج الطبيعي لبشرتك. معتمد من الصيادلة لجميع أنواع البشرة."
          imageUrl="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800"
          ctaText="Discover Now"
          ctaTextAr="اكتشف الآن"
          ctaLink="/brands"
          imagePosition="left"
        />

        {/* 5. Product Discovery - Bestsellers / Niche Approved */}
        {bestsellers.length > 0 && (
          <ProductSlider
            title="Bestsellers / Niche Approved"
            titleAr="الأكثر مبيعاً / معتمد من المتخصصين"
            subtitle="Top Performers"
            subtitleAr="الأفضل أداءً"
            products={bestsellers}
            ctaText="Shop Bestsellers"
            ctaLink="/best-sellers"
          />
        )}

        {/* 6. Shop by Category Grid */}
        <ShopByCategory />

        {/* 7. Brand of the Week */}
        <BrandOfTheWeek
          brandName="Sitre"
          brandNameAr="سيتر"
          tagline="Modern-day sexiness"
          taglineAr="الإغراء العصري"
          description="Sitre redefines modern beauty with a philosophy rooted in confidence and self-expression. Each product is crafted to enhance your natural allure while celebrating your unique style."
          descriptionAr="سيتر تعيد تعريف الجمال الحديث بفلسفة متجذرة في الثقة والتعبير عن الذات. كل منتج مصمم لتعزيز جاذبيتك الطبيعية مع الاحتفال بأسلوبك الفريد."
          images={[
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
          ]}
          ctaLink="/brands"
        />

        {/* Featured Collection with Glass & Gold Cards */}
        <CelestialFeaturedCollection />

        {/* Brand Story Section */}
        <BrandStory />

        {/* Lazy-loaded below-the-fold sections */}
        <Suspense fallback={<SectionSkeleton height="h-32" />}>
          <FeaturedBrands />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <Testimonials />
        </Suspense>

        {/* 8. NPS Survey */}
        <NPSSurvey />

        {/* 9. Newsletter with "15% OFF FOR BEAUTY INSIDERS" */}
        <Suspense fallback={<SectionSkeleton height="h-48" />}>
          <Newsletter />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-24" />}>
          <TrustBanner />
        </Suspense>
      </main>
      <Footer />

      {/* Lazy-loaded floating components (BeautyAssistant is global in App) */}
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingSocials />
      </Suspense>
    </div>
  );
};

export default Index;
