"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  Users,
  Award,
  MapPin,
  Radio,
} from "lucide-react";

const timelineItems = [
  {
    year: "2016",
    title: "Founded as Clipe Technologies",
    description:
      "Clipe Technologies (Clipetech) was initiated on 20th April, 2016 in a dorm studio of Kull FM, in Ho. From these humble beginnings, the company set out with a clear emphasis on software development, website designing, graphic designing, network installation, software/hardware supply and consultations in different fields utilizing Information Technology.",
  },
  {
    year: "2025",
    title: "Rebranded as Clipe233 Engineers",
    description:
      "In 2025, Clipe Technologies (Clipetech) was rebranded and officially registered as Clipe233 Engineers. The rebrand marked a new era of growth, reflecting evolved capabilities and a renewed commitment to providing quality orientated products and services to each and every client that it services.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and creative approaches to solve complex business challenges, constantly pushing the boundaries of what is possible.",
  },
  {
    icon: Shield,
    title: "Quality Orientation",
    description:
      "We aim to provide quality orientated products and services to each and every client that we service, ensuring every deliverable meets the highest standards of excellence.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description:
      "We are committed to delivering exceptional quality in every solution we build, ensuring reliability, performance, and user satisfaction.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Our process involves direct interaction between our expert project team and yours. With your feedback and a stimulating back-and-forth dynamics, we refine our work to deliver high-value, measurable results.",
  },
  {
    icon: Heart,
    title: "Youthful Passion",
    description:
      "Our youthful passion drives us to help businesses, companies and entities understand, build and express their message to support communication and business processes into a single marketing strategy.",
  },
  {
    icon: Award,
    title: "African Excellence",
    description:
      "We take pride in our roots, showcasing African tech talent on the global stage and building solutions that address local and continental challenges.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-falu/3 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-falu/2 blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-falu-light text-sm font-semibold tracking-wider uppercase font-[family-name:var(--font-inter)]">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 font-[family-name:var(--font-poppins)]">
            From Clipetech to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-falu-light to-red-400">
              Clipe233 Engineers
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
            What started in a dorm studio of Kull FM in Ho has grown into a
            trusted IT and engineering firm. Our story is one of passion,
            resilience, and an unwavering commitment to engineering digital
            possibilities for businesses across Ghana.
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12">
            {/* Origin */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Radio className="h-6 w-6 text-falu-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
                  Our Origin
                </h3>
                <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                  Clipe Technologies (Clipetech) was initiated on 20th April,
                  2016 in a dorm studio of Kull FM, in Ho with clear emphasis
                  in software development, website designing, graphic
                  designing, network installation, software/hardware supply and
                  consultations in different fields utilizing Information
                  Technology.
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-falu/20 to-transparent my-6" />

            {/* Rebrand */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="h-6 w-6 text-falu-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
                  Our Evolution
                </h3>
                <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                  In 2025, Clipe Technologies (Clipetech) was rebranded and
                  officially registered as Clipe233 Engineers. The company aims
                  to provide quality orientated products and services to each
                  and every client that it services.
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-falu/20 to-transparent my-6" />

            {/* Philosophy */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="h-6 w-6 text-falu-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
                  Our Philosophy
                </h3>
                <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                  The company&apos;s youthful passion is to help businesses,
                  companies and entities understand, build and express their
                  message to support communication and business processes into a
                  single marketing strategy. As technology and applications
                  develop, questions arise about the implementation of the
                  latest and greatest. Our select team of strategists, networking
                  engineers, website developers and programmers combine
                  extensive experience and skills to answer those questions.
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-falu/20 to-transparent my-6" />

            {/* Process */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-6 w-6 text-falu-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
                  Our Process
                </h3>
                <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                  Our process involves direct interaction between our expert
                  project team and yours. With your feedback and a stimulating
                  back-and-forth dynamics, we refine our work to deliver
                  high-value, measurable results always ensuring more efficient
                  relations.
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-falu/20 to-transparent my-6" />

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-falu/20 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="h-6 w-6 text-falu-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
                  Our Location
                </h3>
                <p className="text-gray-500 dark:text-silver/70 font-[family-name:var(--font-inter)] leading-relaxed">
                  Clipe233 Engineers main office is operated virtually from Ho,
                  in the Volta Region of Ghana.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Our Journey
          </h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-falu/50 via-falu/20 to-transparent" />

            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-falu-light glow-red-sm mt-2 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <span className="text-falu-light font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-semibold mt-1 mb-3 font-[family-name:var(--font-poppins)]">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 dark:text-silver/60 font-[family-name:var(--font-inter)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="glass-card rounded-xl p-6 hover-lift group"
              >
                <div className="w-12 h-12 rounded-lg bg-falu/20 flex items-center justify-center mb-4 group-hover:bg-falu/30 transition-colors">
                  <value.icon className="h-6 w-6 text-falu-light" />
                </div>
                <h4 className="text-lg font-semibold mb-2 font-[family-name:var(--font-poppins)]">
                  {value.title}
                </h4>
                <p className="text-gray-500 dark:text-silver/60 text-sm font-[family-name:var(--font-inter)] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          id="team"
          className="scroll-mt-24"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Our Team
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Raymond Romeo Dravie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-falu/30 glow-red-sm mb-4">
                  <img
                    src="/team-raymond.jpg"
                    alt="Eng. Raymond Romeo Dravie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold font-[family-name:var(--font-poppins)]">
                  Raymond Romeo Dravie
                </h4>
                <span className="text-falu-light font-semibold text-xs font-[family-name:var(--font-inter)] mt-1">
                  CEO, Founder & Snr. Engineer
                </span>
              </div>

              <p className="text-gray-500 dark:text-silver/70 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4">
                Has more than 7 years experience in ICT with a strong
                background in Algorithmic Designs, Data Centers, IT
                Infrastructure, Software Development, Network, Management and
                Leadership. He has been the key personnel in many project
                executions in Clipe233 Engineers and took part in the
                development of most of our products.
              </p>

              <div>
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Expertise:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Knowledge and experience in Networking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Programming & Databases: C++, PHP, CSS, JavaScript, VB.NET, Java, MySQL
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Website Development: WordPress, Joomla, Drupal
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Qualifications:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Certificate in Cyber Intelligence and Malware
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Diploma in Hardware and Networking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    BSc ICT — Presbyterian University College, Ghana
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    BSc IT — Ghana Communication Technology University
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Frank Hope Tachie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-falu/30 glow-red-sm mb-4">
                  <img
                    src="/team-frank.jpg"
                    alt="Eng. Frank Hope Tachie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold font-[family-name:var(--font-poppins)]">
                  Frank Hope Tachie
                </h4>
                <span className="text-falu-light font-semibold text-xs font-[family-name:var(--font-inter)] mt-1">
                  Co-Founder & Snr. Engineer
                </span>
              </div>

              <p className="text-gray-500 dark:text-silver/70 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4">
                Results-driven IT expert with 4+ years of experience in ICT,
                education, and network architecture. Skilled in designing
                secure networks, developing software, and leading projects.
              </p>

              <div>
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Expertise:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Network Architecture and Security
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Software Development & IT Infrastructure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Data Centers & Integrated Digital Systems (IDS)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Leadership and Project Management
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Qualifications:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Certificate in Hardware & Networking, Cybersecurity, and Malware Intrusion
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    BSc Information Technology (ICT) — GCTU
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Technical Skills:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Programming: C++, PHP, JavaScript, Java
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Database: MySQL
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Web Development: WordPress, Joomla, Drupal
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Senyo Kofi Dzakah */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-falu/30 glow-red-sm mb-4">
                  <img
                    src="/team-senyo.jpg"
                    alt="Senyo Kofi Dzakah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold font-[family-name:var(--font-poppins)]">
                  Senyo Kofi Dzakah
                </h4>
                <span className="text-falu-light font-semibold text-xs font-[family-name:var(--font-inter)] mt-1">
                  Admin and Finance
                </span>
              </div>

              <p className="text-gray-500 dark:text-silver/70 text-sm font-[family-name:var(--font-inter)] leading-relaxed mb-4">
                Ten (10) years experience in Accounting and Administration
                across both Small and Medium Enterprises and Construction. He
                has been the key in managing finances of Battis Company Limited
                on various projects. Currently the Director of Finance and
                Administration of Miai Ltd Company, which majors in the
                construction of roads and Agriculture products and Services.
              </p>

              <div>
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Expertise:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Monitory and Execution of projects from start to finish
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Knowledge in accounting software like Tally and QuickBooks
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-gray-900 dark:text-white font-semibold text-xs mb-1.5 font-[family-name:var(--font-inter)]">
                  Qualifications:
                </h5>
                <ul className="text-gray-500 dark:text-silver/60 text-xs font-[family-name:var(--font-inter)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Institute of Chartered Accountant Ghana (Associate Member)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Bachelor of Commerce, University of Cape Coast
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-falu-light mt-1.5 flex-shrink-0" />
                    Higher National Diploma (HND), Accounting — Ho Polytechnic
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
