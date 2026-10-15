import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageIntro, useCart } from "@/components/fitzone/site";
import { products, meta, type Product } from "@/lib/fitness-data";
export const Route = createFileRoute("/products")({
  head: () =>
    meta(
      "Training Essentials",
      "Explore FitZone training essentials, from dumbbells and yoga mats to performance apparel and fitness accessories.",
    ),
  component: Products,
});
function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Essentials");
  const [sort, setSort] = useState("popular");
  const [selected, setSelected] = useState<Product | null>(null);
  const { add } = useCart();
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "All Essentials" || p.category === category) &&
            `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : b.popularity - a.popularity,
        ),
    [search, category, sort],
  );
  return (
    <main>
      <PageIntro
        eyebrow="THE FITZONE EDIT"
        title="Good gear. Great beginnings."
        description="Thoughtfully chosen essentials for your training, your recovery, and everything in between."
      />
      <section className="section">
        <div className="container-page">
          <div className="product-toolbar">
            <div className="search-field">
              <Search />
              <input
                type="search"
                aria-label="Search products"
                placeholder="Find your next training essential…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Sort by popularity</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
          <div className="filter-row">
            {["All Essentials", "Equipment", "Yoga & Recovery", "Apparel", "Accessories"].map(
              (item) => (
                <Button
                  variant={category === item ? "sage" : "ghost"}
                  size="sm"
                  key={item}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ),
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-5" role="status">
            {filtered.length} essentials
          </p>
          <div className="product-grid">
            {filtered.map((product) => (
              <article className="product-card" key={product.id}>
                <img
                  src={product.image}
                  width={600}
                  height={480}
                  alt={product.name}
                  loading="lazy"
                />
                <div className="product-info">
                  <span className="eyebrow">{product.category}</span>
                  <h3 className="mt-2">{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">
                    <strong>${product.price.toFixed(2)}</strong>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star size={12} className="text-primary" fill="currentColor" />
                      {product.rating}
                    </span>
                  </div>
                  <div className="product-actions">
                    <Button
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => setSelected(product)}
                    >
                      View Details
                    </Button>
                    <Button className="flex-1 text-xs" onClick={() => add(product)}>
                      <ShoppingBag />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto mb-4 text-muted-foreground" size={32} />
              <h2 className="text-xl">No essentials found.</h2>
              <p className="text-muted-foreground mt-3">
                Try another search or explore a different category.
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => {
                  setSearch("");
                  setCategory("All Essentials");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
          <p className="demo-note text-center mt-8">
            Demo store · Illustrative products, ratings, and USD prices. Payments and shipping are
            not connected.
          </p>
        </div>
      </section>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="dialog-scroll">
          {selected && (
            <>
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-64 object-contain rounded-md bg-muted"
              />
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription>
                {selected.description} Part of the FitZone essentials collection. Product
                specifications, sizes, and availability will be confirmed by the club.
              </DialogDescription>
              <strong className="text-xl">${selected.price.toFixed(2)}</strong>
              <Button
                onClick={() => {
                  add(selected);
                  setSelected(null);
                }}
              >
                Add to Cart <ArrowRight />
              </Button>
              <p className="demo-note">Illustrative product. No purchase will be processed.</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
