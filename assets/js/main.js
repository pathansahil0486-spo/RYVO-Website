/**
 * Q COM Software Solutions - Multi-Page Interactive Core Scripts
 * Clean, Sharp High-Tech Corporate Theme
 * Sticky Navbar at Top on Scroll & Optimized for 320px+ Mobile Devices
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initCounters();
  initPortfolio();
  initProjectModal();
  initProductEnquiry();
  initCostEstimator();
  initFAQ();
  initContactForm();
  initNewsletter();
  initBackToTop();
});

/* -------------------------------------------------------------------------- */
/* 1. Sticky Top Navbar on Desktop & Mobile Scroll                            */
/* -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (navbar) {
    function handleScroll() {
      if (window.scrollY > 15) {
        navbar.classList.add('scrolled', 'py-2.5');
        navbar.classList.remove('py-3.5', 'sm:py-4');
      } else {
        navbar.classList.remove('scrolled', 'py-2.5');
        navbar.classList.add('py-3.5', 'sm:py-4');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Menu Drawer Handlers
  function openMobileMenu() {
    if (!mobileMenu || !mobileBackdrop) return;
    mobileMenu.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileBackdrop) return;
    mobileMenu.classList.add('translate-x-full');
    mobileBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Numerical Metric Counters                                               */
