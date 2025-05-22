import { FaCar, FaUsers, FaAward, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 relative overflow-hidden" dir="rtl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            نحن نقدم أفضل خدمات تأجير السيارات مع ضمان الجودة والموثوقية
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div data-aos="fade-up" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center text-5xl text-primary mb-4">
              <FaCar />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">500+</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">سيارة متاحة</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="150" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center text-5xl text-primary mb-4">
              <FaUsers />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">10,000+</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">عميل سعيد</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center text-5xl text-primary mb-4">
              <FaAward />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">15+</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">سنوات خبرة</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="450" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center items-center text-5xl text-primary mb-4">
              <FaHandshake />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">24/7</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">دعم فني</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="slide-right" data-aos-duration="1000">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              قصتنا
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              بدأت رحلتنا في عام 2008 مع رؤية واضحة لتقديم خدمة تأجير سيارات استثنائية. على مر السنين، نمت شركتنا لتصبح واحدة من أكبر شركات تأجير السيارات في المنطقة.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              نحن نؤمن بأن تجربة تأجير السيارة يجب أن تكون سهلة وممتعة. لذلك، قمنا ببناء أسطول متنوع من السيارات الفاخرة والرياضية والعائلية لتلبية احتياجات جميع عملائنا.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              مع فريقنا المتميز وخدمة العملاء الممتازة، نسعى دائماً لتقديم أفضل تجربة تأجير سيارات لعملائنا الكرام.
            </p>
          </div>
          <div data-aos="slide-left" data-aos-duration="1000" className="relative">
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Our Story"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              رؤيتنا
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              نسعى لأن نكون الخيار الأول في تأجير السيارات من خلال تقديم خدمة استثنائية ومركبات عالية الجودة.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              مهمتنا
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              تقديم حلول تنقل موثوقة ومريحة لعملائنا مع ضمان أعلى معايير الجودة والسلامة.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              قيمنا
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              نؤمن بالشفافية والموثوقية والابتكار في كل ما نقوم به، مع التركيز على رضا العملاء.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 