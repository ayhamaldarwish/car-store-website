import { useState, useEffect } from 'react';
import { FaCar, FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showEditCarModal, setShowEditCarModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newCar, setNewCar] = useState({
    name: '',
    type: 'sedan',
    image: '',
    price: '',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    features: [],
    description: '',
    rating: 5
  });

  useEffect(() => {
    // Load cars from localStorage
    const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    setCars(storedCars);

    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookedCars') || '[]');
    setBookings(storedBookings);
  }, []);

  const handleAddCar = () => {
    if (!newCar.name || !newCar.image || !newCar.price) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const carToAdd = {
      ...newCar,
      id: Date.now(),
      price: Number(newCar.price),
      features: newCar.features.split(',').map(f => f.trim())
    };

    const updatedCars = [...cars, carToAdd];
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setShowAddCarModal(false);
    setNewCar({
      name: '',
      type: 'sedan',
      image: '',
      price: '',
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      features: [],
      description: '',
      rating: 5
    });
    toast.success('تمت إضافة السيارة بنجاح');
  };

  const handleEditCar = () => {
    if (!selectedCar.name || !selectedCar.image || !selectedCar.price) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const updatedCars = cars.map(car => 
      car.id === selectedCar.id ? {
        ...selectedCar,
        price: Number(selectedCar.price),
        features: typeof selectedCar.features === 'string' 
          ? selectedCar.features.split(',').map(f => f.trim())
          : selectedCar.features
      } : car
    );

    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setShowEditCarModal(false);
    setSelectedCar(null);
    toast.success('تم تحديث السيارة بنجاح');
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه السيارة؟')) {
      const updatedCars = cars.filter(car => car.id !== carId);
      setCars(updatedCars);
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      toast.success('تم حذف السيارة بنجاح');
    }
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('bookedCars', JSON.stringify(updatedBookings));
      toast.success('تم حذف الحجز بنجاح');
    }
  };

  const filteredCars = cars.filter(car =>
    car.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(booking =>
    booking.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.pickupDate?.includes(searchQuery) ||
    booking.returnDate?.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
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

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          لوحة التحكم
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveTab('cars')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'cars'
                  ? 'bg-primary text-black'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FaCar className="inline-block ml-2" />
              السيارات
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'bookings'
                  ? 'bg-primary text-black'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FaCalendarAlt className="inline-block ml-2" />
              الحجوزات
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">إدارة السيارات</h2>
              <button
                type="button"
                onClick={() => setShowAddCarModal(true)}
                className="bg-primary hover:bg-primary/90 text-black font-medium py-2 px-4 
                         rounded-lg transition-all duration-300 transform hover:scale-105 
                         shadow-lg hover:shadow-primary/30 flex items-center"
              >
                <FaPlus className="ml-2" />
                إضافة سيارة
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <div key={car.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{car.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{car.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">${car.price}/day</span>
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCar(car);
                          setShowEditCarModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCar(car.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">إدارة الحجوزات</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-right text-gray-600 dark:text-gray-300">السيارة</th>
                    <th className="px-6 py-3 text-right text-gray-600 dark:text-gray-300">تاريخ الاستلام</th>
                    <th className="px-6 py-3 text-right text-gray-600 dark:text-gray-300">تاريخ الإرجاع</th>
                    <th className="px-6 py-3 text-right text-gray-600 dark:text-gray-300">المجموع</th>
                    <th className="px-6 py-3 text-right text-gray-600 dark:text-gray-300">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(booking => (
                    <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-600">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-2xl ml-2">{booking.carIcon}</span>
                          <span className="text-gray-800 dark:text-white">{booking.carName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{booking.pickupDate}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{booking.returnDate}</td>
                      <td className="px-6 py-4 text-primary font-bold">${booking.totalPrice}</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">إضافة سيارة جديدة</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم السيارة"
                value={newCar.name}
                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
              <input
                type="text"
                placeholder="رابط الصورة"
                value={newCar.image}
                onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
              <input
                type="number"
                placeholder="السعر اليومي"
                value={newCar.price}
                onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
              <select
                value={newCar.type}
                onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="sedan">سيدان</option>
                <option value="suv">SUV</option>
                <option value="sports">رياضية</option>
                <option value="luxury">فاخرة</option>
              </select>
              <textarea
                placeholder="المميزات (مفصولة بفواصل)"
                value={newCar.features}
                onChange={(e) => setNewCar({ ...newCar, features: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                rows="3"
              />
              <textarea
                placeholder="الوصف"
                value={newCar.description}
                onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                rows="3"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                           dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleAddCar}
                  className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 
                           transition-all duration-300"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Car Modal */}
      {showEditCarModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">تعديل السيارة</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم السيارة"
                value={selectedCar.name}
                onChange={(e) => setSelectedCar({ ...selectedCar, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
              <input
                type="text"
                placeholder="رابط الصورة"
                value={selectedCar.image}
                onChange={(e) => setSelectedCar({ ...selectedCar, image: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
              <input
                type="number"
                placeholder="السعر اليومي"
                value={selectedCar.price}
                onChange={(e) => setSelectedCar({ ...selectedCar, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
              <select
                value={selectedCar.type}
                onChange={(e) => setSelectedCar({ ...selectedCar, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="sedan">سيدان</option>
                <option value="suv">SUV</option>
                <option value="sports">رياضية</option>
                <option value="luxury">فاخرة</option>
              </select>
              <textarea
                placeholder="المميزات (مفصولة بفواصل)"
                value={Array.isArray(selectedCar.features) ? selectedCar.features.join(', ') : selectedCar.features}
                onChange={(e) => setSelectedCar({ ...selectedCar, features: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                rows="3"
              />
              <textarea
                placeholder="الوصف"
                value={selectedCar.description}
                onChange={(e) => setSelectedCar({ ...selectedCar, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                rows="3"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditCarModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                           dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleEditCar}
                  className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 
                           transition-all duration-300"
                >
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 