import { useState } from 'react';
import { FaCar, FaGasPump, FaCog, FaUsers, FaFilter, FaSort, FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "sedan",
    image: "https://images.unsplash.com/photo-1617469767053-3c4f2a7c84c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 50,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    features: ["Air Conditioning", "Bluetooth", "Backup Camera", "Cruise Control"],
    description: "Comfortable and reliable sedan perfect for family trips and daily commuting.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Honda CR-V",
    type: "suv",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 70,
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    features: ["Sunroof", "Leather Seats", "Navigation System", "Parking Sensors"],
    description: "Spacious SUV with excellent fuel efficiency and modern features.",
    rating: 4.0,
  },
  {
    id: 3,
    name: "Porsche 911",
    type: "sports",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 100,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    features: ["Sport Mode", "Premium Sound System", "Carbon Fiber Interior", "Track Package"],
    description: "High-performance sports car with unmatched driving experience.",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Mercedes S-Class",
    type: "luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 150,
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    features: ["Massage Seats", "Ambient Lighting", "Premium Entertainment", "Driver Assistance"],
    description: "Luxury sedan with cutting-edge technology and premium comfort features.",
    rating: 4.7,
  }
];

const AvailableCars = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleBooking = (car) => {
    localStorage.setItem('selectedCar', JSON.stringify(car));
    navigate('/booking');
  };

  const filteredCars = cars
    .filter(car => selectedType === 'all' || car.type === selectedType)
    .filter(car => 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            السيارات المتاحة
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            ابحث عن سيارتك المثالية أو تصفح مجموعتنا الواسعة
          </p>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 md:mb-0">
            <div className="flex items-center gap-3">
              <FaFilter className="text-2xl text-primary" />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-lg">تصفية حسب:</span>
            </div>
            <div className="flex flex-wrap gap-3 flex-grow justify-center md:justify-start">
              {['all', 'sedan', 'suv', 'sports', 'luxury'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    selectedType === type
                      ? 'bg-primary text-black shadow-lg shadow-primary/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type === 'all' ? 'الكل' : 
                   type === 'sedan' ? 'سيدان' :
                   type === 'suv' ? 'SUV' :
                   type === 'sports' ? 'رياضية' : 'فاخرة'}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mt-6">
            <input
              type="text"
              placeholder="ابحث عن اسم السيارة أو الميزات..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 pl-12"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Search icon</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative group">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-primary text-black px-4 py-2 rounded-full font-medium shadow-lg">
                  ${car.price}/day
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  {car.name}
                </h3>
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <span key={`car-${car.id}-star-${index}`} className="text-primary text-xl">
                        {ratingValue <= car.rating ? <FaStar /> : <FaRegStar />}
                      </span>
                    );
                  })}
                  <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">({car.rating})</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {car.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaCog className="text-primary" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaGasPump className="text-primary" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaUsers className="text-primary" />
                    <span>{car.seats} مقاعد</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <FaCar className="text-primary" />
                    <span>{car.type}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white">المميزات:</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span
                        key={feature}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm hover:bg-primary hover:text-black transition-colors duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleBooking(car)}
                  className="w-full mt-8 bg-primary hover:bg-primary/90 text-black font-medium py-3.5 px-6 
                           rounded-full transition-all duration-300 transform hover:scale-105 
                           shadow-lg hover:shadow-primary/30"
                >
                  احجز الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableCars; 