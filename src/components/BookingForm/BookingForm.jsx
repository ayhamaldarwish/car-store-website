import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCar, FaClock, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

const carTypes = [
  { id: 'sedan', name: 'Sedan', icon: '🚗', price: 50 },
  { id: 'suv', name: 'SUV', icon: '🚙', price: 70 },
  { id: 'sports', name: 'Sports', icon: '🏎️', price: 100 },
  { id: 'luxury', name: 'Luxury', icon: '🚘', price: 150 },
];

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupDate: null,
    pickupTime: '',
    returnDate: null,
    returnTime: '',
    carType: '',
  });

  const [errors, setErrors] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // التحقق من تاريخ الاستلام
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'تاريخ الاستلام مطلوب';
    } else if (formData.pickupDate < today) {
      newErrors.pickupDate = 'تاريخ الاستلام يجب أن يكون في المستقبل';
    }

    // التحقق من وقت الاستلام
    if (!formData.pickupTime) {
      newErrors.pickupTime = 'وقت الاستلام مطلوب';
    }

    // التحقق من تاريخ الإرجاع
    if (!formData.returnDate) {
      newErrors.returnDate = 'تاريخ الإرجاع مطلوب';
    } else if (formData.returnDate <= formData.pickupDate) {
      newErrors.returnDate = 'تاريخ الإرجاع يجب أن يكون بعد تاريخ الاستلام';
    }

    // التحقق من وقت الإرجاع
    if (!formData.returnTime) {
      newErrors.returnTime = 'وقت الإرجاع مطلوب';
    }

    // التحقق من نوع السيارة
    if (!formData.carType) {
      newErrors.carType = 'يرجى اختيار نوع السيارة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
    // مسح رسالة الخطأ عند التغيير
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // مسح رسالة الخطأ عند التغيير
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Booking Data:', formData);
      setShowSidebar(true);
    }
  };

  const handleCarTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, carType: typeId }));
    // مسح رسالة الخطأ عند الاختيار
    if (errors.carType) {
      setErrors(prev => ({
        ...prev,
        carType: ''
      }));
    }
  };

  const calculateTotalDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const diffTime = Math.abs(formData.returnDate - formData.pickupDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    const selectedCar = carTypes.find(car => car.id === formData.carType);
    if (!selectedCar) return 0;
    return selectedCar.price * calculateTotalDays();
  };

  const handleConfirmBooking = () => {
    const selectedCar = carTypes.find(car => car.id === formData.carType);
    const bookingData = {
      id: Date.now(),
      carName: selectedCar.name,
      carIcon: selectedCar.icon,
      pickupDate: formData.pickupDate.toLocaleDateString(),
      pickupTime: formData.pickupTime,
      returnDate: formData.returnDate.toLocaleDateString(),
      returnTime: formData.returnTime,
      totalDays: calculateTotalDays(),
      totalPrice: calculateTotalPrice(),
    };

    // جلب الحجوزات الحالية
    const existingBookings = JSON.parse(localStorage.getItem('bookedCars') || '[]');
    
    // إضافة الحجز الجديد
    const updatedBookings = [...existingBookings, bookingData];
    
    // حفظ الحجوزات المحدثة
    localStorage.setItem('bookedCars', JSON.stringify(updatedBookings));
    
    // إغلاق Sidebar والتنقل إلى صفحة الحجوزات
    setShowSidebar(false);
    
    // عرض رسالة نجاح
    toast.success('تم الحجز بنجاح! 🎉', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // التنقل بعد ثانيتين
    setTimeout(() => {
      navigate('/booked-cars');
    }, 2000);
  };

  const BookingSidebar = () => {
    const selectedCar = carTypes.find(car => car.id === formData.carType);
    
    return (
      <div className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50"
           style={{ transform: showSidebar ? 'translateX(0)' : 'translateX(100%)' }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">تفاصيل الحجز</h2>
            <button 
              type="button"
              onClick={() => setShowSidebar(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* تفاصيل السيارة */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedCar?.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{selectedCar?.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">${selectedCar?.price} / يوم</p>
                </div>
              </div>
            </div>

            {/* تفاصيل التواريخ */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">تاريخ الاستلام:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formData.pickupDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">وقت الاستلام:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formData.pickupTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">تاريخ الإرجاع:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formData.returnDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">وقت الإرجاع:</span>
                <span className="font-medium text-gray-800 dark:text-white">{formData.returnTime}</span>
              </div>
            </div>

            {/* ملخص التكلفة */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">عدد الأيام:</span>
                <span className="font-medium text-gray-800 dark:text-white">{calculateTotalDays()} يوم</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-800 dark:text-white">المجموع:</span>
                <span className="text-primary">${calculateTotalPrice()}</span>
              </div>
            </div>

            {/* زر تأكيد الحجز */}
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 px-6 
                       rounded-lg transition-all duration-300 transform hover:scale-105 
                       shadow-lg hover:shadow-primary/30"
            >
              تأكيد الحجز
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          احجز سيارتك
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Pickup Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="pickupDate" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaCalendarAlt className="inline-block mr-2 text-primary" />
                تاريخ الاستلام
              </label>
              <DatePicker
                selected={formData.pickupDate}
                onChange={(date) => handleDateChange(date, 'pickupDate')}
                selectsStart
                startDate={formData.pickupDate}
                endDate={formData.returnDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.pickupDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:ring-2 focus:ring-primary focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-all duration-300`}
                placeholderText="اختر تاريخ الاستلام"
                required
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="pickupTime" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaClock className="inline-block mr-2 text-primary" />
                وقت الاستلام
              </label>
              <input
                id="pickupTime"
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleTimeChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.pickupTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:ring-2 focus:ring-primary focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-all duration-300`}
                required
              />
              {errors.pickupTime && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
              )}
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="returnDate" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaCalendarAlt className="inline-block mr-2 text-primary" />
                تاريخ الإرجاع
              </label>
              <DatePicker
                selected={formData.returnDate}
                onChange={(date) => handleDateChange(date, 'returnDate')}
                selectsEnd
                startDate={formData.pickupDate}
                endDate={formData.returnDate}
                minDate={formData.pickupDate}
                dateFormat="dd/MM/yyyy"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.returnDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:ring-2 focus:ring-primary focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-all duration-300`}
                placeholderText="اختر تاريخ الإرجاع"
                required
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="returnTime" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaClock className="inline-block mr-2 text-primary" />
                وقت الإرجاع
              </label>
              <input
                id="returnTime"
                type="time"
                name="returnTime"
                value={formData.returnTime}
                onChange={handleTimeChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.returnTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } focus:ring-2 focus:ring-primary focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-all duration-300`}
                required
              />
              {errors.returnTime && (
                <p className="text-red-500 text-sm mt-1">{errors.returnTime}</p>
              )}
            </div>
          </div>

          {/* Car Type Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaCar className="inline-block mr-2 text-primary" />
              نوع السيارة
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {carTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleCarTypeSelect(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    formData.carType === type.id
                      ? 'border-primary bg-primary text-black shadow-lg shadow-primary/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">${type.price}/day</div>
                </button>
              ))}
            </div>
            {errors.carType && (
              <p className="text-red-500 text-sm mt-1">{errors.carType}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3.5 px-6 
                     rounded-full transition-all duration-300 transform hover:scale-105 
                     shadow-lg hover:shadow-primary/30"
          >
            احجز الآن
          </button>
        </form>
      </div>

      {/* Booking Sidebar */}
      <BookingSidebar />
    </>
  );
};

export default BookingForm; 