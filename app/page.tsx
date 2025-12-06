'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, Menu, X, Check, Handshake, User, Sparkles, 
  ShieldCheck, CheckCircle, Star, MessageCircle, RefreshCcw, 
  FileText, Home, ArrowRight, Mail, MapPin, Phone, ExternalLink, Send 
} from 'lucide-react';

// --- Data & Translations ---

type Lang = 'ko' | 'en';
type CurrentPage = 'home' | 'education';

const content: Record<Lang, any> = {
  ko: {
    nav: {
      about: '협회 소개',
      jobs: '주요 매칭 분야',
      education: '교육/자격 시스템', // Links to separate page
      support: '사후 관리',
      contact: '지원하기',
    },
    hero: {
      sub: 'Korea Foreign Employment Support Association',
      title: '한국에서 일하고자 하는 외국인의\n든든한 파트너',
      desc: '교육부터 취업, 그리고 정착까지.\nKFESA는 외국인의 한국 생활 전체를 함께 고민하고 지원합니다.',
      cta_jobs: '매칭 분야 보기',
      cta_edu: '교육 과정 자세히 보기',
    },
    about: {
      title: '협회 소개',
      subtitle: 'Introduction',
      main_text: 'KFESA는 단순히 일자리를 연결하는 기관이 아닙니다.',
      desc: '한국에서 일하고자 하는 외국인이 안정적으로 취업하고 정착할 수 있도록 교육, 자격관리, 취업 매칭, 생활 적응 지원 등 전체 과정을 체계적으로 돕는 외국인 전문 인력 협회입니다.',
      mission_title: 'KFESA의 사명',
      mission_desc: '외국인이 한국에서 안정적으로 생활하고 장기적인 미래를 설계할 수 있도록 돕는 것을 가장 중요한 가치로 삼습니다.',
      challenges: [
        '언어 및 문화 적응',
        '행정·서류 절차',
        '비자 및 근무 규정 이해',
        '취업 이후의 생활 안정'
      ]
    },
    jobs: {
      title: '주요 매칭 분야',
      subtitle: 'Job Placement Fields',
      desc: '한국 전역의 종합병원, 요양병원, 대학병원 등과 협력하여 외국인 근로자를 안전하게 배치합니다.',
      roles: [
        {
          title: '의료지원보조',
          en_title: 'Patient Support Assistant',
          desc: '의료행위 없음. 환자 안내, 이동 보조, 물품 전달 등 환자의 편의를 돕는 업무입니다.'
        },
        {
          title: '환경·위생 관리',
          en_title: 'Environmental Care Assistant',
          desc: '병원 및 요양시설의 청결을 유지하고 위생 환경을 관리하는 업무입니다.'
        },
        {
          title: '시설 지원·안내',
          en_title: 'Facility Support Assistant',
          desc: '시설 안전 관련 기본 업무와 내원객 안내 및 단순 시설 지원을 담당합니다.'
        }
      ],
      note: '모든 근무자는 사전 교육을 이수한 후 안정적으로 배치됩니다.'
    },
    support: {
      title: '취업 후 사후 관리',
      subtitle: 'Post-Employment Support',
      desc: '취업 이후에도 KFESA는 계속 함께합니다.',
      items: [
        { title: '고충 상담', desc: '근무 중 발생하는 문제 상담 및 조정' },
        { title: '재매칭 지원', desc: '근무지 변경 상담 및 재매칭 지원' },
        { title: '비자 안내', desc: '장기근무 및 비자 관련 규정 안내' },
        { title: '정착 지원', desc: '한국 생활 적응 및 정착 지원' }
      ]
    },
    education_page: {
      title: '교육 및 자격 시스템',
      subtitle: 'Education & Qualification System',
      intro: 'KFESA는 외국인 근로자가 현장에서 바로 활용할 수 있도록 실무 중심의 교육 과정을 운영합니다.',
      curriculum_title: '주요 교육 과정',
      curriculum: [
        { name: '의료지원보조 기초 교육', desc: '환자 케어 보조 및 병원 시스템 이해' },
        { name: '병원 환경·위생 관리 교육', desc: '감염 예방 및 위생 관리 수칙' },
        { name: '시설 안전 교육', desc: '기본 안전 수칙 및 비상 대응' },
        { name: '현장 실습', desc: '실제 근무 환경 사전 체험' },
        { name: '한국어 업무 회화', desc: '의료/복지 현장 필수 회화' },
        { name: '직무 관련 민간 자격', desc: '직무 전문성 입증을 위한 자격 과정' }
      ],
      effect: '교육은 한국 의료·복지 현장의 실무 요구에 맞추어 구성되어 근무 적응에 높은 효과를 보이고 있습니다.',
      back: '메인으로 돌아가기'
    },
    contact_section: {
      title: '지원 및 문의',
      subtitle: 'Apply & Contact',
      desc: 'KFESA와 함께 새로운 미래를 시작하세요.\n궁금한 점이 있다면 언제든 문의해 주세요.',
      apply: {
        title: '취업 신청서 작성',
        desc: '구글 폼을 통해 간편하게 지원할 수 있습니다.',
        button: '신청서 작성하기'
      },
      inquiry: {
        title: '이메일 문의',
        desc: '협회 활동이나 기타 궁금한 점을 메일로 보내주세요.',
        email: 'kfesa.office@gmail.com',
        button: '메일 보내기'
      }
    },
    footer: {
      contact_info: '문의',
      rights: 'All rights reserved.',
      registration: '법인번호',
      address: '서울특별시 강남구 압구정로2길 46'
    },
    floating: {
      label: '지원하기'
    }
  },
  en: {
    nav: {
      about: 'About Us',
      jobs: 'Job Fields',
      education: 'Education System', // Links to separate page
      support: 'Support',
      contact: 'Apply Now',
    },
    hero: {
      sub: 'Korea Foreign Employment Support Association',
      title: 'Your Trusted Partner for\nWorking & Living in Korea',
      desc: 'From education to employment and settlement.\nKFESA supports every step of your journey in Korea.',
      cta_jobs: 'View Job Fields',
      cta_edu: 'View Education Details',
    },
    about: {
      title: 'About KFESA',
      subtitle: 'Introduction',
      main_text: 'KFESA is not just a job placement organization.',
      desc: 'We are a professional partner helping foreigners in all aspects of their life in Korea, including education, qualification, job matching, and settlement support.',
      mission_title: 'Our Mission',
      mission_desc: 'Our most important value is helping foreign workers build a stable life and a long-term future in Korea.',
      challenges: [
        'Language & Cultural Adaptation',
        'Administrative Procedures',
        'Visa & Work Regulations',
        'Life Stability after Employment'
      ]
    },
    jobs: {
      title: 'Job Placement Fields',
      subtitle: 'Cooperating with Major Hospitals',
      desc: 'We place workers safely in General Hospitals, University Hospitals, and Care Facilities across Korea.',
      roles: [
        {
          title: 'Patient Support Assistant',
          en_title: '(Non-medical)',
          desc: 'No medical procedures. Assisting patient comfort, guidance, movement support, and item delivery.'
        },
        {
          title: 'Environmental Care Assistant',
          en_title: '(Hygiene Management)',
          desc: 'Maintaining facility cleanliness and managing environmental hygiene in hospitals.'
        },
        {
          title: 'Facility Support Assistant',
          en_title: '(Safety & Guidance)',
          desc: 'Basic safety support tasks, guidance for visitors, and simple facility management.'
        }
      ],
      note: 'All workers are placed after completing required training.'
    },
    support: {
      title: 'Post-Employment Support',
      subtitle: 'We are with you all the way',
      desc: 'KFESA continues to support workers even after employment starts.',
      items: [
        { title: 'Counseling', desc: 'Issue resolution & counseling during employment' },
        { title: 'Rematching', desc: 'Workplace relocation & rematching support' },
        { title: 'Visa Guidance', desc: 'Guidance on visas & long-term employment' },
        { title: 'Settlement', desc: 'Daily life & settlement support' }
      ]
    },
    education_page: {
      title: 'Education & Qualification',
      subtitle: 'Practical Training System',
      intro: 'KFESA provides practical, field-oriented training programs designed for immediate application.',
      curriculum_title: 'Core Curriculum',
      curriculum: [
        { name: 'Basic Patient Support', desc: 'Basics of patient care assistance' },
        { name: 'Hygiene & Environment', desc: 'Hospital hygiene standards & infection control' },
        { name: 'Facility Safety', desc: 'Safety protocols & emergency response' },
        { name: 'On-site Practice', desc: 'Practical experience in real environments' },
        { name: 'Workplace Korean', desc: 'Essential communication for medical fields' },
        { name: 'Private Certification', desc: 'Job-related certification training' }
      ],
      effect: 'The curriculum is designed based on real needs in Korean medical and care institutions.',
      back: 'Back to Home'
    },
    contact_section: {
      title: 'Apply & Contact',
      subtitle: 'Get Started',
      desc: 'Start your new future with KFESA.\nPlease feel free to contact us if you have any questions.',
      apply: {
        title: 'Apply for Job',
        desc: 'You can easily apply via the Google Form.',
        button: 'Fill out Application'
      },
      inquiry: {
        title: 'Email Inquiry',
        desc: 'Send us an email for general inquiries.',
        email: 'kfesa.office@gmail.com',
        button: 'Send Email'
      }
    },
    footer: {
      contact_info: 'Contact',
      rights: 'All rights reserved.',
      registration: 'Business Registration',
      address: '46, Apgujeong-ro 2-gil, Gangnam-gu, Seoul'
    },
    floating: {
      label: 'Apply Now'
    }
  }
};

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScipNf_QdUo-fsWSOq1OmxaVRjWPdqd2pe301pJpxmkix-HcQ/viewform?usp=header";

