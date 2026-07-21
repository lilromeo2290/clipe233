// Seed script to populate the database with actual website content
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with website content...");

  // ─── Services ──────────────────────────────────────────────────────────────
  const services = [
    {
      title: "Software Development",
      slug: "software-development",
      description: "We design and build robust, scalable software solutions that streamline operations and drive business growth. From custom enterprise systems to innovative mobile applications, we bring your ideas to life.",
      icon: "Code",
      features: "Web Applications,Mobile Apps,Enterprise Software,Custom Systems",
      benefits: "Tailored to your business processes,Scalable architecture,Agile development methodology,Post-launch support & maintenance",
      order: 1,
      published: true,
    },
    {
      title: "Website Design & Development",
      slug: "website-development",
      description: "We create stunning, high-performance websites that captivate audiences and convert visitors into customers. Every site we build is optimized for speed, SEO, and user experience.",
      icon: "Globe",
      features: "Corporate Websites,E-commerce Platforms,Web Portals,CMS Systems",
      benefits: "Mobile-first responsive design,SEO optimized structure,Fast loading performance,Easy content management",
      order: 2,
      published: true,
    },
    {
      title: "Graphic Design",
      slug: "graphic-design",
      description: "Our creative team produces visually striking designs that communicate your brand identity with clarity and impact. From logos to marketing materials, we make your brand unforgettable.",
      icon: "Palette",
      features: "Brand Identity & Logo Design,Social Media Graphics,Print Materials,Marketing Collateral",
      benefits: "Consistent brand messaging,Professional visual identity,Multi-platform design assets,Unlimited revision rounds",
      order: 3,
      published: true,
    },
    {
      title: "Networking Installation",
      slug: "networking-solutions",
      description: "We design, install, and maintain reliable network infrastructure that keeps your business connected and secure. From LAN/WAN to CCTV, we ensure your network runs flawlessly.",
      icon: "Network",
      features: "LAN/WAN Setup,CCTV Systems,Structured Cabling,Network Security",
      benefits: "Certified network engineers,24/7 monitoring options,Scalable infrastructure,Security-first approach",
      order: 4,
      published: true,
    },
    {
      title: "IT Consultancy & Training",
      slug: "it-consultancy",
      description: "Our experienced consultants provide strategic technology guidance that helps organizations make informed decisions. We offer vendor-neutral recommendations and actionable roadmaps.",
      icon: "Lightbulb",
      features: "Digital Transformation,Technology Audits,Business Automation,Infrastructure Planning",
      benefits: "Vendor-neutral recommendations,Cost optimization strategies,Risk assessment & mitigation,Implementation roadmap",
      order: 5,
      published: true,
    },
    {
      title: "Mobile App Development",
      slug: "mobile-app-development",
      description: "We build high-performance mobile applications for iOS and Android that deliver seamless user experiences. From concept to deployment, we create apps that users love.",
      icon: "Smartphone",
      features: "iOS Apps,Android Apps,Cross-Platform Apps,App Store Optimization",
      benefits: "Native performance,Intuitive UX design,Scalable architecture,Ongoing support & updates",
      order: 6,
      published: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ Seeded ${services.length} services`);

  // ─── Team Members ──────────────────────────────────────────────────────────
  const teamMembers = [
    {
      name: "Raymond Romeo Dravie",
      title: "CEO, Founder & Snr. Engineer",
      bio: "Has more than 7 years experience in ICT with a strong background in Algorithmic Designs, Data Centers, IT Infrastructure, Software Development, Network, Management and Leadership. He has been the key personnel in many project executions in Clipe Consult and took part in the development of most of our products.",
      image: "/team-raymond.jpg",
      expertise: "Knowledge and experience in Networking,Programming & Databases: C++ PHP CSS JavaScript VB.NET Java MySQL,Website Development: WordPress Joomla Drupal",
      qualifications: "Certificate in Cyber Intelligence and Malware,Diploma in Hardware and Networking,BSc ICT — Presbyterian University College Ghana,BSc IT — Ghana Communication Technology University",
      technicalSkills: "C++,PHP,CSS,JavaScript,VB.NET,Java,MySQL,WordPress,Joomla,Drupal",
      order: 1,
      published: true,
    },
    {
      name: "Frank Hope Tachie",
      title: "Co-Founder & Snr. Engineer",
      bio: "Results-driven IT expert with 4+ years of experience in ICT, education, and network architecture. Skilled in designing secure networks, developing software, and leading projects.",
      image: "/team-frank.jpg",
      expertise: "Network Architecture and Security,Software Development & IT Infrastructure,Data Centers & Integrated Digital Systems (IDS),Leadership and Project Management",
      qualifications: "Certificate in Hardware & Networking Cybersecurity and Malware Intrusion,BSc Information Technology (ICT) — GCTU",
      technicalSkills: "C++,PHP,JavaScript,Java,MySQL,WordPress,Joomla,Drupal",
      order: 2,
      published: true,
    },
    {
      name: "Senyo Kofi Dzakah",
      title: "Admin and Finance",
      bio: "Ten (10) years experience in Accounting and Administration across both Small and Medium Enterprises and Construction. He has been the key in managing finances of Battis Company Limited on various projects. Currently the Director of Finance and Administration of Miai Ltd Company, which majors in the construction of roads and Agriculture products and Services.",
      image: "/team-senyo.jpg",
      expertise: "Monitory and Execution of projects from start to finish,Knowledge in accounting software like Tally and QuickBooks",
      qualifications: "Institute of Chartered Accountant Ghana (Associate Member),Bachelor of Commerce University of Cape Coast,Higher National Diploma (HND) Accounting — Ho Polytechnic",
      technicalSkills: "Tally,QuickBooks,Financial Management,Budgeting",
      order: 3,
      published: true,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: `seed-${member.name.toLowerCase().replace(/\s+/g, "-")}` },
      update: member,
      create: member,
    });
  }
  console.log(`✅ Seeded ${teamMembers.length} team members`);

  // ─── Projects ──────────────────────────────────────────────────────────────
  const projects = [
    {
      title: "School Management System",
      slug: "school-management-system",
      description: "A comprehensive school management platform with student enrollment, grading, attendance tracking, and parent portal for a network of 15 schools in the Volta Region.",
      category: "Software",
      technologies: "React,Node.js,PostgreSQL",
      featured: true,
      published: true,
    },
    {
      title: "Church Community Portal",
      slug: "church-community-portal",
      description: "An interactive church website with event management, sermon streaming, donation integration, and member directory serving over 2,000 congregants.",
      category: "Websites",
      technologies: "Next.js,Tailwind CSS,Stripe",
      featured: true,
      published: true,
    },
    {
      title: "AgriTech Brand Identity",
      slug: "agritech-brand-identity",
      description: "Complete brand identity design for an agricultural technology startup, including logo, color system, typography, marketing materials, and social media templates.",
      category: "Branding",
      technologies: "Branding,Logo Design,Print",
      featured: false,
      published: true,
    },
    {
      title: "Enterprise Network Infrastructure",
      slug: "enterprise-network-infrastructure",
      description: "Full LAN/WAN setup with structured cabling, VPN configuration, firewall deployment, and CCTV installation for a multi-story corporate office building.",
      category: "Networking",
      technologies: "Cisco,CCTV,VPN,Security",
      featured: true,
      published: true,
    },
    {
      title: "E-Commerce Platform",
      slug: "e-commerce-platform",
      description: "A feature-rich e-commerce platform with product catalog, payment processing via Paystack, inventory management, and analytics dashboard for a retail chain.",
      category: "Websites",
      technologies: "Next.js,Paystack,Firebase",
      featured: true,
      published: true,
    },
    {
      title: "Healthcare Booking App",
      slug: "healthcare-booking-app",
      description: "A patient appointment scheduling and telemedicine application enabling healthcare facilities to manage bookings, virtual consultations, and medical records securely.",
      category: "Software",
      technologies: "React Native,Node.js,HIPAA",
      featured: false,
      published: true,
    },
    {
      title: "NGO Annual Report Design",
      slug: "ngo-annual-report-design",
      description: "Designed and produced comprehensive annual reports and impact documentation for an international NGO, with infographics, data visualization, and print-ready layouts.",
      category: "Branding",
      technologies: "Graphic Design,Data Viz,Print",
      featured: false,
      published: true,
    },
    {
      title: "Government Office Network",
      slug: "government-office-network",
      description: "Deployed secure networking infrastructure for a district government office, including structured cabling, server room setup, and cybersecurity implementation.",
      category: "Networking",
      technologies: "Infrastructure,Security,Server",
      featured: false,
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`✅ Seeded ${projects.length} projects`);

  // ─── Testimonials ──────────────────────────────────────────────────────────
  const testimonials = [
    {
      name: "Dr. Kofi Mensah",
      title: "Director",
      company: "Volta Education Network",
      content: "Clipe Consult transformed how our schools manage operations. Their school management system reduced our administrative workload by 60% and improved parent engagement significantly. The team was professional, responsive, and truly understood our unique requirements as an educational institution.",
      rating: 5,
      featured: true,
      published: true,
    },
    {
      name: "Ama Osei",
      title: "Founder",
      company: "Ho Retail Hub",
      content: "The e-commerce platform built by Clipe Consult has been a game-changer for our retail business. Within three months of launch, our online sales exceeded our physical store revenue. Their attention to user experience and payment integration was exceptional.",
      rating: 5,
      featured: true,
      published: true,
    },
    {
      name: "Mr. Emmanuel Ketaman Evortepe",
      title: "CEO Fafaa FM & President Duamenefa Foundation",
      company: "Dzodze",
      content: "From our website to the live streaming setup, Clipe Consult delivered everything perfectly. Our online viewers and listeners has grown. They understood the spiritual and technical needs of our ministry and exceeded all expectations.",
      rating: 5,
      featured: true,
      published: true,
    },
    {
      name: "Esi Dey",
      title: "Operations Manager",
      company: "Volta Health Services",
      content: "The patient management system they built for our healthcare facility has streamlined our operations remarkably. Appointment scheduling is now seamless, and our doctors can access patient records instantly. Their commitment to data security gave us complete confidence.",
      rating: 5,
      featured: true,
      published: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log(`✅ Seeded ${testimonials.length} testimonials`);

  // ─── Blog Posts ────────────────────────────────────────────────────────────
  // First create an admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "clipe233eng@gmail.com" },
    update: { name: "Clipe233 Admin", role: "admin" },
    create: { email: "clipe233eng@gmail.com", name: "Clipe233 Admin", role: "admin" },
  });

  const blogPosts = [
    {
      title: "The Rise of AI-Powered Business Solutions in West Africa",
      slug: "rise-of-ai-powered-business-solutions-west-africa",
      excerpt: "Artificial intelligence is transforming how businesses operate across West Africa. From chatbots handling customer service to predictive analytics driving strategic decisions, AI is no longer a future concept — it is here, and it is reshaping industries.",
      content: "Artificial intelligence is transforming how businesses operate across West Africa. From chatbots handling customer service to predictive analytics driving strategic decisions, AI is no longer a future concept — it is here, and it is reshaping industries.\n\nIn Ghana, Nigeria, and across the region, forward-thinking companies are adopting AI-powered tools to gain competitive advantages. Machine learning algorithms are helping banks detect fraud in real-time, natural language processing is enabling better customer service, and computer vision is revolutionizing quality control in manufacturing.\n\nThe key to successful AI implementation lies not in the technology itself, but in understanding the unique challenges and opportunities of the West African market. Solutions must be tailored to local contexts, languages, and business practices.\n\nAt Clipe Consult, we are at the forefront of this transformation, helping businesses harness AI to drive growth, efficiency, and innovation.",
      category: "AI & Automation",
      tags: "AI,West Africa,Business,Technology,Machine Learning",
      published: true,
      featured: true,
      authorId: adminUser.id,
      publishedAt: new Date("2025-05-15"),
    },
    {
      title: "5 Cybersecurity Best Practices Every Ghanaian Business Must Follow",
      slug: "cybersecurity-best-practices-ghanaian-business",
      excerpt: "With cyber threats becoming increasingly sophisticated, Ghanaian businesses can no longer afford to treat cybersecurity as an afterthought. Implementing robust security measures is essential for protecting data, maintaining trust, and ensuring business continuity.",
      content: "With cyber threats becoming increasingly sophisticated, Ghanaian businesses can no longer afford to treat cybersecurity as an afterthought. Implementing robust security measures is essential for protecting data, maintaining trust, and ensuring business continuity.\n\n1. Implement Multi-Factor Authentication (MFA)\nMFA adds an extra layer of security beyond passwords. Every employee account should require at least two forms of verification.\n\n2. Regular Security Audits\nConduct quarterly security assessments to identify vulnerabilities before attackers do. This includes penetration testing, code reviews, and infrastructure audits.\n\n3. Employee Training Programs\nHuman error remains the leading cause of security breaches. Regular training on phishing, social engineering, and safe computing practices is essential.\n\n4. Data Backup and Recovery Plans\nMaintain automated, encrypted backups with tested recovery procedures. A ransomware attack should never mean the end of your business.\n\n5. Network Segmentation\nDivide your network into isolated zones to limit the spread of potential breaches. Critical systems should be on separate, heavily monitored segments.",
      category: "Cybersecurity",
      tags: "Cybersecurity,Ghana,Business Security,Data Protection,Best Practices",
      published: true,
      featured: false,
      authorId: adminUser.id,
      publishedAt: new Date("2025-05-08"),
    },
    {
      title: "How Custom Software is Redefining SME Operations in Ghana",
      slug: "custom-software-redefining-sme-operations-ghana",
      excerpt: "Off-the-shelf software often falls short of meeting the unique needs of growing businesses. Custom software development is enabling Ghanaian SMEs to automate processes, reduce costs, and compete with larger organizations.",
      content: "Off-the-shelf software often falls short of meeting the unique needs of growing businesses. Custom software development is enabling Ghanaian SMEs to automate processes, reduce costs, and compete with larger organizations.\n\nGhana's SME sector is the backbone of the economy, yet many businesses still rely on manual processes or generic software that doesn't fit their workflows. Custom software changes this by providing solutions tailored to specific business needs.\n\nKey benefits include:\n- Automation of repetitive tasks, freeing up staff for higher-value work\n- Integration with existing systems and local payment platforms like Paystack and Mobile Money\n- Scalability to grow with the business without expensive license upgrades\n- Competitive advantage through unique digital capabilities\n\nAt Clipe Consult, we have helped numerous SMEs across Ghana transform their operations with custom software solutions that deliver measurable results.",
      category: "Software Trends",
      tags: "Custom Software,SME,Ghana,Automation,Digital Transformation",
      published: true,
      featured: false,
      authorId: adminUser.id,
      publishedAt: new Date("2025-04-28"),
    },
    {
      title: "Digital Marketing Strategies That Drive Real Results in 2025",
      slug: "digital-marketing-strategies-real-results-2025",
      excerpt: "The digital marketing landscape continues to evolve rapidly. From short-form video content to AI-driven personalization, businesses need to adapt their strategies to stay visible and engaging in an increasingly crowded digital space.",
      content: "The digital marketing landscape continues to evolve rapidly. From short-form video content to AI-driven personalization, businesses need to adapt their strategies to stay visible and engaging in an increasingly crowded digital space.\n\nHere are the strategies that are delivering real results in 2025:\n\n1. Short-Form Video Content\nPlatforms like TikTok and Instagram Reels continue to dominate. Businesses that create authentic, engaging short videos see significantly higher engagement rates.\n\n2. AI-Powered Personalization\nUsing AI to deliver personalized content, product recommendations, and email campaigns increases conversion rates by up to 30%.\n\n3. Local SEO Optimization\nFor Ghanaian businesses, local SEO is crucial. Optimizing for 'near me' searches and Google Business profiles drives foot traffic and local leads.\n\n4. Social Commerce\nSelling directly through social media platforms reduces friction in the customer journey and increases impulse purchases.\n\n5. Community Building\nBuilding engaged communities around your brand creates loyal customers and organic brand advocates.",
      category: "Digital Marketing",
      tags: "Digital Marketing,Strategy,2025,SEO,Social Media",
      published: true,
      featured: false,
      authorId: adminUser.id,
      publishedAt: new Date("2025-04-20"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ Seeded ${blogPosts.length} blog posts`);

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const settings = [
    { key: "site_name", value: "Clipe Consult" },
    { key: "site_description", value: "Engineering Digital Possibilities. We deliver innovative software, networking, branding, and digital transformation solutions for modern businesses." },
    { key: "site_keywords", value: "IT Solutions Ghana, Software Development, Website Design, Networking, IT Consultancy, Clipe233" },
    { key: "contact_email", value: "clipe233eng@gmail.com" },
    { key: "contact_phone", value: "+233 24 978 3736" },
    { key: "whatsapp_number", value: "233249783736" },
    { key: "address", value: "Ho, Volta Region, Ghana" },
    { key: "facebook_url", value: "" },
    { key: "twitter_url", value: "" },
    { key: "instagram_url", value: "" },
    { key: "linkedin_url", value: "" },
    { key: "google_analytics_id", value: "" },
    { key: "founded_year", value: "2016" },
    { key: "projects_completed", value: "200+" },
    { key: "happy_clients", value: "150+" },
    { key: "years_experience", value: "9+" },
    // Page metadata
    { key: "home_title", value: "Clipe Consult — IT & Engineering Solutions" },
    { key: "home_description", value: "Building Innovations, Engineering Excellence. Innovative software, networking, branding, and digital transformation solutions." },
    { key: "home_hero_heading", value: "Building Innovations, Engineering Excellence" },
    { key: "home_hero_subheading", value: "Clipe Consult delivers innovative software, networking, branding, and digital transformation solutions tailored for businesses and organizations across Ghana and beyond." },
    { key: "about_title", value: "About Clipe Consult" },
    { key: "about_description", value: "From our founding in 2016 as Clipe Technologies to our rebranding as Clipe Consult in 2025, we have been dedicated to engineering digital possibilities." },
    { key: "contact_title", value: "Contact Clipe Consult" },
    { key: "contact_description", value: "Get in touch with our team for innovative IT and engineering solutions." },
    { key: "clipe_pos_title", value: "Clipe POS — Point of Sale System" },
    { key: "clipe_pos_description", value: "A user-friendly Point of Sale application designed for businesses of all sizes." },
    { key: "clipe_medic_title", value: "Clipe Medic — Hospital Management System" },
    { key: "clipe_medic_description", value: "Advanced management software for hospitals, clinics, and doctors' offices." },
    { key: "clipe_pharma_title", value: "Clipe Pharma — Pharmacy Management" },
    { key: "clipe_pharma_description", value: "Complete pharmacy management solution for modern pharmacies." },
    { key: "clipe_complaint_title", value: "Clipe CMS — Complaint Management System" },
    { key: "clipe_complaint_description", value: "A comprehensive Complaint Management System for efficient grievance handling." },
    { key: "clipe_school_title", value: "Clipe School — School Management System" },
    { key: "clipe_school_description", value: "Comprehensive school management platform with student enrollment, grading, and attendance tracking." },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`✅ Seeded ${settings.length} site settings`);

  // ─── Job Openings ──────────────────────────────────────────────────────────
  const jobs = [
    {
      title: "Full-Stack Developer",
      slug: "full-stack-developer",
      department: "Engineering",
      location: "Ho, Ghana (Remote)",
      type: "full-time",
      description: "We are looking for a skilled Full-Stack Developer to join our growing team. You will be responsible for building and maintaining web applications using modern technologies like React, Next.js, and Node.js.",
      requirements: "3+ years experience with React/Next.js,Proficiency in TypeScript and Node.js,Experience with databases (PostgreSQL, MongoDB),Strong problem-solving skills,Excellent communication abilities",
      salary: "Competitive",
      published: true,
      deadline: new Date("2026-09-01"),
    },
    {
      title: "Network Engineer",
      slug: "network-engineer",
      department: "Infrastructure",
      location: "Ho, Ghana",
      type: "full-time",
      description: "Join our infrastructure team to design, install, and maintain network solutions for our clients. You will work on LAN/WAN setups, CCTV installations, and cybersecurity implementations.",
      requirements: "2+ years experience in network engineering,Cisco or equivalent certification,Knowledge of VPN, firewall, and security protocols,Experience with structured cabling,Ability to travel to client sites",
      salary: "Competitive",
      published: true,
      deadline: new Date("2026-08-15"),
    },
    {
      title: "Graphic Design Intern",
      slug: "graphic-design-intern",
      department: "Creative",
      location: "Ho, Ghana (Remote)",
      type: "internship",
      description: "An exciting opportunity for a creative individual to gain hands-on experience in graphic design. You will work on brand identity, social media graphics, and marketing materials for diverse clients.",
      requirements: "Portfolio showcasing design skills,Proficiency in Adobe Creative Suite or Figma,Strong visual design sense,Ability to take feedback and iterate,Passion for creative problem-solving",
      salary: "Allowance provided",
      published: true,
      deadline: new Date("2026-07-30"),
    },
  ];

  for (const job of jobs) {
    await prisma.jobOpening.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    });
  }
  console.log(`✅ Seeded ${jobs.length} job openings`);

  console.log("\n🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