/* -------------------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements || counterElements.length === 0) return;
  let started = false;

  function runCounters() {
    counterElements.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const steps = 40;
      const stepValue = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
          clearInterval(timer);
        } else {
          counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
        }
      }, duration / steps);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        runCounters();
        started = true;
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* -------------------------------------------------------------------------- */
/* 3. Filterable Portfolio Cards                                              */
/* -------------------------------------------------------------------------- */
function initPortfolio() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns || filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-600', 'text-white', 'shadow-sm', 'border-sky-600');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      btn.classList.add('bg-sky-600', 'text-white', 'shadow-sm', 'border-sky-600');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Project Modal Details                                                   */
/* -------------------------------------------------------------------------- */
const projectsData = {
  1: {
    title: "ApexFlow - Enterprise ERP & CRM Cloud",
    category: "Custom Software & Cloud ERP",
    tagline: "High-scale modular ERP managing operations for 40,000+ business users.",
    description: "Architected a custom end-to-end ERP and customer relationship management platform featuring live telemetry, multi-branch inventory tracking, automated invoicing, and role-based ACL security.",
    stack: ["React.js", "Node.js", "PostgreSQL", "Docker", "AWS", "TailwindCSS"],
    metrics: ["99.98% Uptime SLA", "3.4x Faster Operations", "40K+ Daily Users"]
  },
  2: {
    title: "PayPulse - High-Frequency FinTech Wallet",
    category: "Mobile App & FinTech",
    tagline: "Ultra-secure cross-platform mobile wallet and payment gateway system.",
    description: "Built a next-generation iOS & Android FinTech application with biometric passkey authentication, instant P2P transfers, merchant QR scanning, and automated PCI-DSS compliant encryption.",
    stack: ["Flutter", "FastAPI (Python)", "Redis", "Supabase", "Stripe API"],
    metrics: ["PCI-DSS Compliant", "< 120ms Txn Latency", "500K+ Transfers"]
  },
  3: {
    title: "Q-Bill Pro Cloud - GST & Retail POS Suite",
    category: "Billing Software Development",
    tagline: "Dedicated billing & inventory software for retail chains and distributors.",
    description: "Engineered high-speed desktop and cloud billing software with offline-first synchronization, barcode scanning, thermal receipt printing, GST calculation, and WhatsApp bill dispatching.",
    stack: ["Electron", "React", "Node.js", "SQLite/PostgreSQL", "TailwindCSS"],
    metrics: ["0.2s Invoice Generation", "100% GST Compliant", "Works Offline"]
  },
  4: {
    title: "CareSync - AI Telehealth & Hospital Hub",
    category: "Web & Mobile Development",
    tagline: "HIPAA-ready telemedicine platform connecting doctors and patients.",
    description: "An intuitive healthcare suite supporting HD encrypted video consultations, smart electronic prescriptions, automated appointment queues, and centralized medical record vaults.",
    stack: ["Next.js 14", "WebRTC", "Express.js", "MongoDB", "Tailwind CSS"],
    metrics: ["HIPAA Compliant", "15,000+ Consultations", "4.9/5 Patient Rating"]
  },
  5: {
    title: "NexusVision - Predictive AI Analytics SaaS",
    category: "AI & Machine Learning",
    tagline: "Intelligent analytics pipeline extracting deep actionable business forecasts.",
    description: "An AI-driven SaaS platform ingesting real-time operational streams, running predictive churn models, and providing executive decision engines with automated AI summaries.",
    stack: ["Python", "TensorFlow", "FastAPI", "React", "Kafka", "PostgreSQL"],
    metrics: ["88% Churn Accuracy", "Real-Time Streaming", "12 Enterprise Clients"]
  },
  6: {
    title: "NovaBazaar - Global Multi-Vendor Marketplace",
    category: "E-Commerce Solutions",
    tagline: "Ultra-fast headless commerce platform with multi-currency checkouts.",
    description: "Engineered a headless multi-vendor e-commerce platform with sub-second page loads, real-time inventory locking, seller commission dashboards, and omnichannel logistics integrations.",
    stack: ["Next.js", "Node.js", "Redis", "Elasticsearch", "Stripe", "AWS S3"],
    metrics: ["sub-500ms Page Loads", "$2.8M GMV Processed", "200+ Vendors"]
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('project-modal-close');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal) return;

  const titleEl = document.getElementById('modal-title');
  const categoryEl = document.getElementById('modal-category');
  const taglineEl = document.getElementById('modal-tagline');
  const descEl = document.getElementById('modal-desc');
  const stackContainer = document.getElementById('modal-stack');
  const metricsContainer = document.getElementById('modal-metrics');

  function openModal(id) {
    const data = projectsData[id];
    if (!data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (categoryEl) categoryEl.textContent = data.category;
    if (taglineEl) taglineEl.textContent = data.tagline;
    if (descEl) descEl.textContent = data.description;

    if (stackContainer) {
      stackContainer.innerHTML = '';
      data.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-md text-xs font-semibold';
        span.textContent = tech;
        stackContainer.appendChild(span);
      });
    }

    if (metricsContainer) {
      metricsContainer.innerHTML = '';
      data.metrics.forEach(metric => {
        const div = document.createElement('div');
        div.className = 'flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium';
        div.innerHTML = `<i class="fas fa-check-circle text-emerald-600"></i> <span>${metric}</span>`;
        metricsContainer.appendChild(div);
      });
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      openModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
}

/* -------------------------------------------------------------------------- */
/* 5. Product Demo Enquiry Helper                                             */
/* -------------------------------------------------------------------------- */
function initProductEnquiry() {
  const demoBtns = document.querySelectorAll('.product-demo-btn');
  demoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prodName = btn.getAttribute('data-product') || 'Software Product';
      // If contact form is on this page
      const serviceField = document.getElementById('contact-service');
      const messageField = document.getElementById('contact-message');

      if (serviceField && messageField) {
        e.preventDefault();
        serviceField.value = 'Billing Software Development';
        messageField.value = `Hello Sachin, Roshani & Sahil,\n\nI am interested in scheduling a live demonstration of ${prodName} for our organization.\n\nPlease share the feature roadmap, pricing tier, and deployment schedule.`;
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        showToast(`Selected demo for ${prodName}! Scroll down to submit.`);
      } else {
        // Redirect to contact.html with pre-selected query param
        window.location.href = `contact.html?product=${encodeURIComponent(prodName)}`;
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Interactive Project Cost & Timeline Estimator                           */
/* -------------------------------------------------------------------------- */
function initCostEstimator() {
  const platformSelect = document.getElementById('calc-platform');
  const scopeSelect = document.getElementById('calc-scope');
  const timelineSelect = document.getElementById('calc-speed');
  const featureCheckboxes = document.querySelectorAll('.calc-feature');
  
  const priceDisplay = document.getElementById('calc-price-display');
  const timeDisplay = document.getElementById('calc-time-display');
  const applyBtn = document.getElementById('calc-apply-btn');

  if (!platformSelect || !priceDisplay) return;

  function calculate() {
    let basePrice = 1200;
    let baseWeeks = 3;

    const platform = platformSelect ? platformSelect.value : 'web';
    if (platform === 'mobile') {
      basePrice = 1800;
      baseWeeks = 4;
    } else if (platform === 'billing') {
      basePrice = 1500;
      baseWeeks = 3;
    } else if (platform === 'fullstack') {
      basePrice = 2800;
      baseWeeks = 6;
    } else if (platform === 'ai') {
      basePrice = 3500;
      baseWeeks = 7;
    }

    const scope = scopeSelect ? scopeSelect.value : 'mvp';
    if (scope === 'mvp') {
      basePrice *= 1.0;
      baseWeeks *= 1.0;
    } else if (scope === 'growth') {
      basePrice *= 1.6;
      baseWeeks *= 1.4;
    } else if (scope === 'enterprise') {
      basePrice *= 2.6;
      baseWeeks *= 2.1;
    }

    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseInt(cb.getAttribute('data-cost') || '0', 10);
        basePrice += cost;
        baseWeeks += 0.4;
      }
    });

    const speed = timelineSelect ? timelineSelect.value : 'standard';
    if (speed === 'fast') {
      basePrice *= 1.25;
      baseWeeks = Math.max(2, Math.round(baseWeeks * 0.7));
    } else {
      baseWeeks = Math.round(baseWeeks);
    }

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.15);

    if (priceDisplay) {
      priceDisplay.textContent = `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
    }
    if (timeDisplay) {
      timeDisplay.textContent = `${baseWeeks} - ${baseWeeks + 2} Weeks`;
    }
  }

  if (platformSelect) platformSelect.addEventListener('change', calculate);
  if (scopeSelect) scopeSelect.addEventListener('change', calculate);
  if (timelineSelect) timelineSelect.addEventListener('change', calculate);
  featureCheckboxes.forEach(cb => cb.addEventListener('change', calculate));

  calculate();

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const platformText = platformSelect.options[platformSelect.selectedIndex].text;
      const scopeText = scopeSelect.options[scopeSelect.selectedIndex].text;
      const estPrice = priceDisplay.textContent;
      const estTime = timeDisplay.textContent;

      // Transfer to contact.html
      const query = `?service=${encodeURIComponent(platformSelect.value)}&notes=${encodeURIComponent(`Estimated Budget: ${estPrice}, Timeline: ${estTime} for ${platformText} (${scopeText})`)}`;
      window.location.href = `contact.html${query}`;
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 7. FAQ Accordion                                                           */
/* -------------------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems || faqItems.length === 0) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');

        faqItems.forEach(other => {
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.remove('open');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.add('open');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 8. Contact Form (Direct Email qcomsoft@gmail.com & WhatsApp)               */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successModal = document.getElementById('form-success-modal');
  const successCloseBtn = document.getElementById('form-success-close');
  const mailtoBtn = document.getElementById('form-mailto-btn');
  const whatsappBtn = document.getElementById('form-whatsapp-btn');

  // Handle URL parameters if coming from estimator or product demo
  const urlParams = new URLSearchParams(window.location.search);
  const prodParam = urlParams.get('product');
  const serviceParam = urlParams.get('service');
  const notesParam = urlParams.get('notes');

  const serviceField = document.getElementById('contact-service');
  const messageField = document.getElementById('contact-message');

  if (prodParam && messageField) {
    messageField.value = `Hello Sachin, Roshani & Sahil,\n\nI am contacting you to request a live demonstration and consultation for ${prodParam}.\nPlease provide the deployment roadmap and pricing structure.`;
  } else if (notesParam && messageField) {
    messageField.value = `Hello Sachin, Roshani & Sahil,\n\nI configured an estimate using the Q COM Cost Estimator:\n${notesParam}\n\nLet's schedule a call to begin!`;
  }

  if (serviceParam && serviceField) {
    if (serviceParam === 'mobile') serviceField.value = 'Mobile Application Development';
    else if (serviceParam === 'billing') serviceField.value = 'Billing Software Development';
    else if (serviceParam === 'web') serviceField.value = 'Website Development';
    else if (serviceParam === 'ai') serviceField.value = 'Custom Software Development';
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const service = document.getElementById('contact-service').value;
    const budget = document.getElementById('contact-budget').value;
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      alert("Please enter your Name, Email, and Project Description.");
      return;
    }

    const emailSubject = encodeURIComponent(`Project Enquiry from ${name} - Q COM Software`);
    const emailBody = encodeURIComponent(
      `Hello Q COM Software Team (Sachin, Roshani, Sahil),\n\n` +
      `Client Name: ${name}\n` +
      `Client Email: ${email}\n` +
      `Phone/WhatsApp: ${phone || 'Not provided'}\n` +
      `Selected Service: ${service}\n` +
      `Budget Range: ${budget}\n\n` +
      `Project Brief:\n${message}\n\n` +
      `Submitted through Q COM Software Solutions Portal`
    );
    const mailtoUrl = `mailto:qcomsoft@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    const waText = encodeURIComponent(
      `Hello Q COM Software Solutions,\nMy name is ${name}.\nI am contacting you regarding: ${service}.\nEmail: ${email}\nBudget: ${budget}\nBrief: ${message}`
    );
    const waUrl = `https://wa.me/?text=${waText}`;

    if (mailtoBtn) mailtoBtn.href = mailtoUrl;
    if (whatsappBtn) whatsappBtn.href = waUrl;

    if (successModal) {
      successModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    showToast("Enquiry submitted! You can now send directly to qcomsoft@gmail.com or WhatsApp.");
    form.reset();
  });

  if (successCloseBtn && successModal) {
    successCloseBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 9. Newsletter Form                                                         */
/* -------------------------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
      showToast("Subscribed! You will receive tech updates from Q COM Software.");
      form.reset();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 10. Back to Top                                                            */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------- */
/* 11. Toast Notification Utility                                             */
/* -------------------------------------------------------------------------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
