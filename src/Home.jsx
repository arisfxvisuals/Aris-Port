import React, { useLayoutEffect, useRef, useState} from "react";
import {
  ArrowRight,
  ExternalLink,
  Linkedin,
  Youtube,
  Twitter,
  Instagram,
  Play,
  MessageCircle,
} from "lucide-react";
import Navbar from "../src/components/Navbar";
import Particles from "../src/components/Rays";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(SplitText, ScrollTrigger);

const pricingData = {
  india: {
    basic: {
      price: "₹4,999",
      title: "Basic Edit",
      desc: "Perfect for short videos & quick edits with clean cuts.",
      features: [
        "Up to 60 sec video",
        "Clean cuts + sync",
        "Basic transitions",
        "Color correction",
        "1 revision",
      ],
    },
    pro: {
      price: "₹11,999",
      title: "Pro Edit",
      desc: "Best for creators. Advanced transitions + better storytelling.",
      features: [
        "Up to 3 min video",
        "Sound design + sync",
        "Premium transitions",
        "Color grading",
        "Subtitles/captions",
        "2 revisions",
      ],
    },
    advanced: {
      price: "₹24,999",
      title: "Advanced Cinematic",
      desc: "High-end cinematic editing with motion graphics.",
      features: [
        "Up to 8 min video",
        "Cinematic pacing",
        "Advanced sound design",
        "Motion graphics",
        "Custom LUT/grade",
        "Unlimited revisions (limited time)",
      ],
    },
  },

  international: {
    basic: {
      price: "$79",
      title: "Basic Edit",
      desc: "Clean edits that keep viewers hooked from frame one.",
      features: [
        "Up to 60 sec video",
        "Clean cuts",
        "Basic transitions",
        "Color correction",
        "1 revision",
      ],
    },
    pro: {
      price: "$179",
      title: "Pro Edit",
      desc: "For serious creators who want polished high-retention edits.",
      features: [
        "Up to 3 min video",
        "Sound design",
        "Premium transitions",
        "Color grading",
        "Captions",
        "2 revisions",
      ],
    },
    advanced: {
      price: "$349",
      title: "Advanced Cinematic",
      desc: "Premium cinematic editing + motion design package.",
      features: [
        "Up to 8 min video",
        "Cinematic storytelling",
        "Advanced sound design",
        "Motion graphics",
        "Custom grading",
        "Unlimited revisions (limited time)",
      ],
    },
  },
};

