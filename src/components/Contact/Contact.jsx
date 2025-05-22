import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <span id="contact" />
      <div data-aos="zoom-in" className="dark:bg-black dark:text-white py-14" dir="rtl">
        <div className="container ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-800 py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                تواصل معنا لمشروع تأجير سيارتك القادم
              </h1>
              <p className="text-gray-400">
                نحن هنا لمساعدتك في كل ما تحتاجه من استفسارات أو دعم. لا تتردد في التواصل معنا في أي وقت.
              </p>
            </div>
            <div className="sm:grid sm:place-items-center">
              <Link
                to="/contact-us"
                className="inline-block font-semibold py-2 px-6 bg-primary text-white hover:bg-primary/80 duration-200 tracking-widest uppercase "
              >
                تواصل الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
