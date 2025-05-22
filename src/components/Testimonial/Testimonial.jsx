import React from "react";

const testimonialData = [
  {
    name: "أحمد",
    image: "",
    description: "خدمة ممتازة وسهولة في الحجز والتعامل. أنصح الجميع بتجربتها!",
    aosDelay: "0",
  },
  {
    name: "سارة",
    image: "",
    description: "السيارات نظيفة وفريق العمل متعاون جدًا. تجربة رائعة!",
    aosDelay: "300",
  },
  {
    name: "محمد",
    image: "",
    description: "أفضل شركة تأجير سيارات تعاملت معها. أسعار مناسبة وخدمة سريعة.",
    aosDelay: "1000",
  },
];

const Testimonial = () => {
  return (
    <>
      <span id="about" />
      <div className="dark:bg-black dark:text-white py-20 sm:pb-32 relative overflow-hidden" dir="rtl">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
        
        <div className="container relative z-10">
          {/* Header */}
          <div className="space-y-4 pb-16">
            <h2
              data-aos="fade-up"
              className="text-4xl font-bold text-center sm:text-5xl font-serif bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            >
              ماذا يقول عملاؤنا عنا
            </h2>
            <p 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              آراء عملائنا هي مصدر فخرنا ودافعنا لتقديم الأفضل دائمًا.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonialData.map((testimonial) => (
              <div
                key={testimonial.name}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}
                className="card text-center group space-y-4 p-8 bg-white dark:bg-white/10 hover:bg-primary/5 dark:hover:bg-primary/10 duration-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <div className="grid place-items-center">
                  <img
                    src="https://picsum.photos/200"
                    alt="صورة عميل"
                    className="rounded-full w-24 h-24 object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  />
                </div>
                <div className="text-2xl text-yellow-400">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {testimonial.description}
                </p>
                <p className="text-xl font-bold text-primary">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
