
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
// import { useRouter } from 'next/navigation';
// import AuthenticatedLayout from '../components/AuthenticatedLayout';

// const mapContainerStyle = {
//   width: '100%',
//   height: '500px'
// };

// // Center of Florida
// const center = {
//   lat: 28.3636, 
//   lng: -81.5615
// };

// // This would typically come from backend API
// const dummyLocations = [
//   { id: 1, lat: 28.5383, lng: -81.3792, type: 'shelter', name: 'Orlando Community Shelter', availableSpots: 50 },
//   { id: 2, lat: 27.9506, lng: -82.4572, type: 'shelter', name: 'Tampa Bay Relief Center', availableSpots: 30 },
//   { id: 3, lat: 25.7617, lng: -80.1918, type: 'home', name: 'Miami Beach Residence', availableSpots: 3 },
//   { id: 4, lat: 30.3322, lng: -81.6557, type: 'home', name: 'Jacksonville Family Home', availableSpots: 2 },
// ];

// export default function Shelter() {
//   const [locations, setLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const router = useRouter();

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     setLocations(dummyLocations);
//   }, []);

//   const mapOptions = {
//     zoom: 7,
//     center: center,
//   };

//   const handleOfferShelter = () => {
//     router.push('/offer-shelter');
//   };

//   const handleBuy = (locationId) => {
//     // Add your logic here for handling the buy action
//     alert(`Buy clicked for location ID: ${locationId}`);
//     // For example, you might want to redirect to a purchase page
//     // router.push(`/buy/${locationId}`);
//   };

//   const renderMap = useCallback(() => {
//     return (
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         options={mapOptions}
//       >
//         {locations.map((location) => (
//           <Marker
//             key={location.id}
//             position={{ lat: location.lat, lng: location.lng }}
//             icon={{
//               url: '/host.png',
//               scaledSize: new window.google.maps.Size(30, 30),
//             }}
//             onClick={() => setSelectedLocation(location)}
//           />
//         ))}
//         {selectedLocation && (
//           <InfoWindow
//             position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
//             onCloseClick={() => setSelectedLocation(null)}
//           >
//             <div>
//               <h2 className="font-bold">{selectedLocation.name}</h2>
//               <p>Type: {selectedLocation.type === 'shelter' ? 'Official Shelter' : 'Private Home'}</p>
//               <p>Available spots: {selectedLocation.availableSpots}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     );
//   }, [locations, selectedLocation, mapOptions]);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading maps</div>;

//   return (
//     <AuthenticatedLayout>
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Available Shelters and Homes in Florida</h1>
//           <button 
//             onClick={handleOfferShelter}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Offer Your Home as Shelter
//           </button>
//         </div>
//         {renderMap()}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Available Locations</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {locations.map((location) => (
//               <div key={location.id} className="bg-white rounded-lg shadow-md p-4">
//                 <h3 className="font-semibold">{location.name}</h3>
//                 <p>Type: {location.type === 'shelter' ? 'Official Shelter' : 'Private Home'}</p>
//                 <p>Available spots: {location.availableSpots}</p>
//                 <p>Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
//                 <button 
//                   onClick={() => handleBuy(location.id)}
//                   className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Buy
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }
'use client';

import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

// Center of Florida
const center = {
  lat: 28.3636, 
  lng: -81.5615
};

// This would typically come from backend API
const dummyLocations = [
  { id: 1, lat: 28.5383, lng: -81.3792, type: 'shelter', name: 'Orlando Community Shelter', availableSpots: 50 },
  { id: 2, lat: 27.9506, lng: -82.4572, type: 'shelter', name: 'Tampa Bay Relief Center', availableSpots: 30 },
  { id: 3, lat: 25.7617, lng: -80.1918, type: 'home', name: 'Miami Beach Residence', availableSpots: 3 },
  { id: 4, lat: 30.3322, lng: -81.6557, type: 'home', name: 'Jacksonville Family Home', availableSpots: 2 },
];

export default function Shelter() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const router = useRouter();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const fetchShelters = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters`);
      if (response.ok) {
        const shelters = await response.json();
        return shelters.map(shelter => ({
          id: shelter.id,
          lat: shelter.lat,
          lng: shelter.lng,
          type: 'home',
          name: shelter.name,
          availableSpots: shelter.capacity
        }));
      } else {
        console.error('Failed to fetch shelters');
        return [];
      }
    } catch (error) {
      console.error('Error fetching shelters:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadLocations = async () => {
      const fetchedShelters = await fetchShelters();
      setLocations([...dummyLocations, ...fetchedShelters]);
    };

    loadLocations();
  }, []);

  const mapOptions = {
    zoom: 7,
    center: center,
  };

  const handleOfferShelter = () => {
    router.push('/offer-shelter');
  };

  const handleBuy = (locationId) => {
    // Filter out the purchased location from the state
    setLocations((prevLocations) => prevLocations.filter(location => location.id !== locationId));
    
    // Add your logic here for handling the buy action
    alert(`You have purchased the location with ID: ${locationId}`);
    // For example, you might want to redirect to a purchase confirmation page
    // router.push(`/buy/${locationId}`);
  };

  const renderMap = useCallback(() => {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: '/host.png',
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2 className="font-bold">{selectedLocation.name}</h2>
              <p>Type: {selectedLocation.type === 'shelter' ? 'Official Shelter' : 'Private Home'}</p>
              <p>Available spots: {selectedLocation.availableSpots}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }, [locations, selectedLocation, mapOptions]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Shelters and Homes in Florida</h1>
          <button 
            onClick={handleOfferShelter}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Offer Your Home as Shelter
          </button>
        </div>
        {renderMap()}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Available Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div key={location.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold">{location.name}</h3>
                <p>Type: {location.type === 'shelter' ? 'Official Shelter' : 'Private Home'}</p>
                <p>Available spots: {location.availableSpots}</p>
                <p>Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                <button 
                  onClick={() => handleBuy(location.id)}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}