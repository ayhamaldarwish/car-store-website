import AppStoreImg from "../../assets/website/app_store.png";
import PlayStoreImg from "../../assets/website/play_store.png";
import pattern from "../../assets/website/pattern.jpeg";
import { Link } from "react-router-dom";

const bannerImg = {
  backgroundImage: `url(${pattern})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};
const AppStoreBanner = () => {
  return (
    <div className="container" dir="rtl">
      <div
        className=" text-black py-10 sm:min-h-[400px] sm:grid sm:place-items-center rounded-xl"
        style={bannerImg}
      >
        <div>
          <div className="space-y-6 max-w-xl mx-auto text-center">
            <h1
              data-aos="fade-up"
              className="text-2xl text-center sm:text-4xl font-semibold font-serif"
            >
              احصل على تطبيقنا الآن
            </h1>
            <p data-aos="fade-up" className="text-center sm:px-20">
              حمل تطبيقنا الآن للاستفادة من أفضل العروض وتجربة حجز سيارات لا مثيل لها.
            </p>
            <div
              data-aos="fade-up"
              className="flex flex-wrap justify-center items-center gap-4"
            >
              <Link to="#">
                <img
                  src={PlayStoreImg}
                  alt="متجر جوجل بلاي"
                  className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                />
              </Link>
              <Link to="#">
                <img
                  src={AppStoreImg}
                  alt="متجر التطبيقات (آبل)"
                  className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppStoreBanner;
