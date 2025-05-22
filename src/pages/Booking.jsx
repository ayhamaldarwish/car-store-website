import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaInfoCircle } from "react-icons/fa";

const Booking = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // قراءة معلومات السيارة المحددة من localStorage
    const car = JSON.parse(localStorage.getItem('selectedCar'));
    if (car) {
      setSelectedCar(car);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // مسح رسالة الخطأ عند التغيير
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { pickupDate, pickupTime, returnDate, returnTime, name, phone, email } = formData;

    if (!pickupDate) newErrors.pickupDate = "يرجى اختيار تاريخ الاستلام";
    if (!pickupTime) newErrors.pickupTime = "يرجى اختيار وقت الاستلام";
    if (!returnDate) newErrors.returnDate = "يرجى اختيار تاريخ الإرجاع";
    if (!returnTime) newErrors.returnTime = "يرجى اختيار وقت الإرجاع";
    if (!name) newErrors.name = "يرجى إدخال الاسم";
    if (!phone) newErrors.phone = "يرجى إدخال رقم الهاتف";
    if (!email) newErrors.email = "يرجى إدخال البريد الإلكتروني";

    // التحقق من أن تاريخ الإرجاع بعد تاريخ الاستلام
    if (pickupDate && returnDate) {
      const pickup = new Date(`${pickupDate}T${pickupTime}`);
      const return_ = new Date(`${returnDate}T${returnTime}`);
      if (return_ <= pickup) {
        newErrors.returnDate = "يجب أن يكون تاريخ الإرجاع بعد تاريخ الاستلام";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // إنشاء كائن الحجز
      const booking = {
        id: Date.now(),
        car: selectedCar,
        ...formData,
        totalDays: Math.ceil(
          (new Date(`${formData.returnDate}T${formData.returnTime}`) -
            new Date(`${formData.pickupDate}T${formData.pickupTime}`)) /
            (1000 * 60 * 60 * 24)
        ),
        totalPrice:
          Math.ceil(
            (new Date(`${formData.returnDate}T${formData.returnTime}`) -
              new Date(`${formData.pickupDate}T${formData.pickupTime}`)) /
              (1000 * 60 * 60 * 24)
          ) * selectedCar.price,
      };

      // حفظ الحجز في localStorage
      const bookings = JSON.parse(localStorage.getItem("bookedCars") || "[]");
      bookings.push(booking);
      localStorage.setItem("bookedCars", JSON.stringify(bookings));

      // مسح السيارة المحددة
      localStorage.removeItem("selectedCar");

      // الانتقال إلى صفحة السيارات المحجوزة
      navigate("/booked-cars");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              حجز السيارة
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              قم بإكمال النموذج التالي لحجز السيارة
            </p>
          </div>

          {selectedCar && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 transform transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-32 h-32 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedCar.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-primary" />
                    <p className="text-primary font-semibold text-lg">
                      ${selectedCar.price}/day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="pickupDate" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaCalendarAlt className="inline-block ml-2 text-primary" />
                  تاريخ الاستلام
                </label>
                <input
                  id="pickupDate"
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.pickupDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.pickupDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="pickupTime" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaClock className="inline-block ml-2 text-primary" />
                  وقت الاستلام
                </label>
                <input
                  id="pickupTime"
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.pickupTime
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.pickupTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="returnDate" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaCalendarAlt className="inline-block ml-2 text-primary" />
                  تاريخ الإرجاع
                </label>
                <input
                  id="returnDate"
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.returnDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.returnDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="returnTime" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaClock className="inline-block ml-2 text-primary" />
                  وقت الإرجاع
                </label>
                <input
                  id="returnTime"
                  type="time"
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.returnTime
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.returnTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.returnTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaUser className="inline-block ml-2 text-primary" />
                  الاسم
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaPhone className="inline-block ml-2 text-primary" />
                  رقم الهاتف
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-lg font-medium">
                  <FaEnvelope className="inline-block ml-2 text-primary" />
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-black font-medium py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30 text-lg"
              >
                تأكيد الحجز
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking; 