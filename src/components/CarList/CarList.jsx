import { useState } from "react";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";
import { FaGasPump, FaRoad, FaInfoCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const carList = [
  {
    name: "بي إم دبليو UX",
    price: 100,
    image: whiteCar,
    aosDelay: "0",
    fuel: "بنزين",
    mileage: "12 كم",
    transmission: "أوتوماتيك",
    seats: 5,
    description: "سيارة بي إم دبليو UX فاخرة ومريحة، مثالية للتنقلات اليومية.",
  },
  {
    name: "كيا UX",
    price: 140,
    image: car2,
    aosDelay: "500",
    fuel: "ديزل",
    mileage: "15 كم",
    transmission: "أوتوماتيك",
    seats: 5,
    description: "كيا UX عملية واقتصادية في استهلاك الوقود، خيار رائع للعائلات.",
  },
  {
    name: "بي إم دبليو UX",
    price: 100,
    image: car3,
    aosDelay: "1000",
    fuel: "كهرباء",
    mileage: "10 كم",
    transmission: "أوتوماتيك",
    seats: 4,
    description: "بي إم دبليو UX الكهربائية، صديقة للبيئة وتوفر تجربة قيادة سلسة.",
  }
];

const CarList = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

  const handleViewDetails = (car) => {
    setSelectedCarDetails(car);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedCarDetails(null);
  };

  return (
    <div className="pb-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden" dir="rtl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1
            data-aos="fade-up"
            className="text-4xl sm:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          >
            سياراتنا المميزة
          </h1>
          <p data-aos="fade-up" data-aos-delay="400" className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            اختر من مجموعتنا الواسعة من السيارات الفاخرة والمميزة
          </p>
        </div>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {carList.map((data, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-105"
              >
                <div className="relative p-6">
                  <div className="absolute top-4 left-4 bg-primary/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-primary shadow-md">
                    <FaRoad className="inline-block ml-1" /> {data.mileage}
                  </div>
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-[180px] object-contain transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
                    <span className="text-primary font-bold text-xl">{data.price}$ / يوم</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-lg">
                    <FaGasPump className="ml-2 text-primary" />
                    <span>{data.fuel}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-lg">
                    <FaRoad className="ml-2 text-primary" />
                    <span>{data.transmission}</span>
                  </div>
                   <div className="flex items-center text-gray-600 dark:text-gray-300 text-lg">
                    <FaInfoCircle className="ml-2 text-primary" />
                    <span>{data.seats} مقاعد</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleViewDetails(data)}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg shadow-lg hover:shadow-primary/30"
                  >
                    <FaInfoCircle className="ml-2" />
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-16">
          <Link
            to="/available-cars"
            data-aos="fade-up"
            className="bg-primary hover:bg-primary/90 text-black font-medium py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30 text-lg"
          >
            عرض جميع السيارات
          </Link>
        </div>
      </div>

      {/* Car Details Modal */}
      {showDetailsModal && selectedCarDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4" dir="rtl">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 scale-100 opacity-100" data-aos="zoom-in">
            <button type="button" onClick={handleCloseModal} className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
              <FaTimes size={28} />
            </button>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-4">{selectedCarDetails.name}</h2>
            <img
              src={selectedCarDetails.image}
              alt={selectedCarDetails.name}
              className="w-full h-72 object-contain mb-6 rounded-lg"
            />
            <div className="text-gray-700 dark:text-gray-300 space-y-4 text-lg">
              <p><strong>السعر اليومي:</strong> <span className="font-semibold text-gray-800 dark:text-white">{selectedCarDetails.price}$</span></p>
              <p><strong>الوقود:</strong> <span className="font-semibold text-gray-800 dark:text-white">{selectedCarDetails.fuel}</span></p>
              <p><strong>المسافة المقطوعة:</strong> <span className="font-semibold text-gray-800 dark:text-white">{selectedCarDetails.mileage}</span></p>
              <p><strong>ناقل الحركة:</strong> <span className="font-semibold text-gray-800 dark:text-white">{selectedCarDetails.transmission}</span></p>
              <p><strong>عدد المقاعد:</strong> <span className="font-semibold text-gray-800 dark:text-white">{selectedCarDetails.seats}</span></p>
              <div>
                 <strong>الوصف:</strong>
                 <p className="mt-2 leading-relaxed">{selectedCarDetails.description}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/booking" onClick={handleCloseModal} className="inline-block bg-primary hover:bg-primary/90 text-black font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30 text-lg">
                احجز الآن
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
