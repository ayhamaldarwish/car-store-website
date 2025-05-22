import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";
import { Link } from "react-router-dom";

const skillsData = [
  {
    name: "أفضل الأسعار",
    icon: (
      <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    description: "نقدم لك أفضل الأسعار والعروض على جميع السيارات.",
    aosDelay: "0",
  },
  {
    name: "سرعة وأمان",
    icon: (
      <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    description: "خدمة سريعة وآمنة تضمن راحتك وطمأنينتك في كل رحلة.",
    aosDelay: "500",
  },
  {
    name: "سائقون محترفون",
    icon: (
      <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    description: "فريق من السائقين ذوي الخبرة لخدمتك على مدار الساعة.",
    aosDelay: "1000",
  },
];

const Services = () => {
  return (
    <>
      <span id="about" />
      <div className="dark:bg-black dark:text-white py-20 sm:min-h-[600px] sm:grid sm:place-items-center relative overflow-hidden" dir="rtl">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
        
        <div className="container relative z-10">
          <div className="pb-16">
            <h1
              data-aos="fade-up"
              className="text-4xl font-bold text-center sm:text-5xl font-serif bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            >
              لماذا نحن؟
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="text-center text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              نقدم خدمات متميزة تلبي جميع احتياجاتك في مجال تأجير السيارات
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-4 p-8 bg-white dark:bg-white/10 hover:bg-primary dark:hover:bg-primary/20 duration-300 text-black dark:text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <div className="grid place-items-center p-4 bg-primary/10 dark:bg-primary/20 rounded-full w-20 h-20 mx-auto group-hover:bg-white/20">
                  {skill.icon}
                </div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
                <Link
                  to="/about"
                  className="inline-block text-lg font-semibold py-2 text-primary group-hover:text-black duration-300 hover:underline"
                >
                  اعرف المزيد
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
