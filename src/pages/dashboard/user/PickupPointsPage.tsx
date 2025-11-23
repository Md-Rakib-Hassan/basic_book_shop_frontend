import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Navigation } from "lucide-react";
import MapView from "../../../components/MapView";
import PickupLocationPopup from "../../../components/PickupLocationPopup";
import { useFullUser } from "../../../redux/hooks/useUserByEmail";
import LoadingPage from "../../LoadingPage";
import {
  useAddPickupPointMutation,
  useDeletePickupPointMutation,
  useGetSpecificPickupPointQuery,
  useUpdatePickupPointMutation,
} from "../../../redux/features/pickup/pickupApi";
import { IPickupPoint } from "../../../types/pickupTypes";
import { toast } from "sonner";
import { showConfirm } from "../../../components/ui/Confirm Modal/ConfirmDialog";
import { useUserLocation } from "../../../context/UserLocationContext";

// Distance helpers
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default function PickupPointsPage() {
  const [selectedPoint, setSelectedPoint] = useState<IPickupPoint | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPoint, setEditingPoint] = useState<IPickupPoint | null>(null);
  const [formData, setFormData] = useState({ Name: "", Address: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
const { lat, lng } = useUserLocation();
  const [addPickupPoint] = useAddPickupPointMutation();
  const [updatePoint, { isLoading: isPickupUpdateLoading }] =
    useUpdatePickupPointMutation();
  const { user, isLoading: isUserLoading } = useFullUser();

  const { data: pickupPointsData, isLoading: isPickupPointsLoading } =
    useGetSpecificPickupPointQuery(user?._id ?? "", {
      skip: !user?._id,
    });
  const [deletPickupPoint] = useDeletePickupPointMutation();

 

  if (isUserLoading || isPickupPointsLoading || isPickupUpdateLoading)
    return <LoadingPage />;
  console.log(user);
  console.log("Pickup Points Data:", pickupPointsData);

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    name: string;
  }) => {
    setSelectedLocation(location);
    setShowAddForm(true);
    setIsPopupOpen(false);
  };

  const handleAddPoint = async () => {
    if (!formData.Name || !selectedLocation || !user?._id) return;

    const newPoint: IPickupPoint = {
      UserId: user._id,
      Name: formData.Name,
      Address: selectedLocation.name,
      Latitude: selectedLocation.lat,
      Longitude: selectedLocation.lng,
    };
    try {
      toast.loading("Adding pickup point...");
      await addPickupPoint(newPoint).unwrap();
      toast.dismiss();
      toast.success("Pickup point added successfully");
      resetForm();
    }
    catch (error) {
      toast.dismiss();
      toast.error("Failed to add pickup point. Please try again.");
    }
  };

  const handleEditPoint = async (point: IPickupPoint) => {
    const res = await updatePoint({
      id: point?._id,
      Name: formData.Name,
    }).unwrap();
    setShowAddForm(false);
  };

  const handleDeletePoint = async(pointId: string) => {
    
    showConfirm({
      title: 'Delete this pickup Point?',
      message: 'This action cannot be undone.',
      onConfirm: async() => {
        try {
          toast.loading('Deleting pickup point...');
          await deletPickupPoint(pointId).unwrap();
          toast.dismiss();
          toast.success('Pickup point deleted successfully');
        } catch (error) {
          toast.dismiss();
          toast.error('Failed to delete Pickup point. Please try again.');
        }
      },
      onCancel: () => {
        toast.info('Pickup point deletion cancelled');
      },
    });
   

  };

  const resetForm = () => {
    setFormData({ Name: "", Address: "" });
    setEditingPoint(null);
    setShowAddForm(false);
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Pickup Points
          </h1>
          <p className="text-gray-600">
            Add and manage your preferred book pickup locations
          </p>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Pickup Point</span>
        </button>
      </div>

      {/* Popup */}
      <PickupLocationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLocationSelect={handleLocationSelect}
      />

      {/* Form */}
      {showAddForm && selectedLocation && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">
            {editingPoint ? "Edit Pickup Point" : "Add Pickup Point"}
          </h3>
          <input
            type="text"
            placeholder="Give a Name of this Place (eg. DIU HALL)"
            className="border p-2 rounded w-full mb-2"
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          />
          <p className="text-sm text-gray-500 mb-2">
            Address: {selectedLocation.name}
          </p>
          <div className="flex gap-2">
            {editingPoint ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleEditPoint(editingPoint)}
              >
                Update
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddPoint}
              >
                Add
              </button>
            )}
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Pickup Points
          </h2>
          {pickupPointsData?.data.length > 0 ? (
            pickupPointsData?.data.map((point) => (
              <div
                key={point._id?.toString()}
                className={`bg-white p-4 rounded-lg border transition-colors cursor-pointer ${
                  selectedPoint?._id?.toString() === point._id?.toString()
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPoint(point)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <MapPin
                      className={`h-5 w-5 mt-0.5 ${
                        selectedPoint?._id === point._id
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {point.Name}
                      </h3>
                      <p className="text-sm text-gray-600">{point.Address}</p>
                      {lat && lng && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Navigation className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {getDistanceFromLatLonInKm(
                              lat,
                              lng,
                              point.Latitude,
                              point.Longitude
                            ).toFixed(2)}{" "}
                            km away
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddForm(true);
                        setEditingPoint(point);
                        setFormData({
                          Name: point.Name,
                          Address: point.Address,
                        });
                        setSelectedLocation({
                          lat: point.Latitude,
                          lng: point.Longitude,
                          name: point.Address,
                        });
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePoint(point._id?.toString() || "");
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">
                Add your first pickup point to get started
              </p>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Map View</h2>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {pickupPointsData?.data.length > 0 ? (
              <MapView
                pickupPoints={pickupPointsData?.data}
                selectedPoint={selectedPoint}
                onPointSelect={setSelectedPoint}
                height="h-96"
              />
            ) : (
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center flex-col">
                <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Add pickup points to see them on the map
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
