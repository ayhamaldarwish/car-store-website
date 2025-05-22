import { useState, useEffect } from 'react';
import { FaCar, FaCalendarAlt, FaClock, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookedCars = () => {
  const [bookedCars, setBookedCars] = useState([]);

  useEffect(() => {
    // جلب الحجوزات من localStorage
    const storedBookings = localStorage.getItem('bookedCars');
    if (storedBookings) {
      setBookedCars(JSON.parse(storedBookings));
    }
  }, []);

  const handleDeleteBooking = (bookingId) => {
    const updatedBookings = bookedCars.filter(booking => booking.id !== bookingId);
    setBookedCars(updatedBookings);
    localStorage.setItem('bookedCars', JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            السيارات المحجوزة
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            عرض وإدارة جميع حجوزاتك الحالية
          </p>
        </div>

        {bookedCars.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <FaCar className="text-7xl text-primary/50 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              لا توجد حجوزات حالياً
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              قم بحجز سيارة جديدة للبدء
            </p>
            <Link
              to="/available-cars"
              className="inline-block bg-primary hover:bg-primary/90 text-black font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/30"
            >
              تصفح السيارات المتاحة
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedCars.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <span className="text-3xl text-primary">{booking.carIcon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {booking.carName}
                      </h3>
                      <p className="text-primary font-semibold text-lg">
                        ${booking.totalPrice}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>

                <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaCalendarAlt className="text-primary" />
                    <span>تاريخ الاستلام: {booking.pickupDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaClock className="text-primary" />
                    <span>وقت الاستلام: {booking.pickupTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaCalendarAlt className="text-primary" />
                    <span>تاريخ الإرجاع: {booking.returnDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaClock className="text-primary" />
                    <span>وقت الإرجاع: {booking.returnTime}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FaInfoCircle className="text-primary" />
                      <span className="text-gray-600 dark:text-gray-300">عدد الأيام:</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white text-lg">
                      {booking.totalDays} يوم
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedCars; 