// --- Components ---

const Header = ({ lang, setLang, currentPage, setCurrentPage }: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  currentPage: CurrentPage;
  setCurrentPage: (page: CurrentPage) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }} 
            className="flex items-center gap-2 group cursor-pointer"
          >
             <img 
              src="/kfesa_logo.png" 
              alt="KFESA Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = document.getElementById('fallback-logo-icon');
                if(fallback) fallback.style.display = 'flex';
              }}
            />
            <div id="fallback-logo-icon" className="w-10 h-10 bg-[#0f4c81] rounded-full hidden items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-[#0f4c81] leading-none">KFESA</h1>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider">한국외국인일자리협회</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavClick('about')} className="text-slate-600 hover:text-[#0f4c81] font-medium transition-colors">
              {t.about}
            </button>
            <button onClick={() => handleNavClick('jobs')} className="text-slate-600 hover:text-[#0f4c81] font-medium transition-colors">
              {t.jobs}
            </button>
            <button onClick={() => handleNavClick('support')} className="text-slate-600 hover:text-[#0f4c81] font-medium transition-colors">
              {t.support}
            </button>
            <button 
              onClick={() => setCurrentPage('education')} 
              className={`font-medium transition-colors ${currentPage === 'education' ? 'text-[#0f4c81] font-bold' : 'text-slate-600 hover:text-[#0f4c81]'}`}
            >
              {t.education}
            </button>

            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 ml-4">
              <button 
                onClick={() => setLang('ko')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ko' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-500 hover:text-[#0f4c81]'}`}
              >
                KR
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-500 hover:text-[#0f4c81]'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Lang Toggle */}
             <div className="flex items-center bg-slate-100 rounded-full p-1">
              <button onClick={() => setLang('ko')} className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${lang === 'ko' ? 'bg-[#0f4c81] text-white' : 'text-slate-500'}`}>K</button>
              <button onClick={() => setLang('en')} className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${lang === 'en' ? 'bg-[#0f4c81] text-white' : 'text-slate-500'}`}>E</button>
            </div>
            <button 
              className="text-slate-600 hover:text-[#0f4c81]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full h-screen">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <button onClick={() => handleNavClick('about')} className="block w-full text-left px-3 py-4 text-lg font-medium text-slate-600 border-b border-slate-50">
              {t.about}
            </button>
            <button onClick={() => handleNavClick('jobs')} className="block w-full text-left px-3 py-4 text-lg font-medium text-slate-600 border-b border-slate-50">
              {t.jobs}
            </button>
            <button 
              onClick={() => { setCurrentPage('education'); setIsMenuOpen(false); }} 
              className="block w-full text-left px-3 py-4 text-lg font-medium text-[#0f4c81] bg-slate-50"
            >
              {t.education}
            </button>
            <button onClick={() => handleNavClick('support')} className="block w-full text-left px-3 py-4 text-lg font-medium text-slate-600 border-b border-slate-50">
              {t.support}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = ({ lang, setCurrentPage }: {
  lang: Lang;
  setCurrentPage: (page: CurrentPage) => void;
}) => {
  const t = content[lang].hero;
  return (
    <section className="relative pt-20 h-[600px] md:h-[700px] flex items-center justify-center text-center text-white bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Diverse team" 
          className="w-full h-full object-cover opacity-40"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1920x800/0f4c81/ffffff?text=KFESA'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f4c81]/90 to-[#002f55]/80 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 animate-fade-in-up">
        <h2 className="font-semibold tracking-wider mb-4 text-[#20b2aa] text-sm md:text-lg uppercase">{t.sub}</h2>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight drop-shadow-md whitespace-pre-line">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
          {t.desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#20b2aa] hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
          >
            {content[lang].nav.contact} <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => setCurrentPage('education')} 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0f4c81] text-white font-bold py-4 px-10 rounded-full transition duration-300 text-lg"
          >
            {t.cta_edu}
          </button>
        </div>
      </div>
    </section>
  );
};

const About = ({ lang }: { lang: Lang }) => {
  const t = content[lang].about;
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <span className="text-[#0f4c81] font-bold tracking-widest uppercase mb-2 block text-sm">{t.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-snug">
              {t.title}
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p className="font-medium text-[#0f4c81] text-xl">
                {t.main_text}
              </p>
              <p>
                {t.desc}
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-[#20b2aa] mt-6">
                <h4 className="font-bold text-slate-800 mb-2">{t.mission_title}</h4>
                <p className="text-sm">
                  {t.mission_desc}
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700 mt-4">
                {t.challenges.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check size={18} className="text-[#20b2aa]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative order-1 lg:order-2">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#20b2aa] rounded-full opacity-20 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Consulting" 
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Jobs = ({ lang }: { lang: Lang }) => {
  const t = content[lang].jobs;
  const icons = [<User size={32} />, <Sparkles size={32} />, <ShieldCheck size={32} />];

  return (
    <section id="jobs" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#20b2aa] font-bold tracking-wider uppercase">{t.subtitle}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-[#0f4c81]">{t.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.roles.map((role: any, index: number) => (
            <div key={index} className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition duration-300 border border-slate-200 hover:border-[#0f4c81]">
              <div className="w-16 h-16 bg-blue-50 text-[#0f4c81] rounded-xl flex items-center justify-center mb-6 transition group-hover:bg-[#0f4c81] group-hover:text-white">
                {icons[index]}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">{role.title}</h3>
              <p className="text-sm font-semibold text-[#20b2aa] mb-4">{role.en_title}</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {role.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center bg-[#0f4c81]/5 p-6 rounded-xl border border-[#0f4c81]/10">
          <p className="text-lg text-[#0f4c81] font-medium flex items-center justify-center gap-2">
             <CheckCircle size={20} /> {t.note}
          </p>
        </div>
      </div>
    </section>
  );
};

const Support = ({ lang }: { lang: Lang }) => {
  const t = content[lang].support;
  const icons = [<MessageCircle />, <RefreshCcw />, <FileText />, <Home />];

  return (
    <section id="support" className="py-20 bg-[#0f4c81] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#20b2aa] font-bold tracking-wider uppercase text-sm mb-2 block">{t.subtitle}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {t.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition group">
              <div className="w-12 h-12 bg-white text-[#0f4c81] rounded-full flex items-center justify-center mx-auto mb-4 text-xl shadow-md group-hover:scale-110 transition-transform">
                {React.cloneElement(icons[idx], { size: 24 })}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-blue-100">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ lang }: { lang: Lang }) => {
  const t = content[lang].contact_section;

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#20b2aa] font-bold tracking-wider uppercase text-sm mb-2 block">{t.subtitle}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 whitespace-pre-line">{t.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg whitespace-pre-line">{t.desc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Google Form Application Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#20b2aa] rounded-full opacity-10 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-16 h-16 bg-[#20b2aa]/10 text-[#20b2aa] rounded-full flex items-center justify-center mb-6">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{t.apply.title}</h3>
              <p className="text-slate-500 mb-8 flex-grow">{t.apply.desc}</p>
              
              <a 
                href={GOOGLE_FORM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#20b2aa] hover:bg-teal-600 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                {t.apply.button} <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Email Inquiry Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f4c81] rounded-full opacity-10 -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
             <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-16 h-16 bg-[#0f4c81]/10 text-[#0f4c81] rounded-full flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{t.inquiry.title}</h3>
              <p className="text-slate-500 mb-4 flex-grow">{t.inquiry.desc}</p>
              <p className="font-bold text-lg text-slate-700 mb-6 bg-slate-50 px-4 py-2 rounded-lg">{t.inquiry.email}</p>
              
              <a 
                href={`mailto:${t.inquiry.email}`}
                className="w-full py-4 bg-[#0f4c81] hover:bg-blue-900 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                {t.inquiry.button} <Send size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationPage = ({ lang, setCurrentPage }: {
  lang: Lang;
  setCurrentPage: (page: CurrentPage) => void;
}) => {
  const t = content[lang].education_page;

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <button 
            onClick={() => setCurrentPage('home')}
            className="mb-8 inline-flex items-center text-slate-500 hover:text-[#0f4c81] font-medium transition"
          >
            <ArrowRight className="rotate-180 mr-2" size={20} /> {t.back}
          </button>
          <span className="text-[#0f4c81] font-bold tracking-wider uppercase block mb-2">{t.subtitle}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.title}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">{t.intro}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Curriculum */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-bold text-[#0f4c81] mb-8 flex items-center gap-3 border-b pb-4">
              <FileText size={28} /> {t.curriculum_title}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {t.curriculum.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition hover:border-[#20b2aa]">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-[#0f4c81] p-3 rounded-lg">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2">{item.name}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-[#20b2aa]/10 p-6 rounded-xl border border-[#20b2aa]/30">
              <p className="text-[#0f4c81] font-medium text-lg text-center">
                <Star className="inline mb-1 mr-2 text-[#20b2aa]" fill="#20b2aa" />
                {t.effect}
              </p>
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-[#0f4c81] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <h4 className="text-xl font-bold mb-4 relative z-10">System Highlights</h4>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Check size={16}/></div>
                    <span className="font-medium">Practical Training</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Check size={16}/></div>
                    <span className="font-medium">Safety First</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Check size={16}/></div>
                    <span className="font-medium">Language Support</span>
                  </li>
                </ul>
             </div>
             
             <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
               <h4 className="text-lg font-bold text-slate-800 mb-4">Contact for Education</h4>
               <p className="text-slate-600 mb-6 text-sm">
                 교육 과정 및 일정에 대한 상세한 문의는 아래 메일로 연락주세요.
               </p>
               <a href="mailto:kfesa.office@gmail.com" className="flex items-center gap-3 text-[#0f4c81] font-bold hover:underline">
                 <Mail size={20} /> kfesa.office@gmail.com
               </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ lang }: { lang: Lang }) => {
  const t = content[lang].footer;
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Footer Logo Image with white background for visibility */}
            <div className="bg-white p-1 rounded-md overflow-hidden">
              <img 
                src="/kfesa_logo.png" 
                alt="KFESA Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                    const fallback = document.getElementById('footer-fallback-icon');
                    if(fallback) fallback.style.display = 'block';
                }}
              />
            </div>
            {/* Fallback for Footer */}
            <Globe id="footer-fallback-icon" className="text-[#0f4c81] hidden" size={24} />
            
            <div>
              <span className="text-white font-bold text-lg block">KFESA</span>
              <span className="text-xs">Korea Foreign Employment Support Association</span>
            </div>
          </div>
          
          <div className="text-sm text-center md:text-right">
            <p className="mb-1">{t.registration}: 133-82-74512</p>
            <p className="mb-1">{t.address}</p>
            <p className="mb-2"><span className="text-white font-bold">{t.contact_info}:</span> kfesa.office@gmail.com</p>
            <p>&copy; {new Date().getFullYear()} KFESA. {t.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingButton = ({ lang }: { lang: Lang }) => {
  const t = content[lang].floating;
  return (
    <a 
      href={GOOGLE_FORM_URL} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 group"
    >
      <span className="bg-white text-[#0f4c81] px-4 py-2 rounded-lg shadow-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 hidden md:block">
        {t.label}
      </span>
      <div className="bg-[#f59e0b] hover:bg-amber-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform group-hover:scale-110 cursor-pointer animate-bounce-slow">
        <FileText size={28} />
      </div>
    </a>
  );
};

// --- Main App ---

const App = () => {
  const [lang, setLang] = useState<Lang>('ko');
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home'); // 'home' or 'education'

  return (
    <div className="font-sans text-slate-700 bg-white min-h-screen relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Poppins:wght@400;600;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Noto Sans KR', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', 'Noto Sans KR', sans-serif; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
      
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero lang={lang} setCurrentPage={setCurrentPage} />
            <About lang={lang} />
            <Jobs lang={lang} />
            <Support lang={lang} />
            <ContactSection lang={lang} />
            
            {/* Goal / Closing Section */}
            <section className="py-20 bg-white text-center">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                   KFESA Goals
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
                  {lang === 'ko' 
                    ? "한국외국인일자리협회(KFESA)는 한국에서 일하고자 하는 외국인에게 실질적인 기회와 신뢰할 수 있는 지원을 제공하는 것을 목표로 합니다."
                    : "KFESA aims to provide real opportunities and reliable support for foreigners seeking employment in Korea."
                  }
                </p>
              </div>
            </section>
          </>
        ) : (
          <EducationPage lang={lang} setCurrentPage={setCurrentPage} />
        )}
      </main>

      <FloatingButton lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default App;