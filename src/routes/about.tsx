import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro, FinalCTA } from "@/components/fitzone/site";
import { meta } from "@/lib/fitness-data";
import strength from "@/assets/strength.jpg";
import yoga from "@/assets/yoga.jpg";
import hero from "@/assets/gym-hero.jpg";
export const Route = createFileRoute("/about")({
  head: () =>
    meta(
      "Our Story",
      "Meet FitZone Fitness Club: a welcoming space for mindful movement, expert coaching, and lasting strength.",
    ),
  component: About,
});
function About() {
  return (
    <main>
      <PageIntro
        eyebrow="THIS IS FITZONE"
        title="A stronger you starts with us."
        description="We believe fitness should feel empowering, never intimidating. A place to show up as you are, and discover what you can become."
      />
      <section className="section">
        <div className="container-page about-grid">
          <img
            src={strength}
            alt="A personal trainer supporting a member during weight training"
            width={1024}
            height={1024}
          />
          <div>
            <p className="eyebrow">MORE THAN A WORKOUT</p>
            <h2>
              Good people.
              <br />
              Stronger possibilities.
            </h2>
            <p>
              FitZone is built on a simple idea: the best workout is the one you feel good coming
              back to. We bring thoughtful training, expert guidance, and a supportive community
              together under one roof.
            </p>
            <p>
              Whether you’re picking up your first dumbbell or working toward your next milestone,
              there’s room for your journey here. No comparisons. No pressure. Just progress.
            </p>
            <Button asChild>
              <Link to="/contact" search={{ subject: "Membership enquiry" }}>
                Become a Member <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="container-page pb-16">
        <div className="stat-grid">
          {[
            ["500+", "Member journeys"],
            ["12", "Passionate coaches"],
            ["5", "Training programs"],
            ["8+", "Years of experience"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="demo-note text-center">Illustrative club statistics — to be confirmed.</p>
      </section>
      <section className="section program-section">
        <div className="container-page grid md:grid-cols-2 gap-12">
          {[
            {
              icon: Heart,
              title: "Our Mission",
              copy: "To make a healthier, stronger life feel possible for everyone, with personal support and movement that fits the way you live.",
            },
            {
              icon: Compass,
              title: "Our Vision",
              copy: "A community where fitness is a source of confidence, connection, and everyday wellbeing — not a finish line, but a lifelong practice.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title}>
              <Icon className="text-secondary-foreground mb-4" size={29} strokeWidth={1.4} />
              <h2 className="text-2xl mb-4">{title}</h2>
              <p className="text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container-page">
          <div className="section-heading center">
            <p className="eyebrow">GOOD ENERGY. REAL EXPERTISE.</p>
            <h2>Meet your biggest supporters.</h2>
            <p>Knowledgeable coaches. Thoughtful guidance. People in your corner.</p>
          </div>
          <div className="program-grid">
            {[
              {
                name: "Alex Morgan",
                specialty: "Strength & Conditioning",
                image: strength,
                copy: "Practical coaching that helps build good technique, confidence, and sustainable strength.",
              },
              {
                name: "Maya Patel",
                specialty: "Yoga & Mindful Movement",
                image: yoga,
                copy: "A thoughtful approach to mobility, balance, and finding calm through movement.",
              },
              {
                name: "Emma Wilson",
                specialty: "Personal Training",
                image: hero,
                copy: "Goal-focused support that adapts to your experience, your schedule, and your life.",
              },
            ].map((trainer) => (
              <article className="program-card" key={trainer.name}>
                <img
                  className="program-image"
                  src={trainer.image}
                  alt={`Illustrative ${trainer.specialty} coach`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
                <div className="program-info">
                  <p className="eyebrow">{trainer.specialty}</p>
                  <h3>{trainer.name}</h3>
                  <p>{trainer.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="demo-note text-center">Sample trainer profiles and illustrative imagery.</p>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
