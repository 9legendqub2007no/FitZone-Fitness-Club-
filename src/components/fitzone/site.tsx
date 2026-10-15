import { createContext, useContext, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  Dumbbell,
  Menu,
  X,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Product } from "@/lib/fitness-data";

type CartItem = { product: Product; quantity: number };
const CartContext = createContext<{
  items: CartItem[];
  add: (product: Product) => void;
  setOpen: (open: boolean) => void;
}>({ items: [], add: () => {}, setOpen: () => {} });
export const useCart = () => useContext(CartContext);
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="FitZone Fitness Club home">
      <span className="brand-mark">
        <Dumbbell size={25} strokeWidth={1.8} />
      </span>
      <span>
        <span className="brand-name">
          Fit<span>Zone</span>
        </span>
        <span className="brand-subtitle block">Fitness Club</span>
      </span>
    </Link>
  );
}
export function SiteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const add = (product: Product) => {
    setItems((previous) =>
      previous.some((item) => item.product.id === product.id)
        ? previous.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...previous, { product, quantity: 1 }],
    );
    setCheckout(false);
    setOpen(true);
  };
  const change = (id: number, amount: number) =>
    setItems((previous) =>
      previous
        .map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  return (
    <CartContext.Provider value={{ items, add, setOpen }}>
      <Header />
      {children}
      <Footer />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dialog-scroll">
          <DialogTitle>Your gym bag</DialogTitle>
          <DialogDescription>A few essentials for your next chapter.</DialogDescription>
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={36} />
              <p>Your bag is ready for a fresh start.</p>
              <Button className="mt-5" asChild onClick={() => setOpen(false)}>
                <Link to="/products">
                  Explore essentials <ArrowRight />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div>
                {items.map(({ product, quantity }) => (
                  <div className="cart-row" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="min-w-0">
                      <h3>{product.name}</h3>
                      <p>${product.price.toFixed(2)} each</p>
                      <div className="quantity">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Decrease ${product.name}`}
                          onClick={() => change(product.id, -1)}
                        >
                          <Minus size={12} />
                        </Button>
                        <span>{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Increase ${product.name}`}
                          onClick={() => change(product.id, 1)}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${product.name}`}
                      onClick={() =>
                        setItems((previous) =>
                          previous.filter((item) => item.product.id !== product.id),
                        )
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-semibold py-3">
                <span>Subtotal</span>
                <span>
                  $
                  {items
                    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <Button onClick={() => setCheckout(true)}>
                Continue to checkout <ArrowRight />
              </Button>
              {checkout && (
                <p role="status" className="success-note text-sm">
                  This is a demo shop. Checkout and payments are not connected; no order has been
                  placed.
                </p>
              )}
              <p className="demo-note">Demo prices in USD. Your bag is kept for this visit only.</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </CartContext.Provider>
  );
}
function Header() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [mobile, setMobile] = useState(false);
  const { items, setOpen } = useCart();
  const links = [
    ["/", "Home"],
    ["/about", "About Us"],
    ["/products", "Products"],
    ["/contact", "Contact"],
  ] as const;
  return (
    <header className="site-header">
      <div className="container-page header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${pathname === to ? "active" : ""}`}
              aria-current={pathname === to ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            className="cart-button"
            aria-label="Open shopping bag"
            onClick={() => setOpen(true)}
          >
            <ShoppingBag size={19} />
            {items.length > 0 && (
              <span className="cart-count">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Button>
          <Button asChild className="header-join">
            <Link to="/contact" search={{ subject: "Membership enquiry" }}>
              Join Now <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {mobile && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobile(false)}
              className={pathname === to ? "text-primary" : ""}
            >
              {label}
            </Link>
          ))}
          <Button asChild>
            <Link
              to="/contact"
              search={{ subject: "Membership enquiry" }}
              onClick={() => setMobile(false)}
            >
              Join Now <ArrowRight />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container-page final-cta-inner">
        <div>
          <p className="eyebrow text-sage mb-3">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Ready to start your fitness journey?</h2>
          <p>You don’t have to be fit to start. You just have to start.</p>
        </div>
        <Button asChild size="lg">
          <Link to="/contact" search={{ subject: "Membership enquiry" }}>
            Get Started Today <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container-page">
        <div className="footer-top">
          <Brand />
          <nav className="desktop-nav" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="icon" title="Instagram">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram (platform homepage)"
              >
                <Instagram size={17} />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" title="Facebook">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook (platform homepage)"
              >
                <Facebook size={17} />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" title="YouTube">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube (platform homepage)"
              >
                <Youtube size={17} />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" title="TikTok">
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok (platform homepage)"
              >
                <span className="font-bold text-lg">♪</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FitZone Fitness Club. All rights reserved.</span>
          <span>Built around you. Made for your journey.</span>
        </div>
        <p className="demo-note">
          Demo club website · Memberships, prices, reviews, team profiles, and statistics are
          illustrative. Social links open platform homepages.
        </p>
      </div>
    </footer>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