const Home = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".reveal-section");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
  
          const section = entry.target;
  
      
          if (section.dataset.animated === "true") return;
          section.dataset.animated = "true";
  
          // 🔥 SECTION ENTER TIMELINE
          const tl = gsap.timeline();
  
     
          tl.fromTo(
            section,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
          );
  
        
          tl.fromTo(
            section.querySelectorAll(".reveal-title"),
            { y: 80, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power4.out",
            },
            "-=0.2"
          );
  
         
          tl.fromTo(
            section.querySelectorAll(".reveal-para"),
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
            "-=0.55"
          );
  
         
          tl.fromTo(
            section.querySelectorAll(".reveal-left"),
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
            "-=0.55"
          );
  
          tl.fromTo(
            section.querySelectorAll(".reveal-right"),
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
            "-=0.85"
          );
  
        
          tl.fromTo(
            section.querySelectorAll(".reveal-stats .stat"),
            { y: 40, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: "back.out(1.6)",
            },
            "-=0.6"
          );
  
         
          tl.fromTo(
            section.querySelectorAll(".reveal-tabs .tab-btn"),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: "back.out(1.7)",
            },
            "-=0.55"
          );
  
         
          tl.fromTo(
            section.querySelectorAll(".reveal-card"),
            { y: 80, opacity: 0, scale: 0.97, filter: "blur(12px)" },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "power4.out",
            },
            "-=0.65"
          );
  
         
          observer.unobserve(section);
        });
      },
      { threshold: 0.22 } 
    );
  
    sections.forEach((sec) => observer.observe(sec));
  
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    gsap.to(".pricing-card", {
      y: -8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  
    gsap.to(".footer-big-title", {
      filter: "drop-shadow(0 0 18px rgba(0,229,255,0.25))",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);
  

  const scrollToSection = (ref) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageRef = useRef(null);

  const [region, setRegion] = useState("international");
  const [plan, setPlan] = useState("pro");

  const pricingCardRef = useRef(null);
  const pricingInnerRef = useRef(null);

  const projectSectionRef = useRef(null);
  const projectCardsWrapRef = useRef(null);

  const data = pricingData[region][plan];


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".head", { type: "chars" });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.fromTo(
        ".para",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );

      gsap.fromTo(
        ".sec-para",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.1, ease: "power4.out" }
      );

      gsap.fromTo(
        ".contact-btn",
        { x: 150, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "bounce.out" }
      );

      return () => split.revert();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  
  useLayoutEffect(() => {
    if (!pricingInnerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pricingInnerRef.current,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        }
      );
    }, pricingCardRef);

    return () => ctx.revert();
  }, [region, plan]);

  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY
        
      );

      setStatus(" Message sent successfully! I’ll reply within 24 hours.");
      formRef.current.reset();
    } catch (err) {
      console.log(err);
      setStatus("Something went wrong. Please Contact 9391834702.");
    } finally {
      setSending(false);
    }
  };

 
  useLayoutEffect(() => {
    if (!projectCardsWrapRef.current || !projectSectionRef.current) return;
  
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-cards .card");
  
      gsap.set(cards, { opacity: 0, y: 120, scale: 0.96 });
  
      // stack order
      cards.forEach((card, i) => {
        card.style.zIndex = i + 1;
      });
  
      // helper function
      const setActiveCard = (activeIndex) => {
        cards.forEach((c, idx) => {
          c.style.pointerEvents = idx === activeIndex ? "auto" : "none";
        });
      };
  
      // initially first card clickable
      setActiveCard(0);
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectSectionRef.current,
          start: "top top",
          end: `+=${cards.length * 160}%`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
  
          // ✅ this fixes forward + reverse perfectly
          onUpdate: (self) => {
            const p = self.progress; // 0 to 1
            const index = Math.min(
              cards.length - 1,
              Math.floor(p * cards.length)
            );
            setActiveCard(index);
          },
        },
      });
  
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
          },
          i
        );
  
        if (i > 0) {
          tl.to(
            cards[i - 1],
            {
              scale: 0.94,
              y: -18,
              opacity: 0.85,
              duration: 1,
              ease: "power2.out",
            },
            i
          );
        }
      });
    }, pageRef);
  
    return () => ctx.revert();
  }, []);
  

  return (
    <div className="page" ref={pageRef}>
      <a className="message" href="https://wa.me/9391834702?text=Hello Aris! I came across your website and would like to discuss a video editing project." target="_blank">
      <MessageCircle  className="msg-icon" size={25} color="#ffffff" />
      </a>
      
      <Particles
        className="particles-bg"
        particleColors={["#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />

      <div className="content">
        <Navbar
          sections={{
            home: homeRef,
            about: aboutRef,
            work: projectRef,
            pricing: pricingRef,
            contact: contactRef,
          }}
          onNavigate={scrollToSection}
        />

        {/* HERO */}
        <section className="hero2" id="home" ref={homeRef}>
          <div className="hero2-content">
            <h1 className="head">Aris Vrajan</h1>

            <div className="hero-para">
              <p className="para">Professional 
               Editor</p>
              <hr />
            </div>

            <p className="sec-para">
              Turning raw footage into scroll-stopping visuals with clean cuts,
              smooth transitions, and powerful storytelling.
            </p>

            <div className="contact-btn" onClick={()=>scrollToSection(contactRef)}>
              <button>
                Contact Me{" "}
                <span>
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>

          <div className="bottom-bar"></div>

          <div className="circle">
            <div className="hero-video"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about-section  reveal-section" id="about" ref={aboutRef}>
          <div className="about-wrap">
            <div className="about-left">
              <div className="hero-para about-para">
                <p className="para">ABOUT ME</p>
                <hr />
              </div>

              <h2 className="about-title reveal-title">
                Turning footage into{" "}
                <span className="accent">cinematic stories</span>
              </h2>

              <p className="about-desc reveal-para">
                I’m a professional video editor focused on high-retention edits,
                clean pacing, smooth transitions, and cinematic storytelling. I
                blend sound design, color grading, and motion graphics to make
                every frame feel premium.
              </p>

              <div className="about-stats reveal-stats">
                <div className="stat">
                  <h3>150+</h3>
                  <p>Projects Edited</p>
                </div>
                <div className="stat">
                  <h3>4+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>24/7</h3>
                  <p>Creative Support</p>
                </div>
              </div>

              <div className="contact-btn">
                <button onClick={() => scrollToSection(projectRef)}>
                  View My Work{" "}
                  <span>
                    <ArrowRight size={20} />
                  </span>
                </button>
              </div>
            </div>

            <div className="about-right reveal-right">
              <div className="tool-card">
                <h3 className="tool-title">Tools I Use</h3>

                <div className="tools-grid">
                  <div className="tool">
                    <img src="/pr.png" alt="Adobe Premiere Pro" />
                    <p>Premiere Pro</p>
                  </div>
                  <div className="tool">
                    <img src="/ae.png" alt="After Effects" />
                    <p>After Effects</p>
                  </div>
                  <div className="tool">
                    <img src="/ai.png" alt="Illustrator" />
                    <p>Illustrator</p>
                  </div>
                  <div className="tool">
                    <img src="/ps.png" alt="Photoshop" />
                    <p>Photoshop</p>
                  </div>
                </div>
              </div>

              <div className="about-highlight">
                <h3>Editing Style</h3>
                <p>• Fast pacing</p>
                <p>• Clean cuts </p>
                <p>• Smooth transitions</p>
                <p>• Captions</p>
                <p>• Sound design</p>
                <p>• Cinematic color grading</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS (STACKING) */}
        <section className="section" ref={projectRef}>
          <div className="section-project" id="work" ref={projectSectionRef}>
            <div className="project-cards" ref={projectCardsWrapRef}>
              {/* CARD 1 */}
              <div className="card project-card">
                {/* Top header */}
                <div className="project-top">
                  <div className="project-heading">
                    <h3>Project 01</h3>
                    <p>
                      High-retention cinematic reel edit with clean pacing &
                      transitions.
                    </p>
                  </div>

                  <a
                    className="live-link"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={18} />
                    <span>Live</span>
                  </a>
                </div>

                {/* Video */}
                <div className="project-video-wrap">
                <video
                    className="project-video"
                    src="/vid.mp4"
                    loop
                    autoPlay
                    muted
                    preload="metadata"
                  />
                </div>

                {/* Handlers */}
                <div className="project-bottom">
                  <p className="handlers-title">Handlers</p>

                  <div className="handlers">
                    <a
                      className="icon-link linkedin"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={18} />
                    </a>

                    <a
                      className="icon-link youtube"
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Youtube size={18} />
                    </a>

                    <a
                      className="icon-link twitter"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter size={18} />
                    </a>

                    <a
                      className="icon-link instagram"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="card project-card">
                <div className="project-top">
                  <div className="project-heading">
                    <h3>Project 02</h3>
                    <p>
                      YouTube edit with storytelling cuts, captions & sound
                      design.
                    </p>
                  </div>

                  <a
                    className="live-link"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={18} />
                    <span>Live</span>
                  </a>
                </div>

                <div className="project-video-wrap">
                  <video
                    className="project-video"
                    src="/vid.mp4"
                    loop
                    autoPlay
                    muted
                    preload="metadata"
                  />
                  
                </div>

                <div className="project-bottom">
                  <p className="handlers-title">Handlers</p>

                  <div className="handlers">
                    <a
                      className="icon-link linkedin"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      className="icon-link youtube"
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Youtube size={18} />
                    </a>
                    <a
                      className="icon-link twitter"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      className="icon-link instagram"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="card project-card">
                <div className="project-top">
                  <div className="project-heading">
                    <h3>Project 03</h3>
                    <p>
                      Shorts / reels with motion graphics + smooth transitions.
                    </p>
                  </div>

                  <a
                    className="live-link"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={18} />
                    <span>Live</span>
                  </a>
                </div>

                <div className="project-video-wrap">
                  <video
                    className="project-video"
                    src="/vid.mp4"
                    autoPlay
                    loop
                    muted
                    preload="metadata"
                  />
                  
                </div>

                <div className="project-bottom">
                  <p className="handlers-title">Handlers</p>

                  <div className="handlers">
                    <a
                      className="icon-link linkedin"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      className="icon-link youtube"
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Youtube size={18} />
                    </a>
                    <a
                      className="icon-link twitter"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      className="icon-link instagram"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          className="section pricing-section reveal-section"
          id="pricing"
          ref={pricingCardRef}
        >
          <div className="pricing-wrap" ref={pricingRef}>
            <div className="pricing-heading reveal-title">
              <h2>Pricing</h2>
              <p>Choose a region + plan. Instant smooth transitions.</p>
            </div>

            <div className="pricing-tabs region-tabs reveal-tabs">
              <button
                className={`tab-btn ${region === "india" ? "active" : ""}`}
                onClick={() => setRegion("india")}
              >
                India 🇮🇳
              </button>

              <button
                className={`tab-btn ${
                  region === "international" ? "active" : ""
                }`}
                onClick={() => setRegion("international")}
              >
                International
              </button>
            </div>

            <div className="pricing-tabs plan-tabs reveal-tabs">
              <button
                className={`tab-btn ${plan === "basic" ? "active" : ""}`}
                onClick={() => setPlan("basic")}
              >
                Basic
              </button>

              <button
                className={`tab-btn ${plan === "pro" ? "active" : ""}`}
                onClick={() => setPlan("pro")}
              >
                Pro
              </button>

              <button
                className={`tab-btn ${plan === "advanced" ? "active" : ""}`}
                onClick={() => setPlan("advanced")}
              >
                Advanced
              </button>
            </div>

            <div className="pricing-card reveal-card">
              <div className="pricing-inner" ref={pricingInnerRef}>
                <div className="pricing-top">
                  <div className="pricing-badge">
                    {region === "india"
                      ? "For India Clients"
                      : "Global Clients"}
                  </div>

                  <h3 className="pricing-title">{data.title}</h3>
                  <p className="pricing-desc">{data.desc}</p>
                </div>

                <div className="pricing-price">
                  <span className="price">{data.price}</span>
                  <span className="per">per video</span>
                </div>

                <ul className="pricing-features">
                  {data.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>

                <div className="pricing-actions">
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="pricing-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          className="section section-contact reveal-section"
          id="contact"
          ref={contactRef}
        >
          <div className="contact-wrap">
            {/* LEFT SIDE */}
            <div className="contact-left reveal-left">
              <div className="hero-para about-para">
                <p className="para">LET'S WORK TOGETHER</p>
                <hr />
              </div>

              <h2 className="contact-title">
                Let’s create something <span className="acc">cinematic</span>.
              </h2>

              <p className="contact-desc">
                Want high-retention edits, clean transitions, captions, sound
                design and cinematic color grading? Send your project details —
                I’ll reply within 24 hours.
              </p>

              <div className="contact-info">
                <div className="info-item">
                  <span className="dot"></span>
                  <p>
                    <b>Email:</b> aris.fxvisuals@gmail.com
                  </p>
                </div>

                <div className="info-item">
                  <span className="dot"></span>
                  <p>
                    <b>WhatsApp:</b> +91 93918 34702
                  </p>
                </div>

                <div className="info-item">
                  <span className="dot"></span>
                  <p>
                    <b>Location:</b> India / Available Worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="contact-card reveal-right">
              <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      name="from_name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="from_email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Project Type</label>
                    <select name="project_type" required>
                      <option value="">Select project type</option>
                      <option>YouTube Video</option>
                      <option>Shorts / Reels</option>
                      <option>Wedding / Event</option>
                      <option>Ads / Commercial</option>
                      <option>Music Video</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Budget</label>
                    <select name="budget" required>
                      <option value="">Select budget range</option>
                      <option>₹5K - ₹10K</option>
                      <option>₹10K - ₹25K</option>
                      <option>₹25K - ₹50K</option>
                      <option>$100 - $300</option>
                      <option>$300 - $800</option>
                      <option>$800+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Details</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell me about your video, style references, duration, deadline, etc..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Deadline</label>
                    <input
                      name="deadline"
                      type="text"
                      placeholder="Example: 3 days / 1 week"
                    />
                  </div>

                  <div className="form-group">
                    <label>Reference Link (optional)</label>
                    <input
                      name="reference"
                      type="text"
                      placeholder="YouTube / Drive / Instagram link"
                    />
                  </div>
                </div>

                <button
                  className="contact-submit"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>

                {status && <p className="form-status">{status}</p>}
              </form>
            </div>
          </div>
        </section>

        <section className="footer reveal-section">
         <h1 className="footer-big-title reveal-title">Raw Video Needs Therapy</h1>
         <p className="reveal-para">aris.fxvisuals@gmail.com</p>
         <p className="reveal-para">+91 93918 34702</p>
        </section>
      </div>
    </div>
  );
};

export default Home;
