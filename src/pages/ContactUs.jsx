import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 relative overflow-hidden" dir="rtl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            تواصل معنا
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في حجز سيارتك المثالية.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div data-aos="fade-up" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl text-primary mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">info@carrental.com</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="150" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl text-primary mb-4">
              <FaPhone />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">الهاتف</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">+90 5396700366</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl text-primary mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">العنوان</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">اسطنبول، تركيا</p>
          </div>
        </div>

        {/* Map Section */}
        <div data-aos="fade-up" data-aos-delay="400" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16">
           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 p-6">موقعنا على الخريطة</h2>
           <div className="w-full h-96">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.662276348801!2d28.97835931575942!3d41.008237579302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cf9703806b481f%3A0x2e69f1b4a429d3!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1678879171428!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعنا على الخريطة - اسطنبول، تركيا">
            </iframe>
           </div>
        </div>

        {/* Contact Form Section */}
        <div data-aos="fade-up" data-aos-delay="450" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">أرسل لنا رسالة</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
              <input type="text" id="name" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300" placeholder="أدخل اسمك الكامل" />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300" placeholder="أدخل بريدك الإلكتروني" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">رسالتك</label>
              <textarea id="message" rows="4" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300" placeholder="اكتب رسالتك هنا" />
            </div>
            <div className="md:col-span-2 text-center mt-4">
              <button type="submit" className="bg-primary hover:bg-primary/90 text-black font-medium py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30 text-lg">
                إرسال الرسالة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 