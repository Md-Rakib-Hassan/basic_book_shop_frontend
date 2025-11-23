import React, { useEffect, useState } from "react";
import {
  Upload,
  MapPin,
  BookOpen,
  Tag,
  Camera,
  AlertCircle,
  Hash,
  Calendar,
  Package,
  Search,
} from "lucide-react";
import { useFullUser } from "../../../redux/hooks/useUserByEmail";
import { FaMoneyBills } from "react-icons/fa6";
import { toast } from "sonner";
import {
  useGetSpecificBookQuery,
  useUpdateBookMutation,
  useGetBookDetailsMutation,
} from "../../../redux/features/books/bookApi";
import useImageUpload from "../../../hooks/useImageUpload";
import LoadingPage from "../../LoadingPage";
import { useParams } from "react-router";
import { useGetSpecificPickupPointQuery } from "../../../redux/features/pickup/pickupApi";

export default function EditBookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { user, isLoading: isUserLoading } = useFullUser();

  // API hooks
  const { data: bookData, isLoading: isBookLoading } =
    useGetSpecificBookQuery(bookId!);
  const { data: pickupPointsData, isLoading: isPickupPointsLoading } =
    useGetSpecificPickupPointQuery(user?._id ?? "", {
      skip: !user?._id,
    });
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [getBookDetails] = useGetBookDetailsMutation();

  // Local state
  const [image, setImage] = useState<File | null>(null);
  const { uploadImage, isUploading } = useImageUpload();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  console.log("EditBookPage - bookData:", bookData);

  const [formData, setFormData] = useState({
    Title: "",
    ISBN: "",
    Author: "",
    Category: "Fiction",
    Price: "",
    StockQuantity: "",
    PublishedYear: "",
    Condition: "",
    Availability: "Lend",
    Description: "",
    ImageUrl: "",
    PickupPoint: "",
    BookOwner: user?._id,
  });

  // Prefill form once book data loads
  useEffect(() => {
    if (bookData?.data) {
      const b = bookData.data;
      setFormData({
        Title: b.Title || "",
        ISBN: b.ISBN || "",
        Author: b.Author || "",
        Category: b.Category || "Fiction",
        Price: b.Price?.toString() || "",
        StockQuantity: b.StockQuantity?.toString() || "",
        PublishedYear: b.PublishedYear?.toString() || "",
        Condition: b.Condition || "",
        Availability: b.Availability || "Lend",
        Description: b.Description || "",
        ImageUrl: b.ImageUrl || "",
        PickupPoint: b.PickupPoint?._id || "",
        BookOwner: user?._id,
      });
      setImagePreview(b.ImageUrl || null);
    }
  }, [bookData, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImageUrl = formData.ImageUrl;

    if (image) {
      const { url } = await uploadImage(image);
      uploadedImageUrl = url;
    }

    const numericFormData = {
      ...formData,
      Price: parseFloat(formData.Price),
      StockQuantity: parseInt(formData.StockQuantity, 10),
      PublishedYear: parseInt(formData.PublishedYear, 10),
      ImageUrl: uploadedImageUrl,
    };

    toast.loading("Updating book...");
    try {
      await updateBook({ bookId, bookData: numericFormData }).unwrap();
      toast.dismiss();
      toast.success("Book updated successfully!");
      // navigate(`/dashboard/${user?.user?.UserType}/books`);
    } catch (err: any) {
      toast.dismiss();
      const zodErrors = err?.data?.error?.details;
      if (Array.isArray(zodErrors)) {
        zodErrors.forEach((detail: any) => {
          toast.error(detail?.message || "Validation error");
        });
      } else {
        toast.error(
          err?.data?.message || "Failed to update book. Please try again."
        );
      }
      console.error("Update book error:", err);
    }
  };

  const handleFetchBookDetails = async () => {
    if (!formData.ISBN) {
      toast.error("Please enter an ISBN first");
      return;
    }
    try {
      toast.loading("Fetching book details...");
      const res = await getBookDetails(formData.ISBN).unwrap();
      toast.dismiss();
      if (res.success && res.data) {
        setFormData((prev) => ({
          ...prev,
          Title: res.data.Title || prev.Title,
          Author: res.data.Author || prev.Author,
          Category: res.data.Category || prev.Category,
          PublishedYear: res.data.PublishedYear || prev.PublishedYear,
          Description: res.data.Description || prev.Description,
          ImageUrl: res.data.ImageUrl || prev.ImageUrl,
        }));
        if (res.data.ImageUrl) setImagePreview(res.data.ImageUrl);
        toast.success("Book details fetched!");
      } else {
        toast.error("No book details found for this ISBN");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to fetch book details");
    }
  };

  if (isUserLoading || isPickupPointsLoading || isBookLoading || isUpdating || isUploading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Book</h1>
        <p className="text-gray-600">Update your book details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Book Info */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" /> Book Information
                  </h2>
        
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Image Upload */}
                    <div className="lg:row-span-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Book Cover
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Book cover preview"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData({ ...formData, ImageUrl: "" });
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Upload book cover</p>
                            <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="cover-upload"
                        />
                        <label
                          htmlFor="cover-upload"
                          className="mt-4 inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" /> Choose File
                        </label>
                      </div>
                    </div>
        
                    {/* Book Fields */}
                    <div className="space-y-4">
                      <InputField
                        label="Title *"
                        value={formData.Title}
                        onChange={(e) =>
                          setFormData({ ...formData, Title: e.target.value })
                        }
                        placeholder="Enter book title"
                      />
                      <InputField
                        label="Author *"
                        value={formData.Author}
                        onChange={(e) =>
                          setFormData({ ...formData, Author: e.target.value })
                        }
                        placeholder="Enter author name"
                      />
                      <div className="relative">
                      <InputField
                        label="ISBN *"
                        icon={<Hash className="w-4 h-4" />}
                        value={formData.ISBN}
                        onChange={(e) =>
                          setFormData({ ...formData, ISBN: e.target.value })
                        }
                        placeholder="Enter ISBN number"
                      />
                      <button
                        type="button"
                        onClick={handleFetchBookDetails}
                        className="ml-2 px-3 py-1 bg-primary text-white rounded-lg flex items-center gap-1 hover:bg-primary-700 absolute right-1.5 bottom-1"
                      >
                        <Search className="w-4 h-4" />
                        Fetch
                        </button>
                        </div>
                      <SelectField
                        label="Category *"
                        value={formData.Category}
                        onChange={(e) =>
                          setFormData({ ...formData, Category: e.target.value })
                        }
                        options={[
                          "Fiction",
                          "Non-Fiction",
                          "Science",
                          "Self-Help",
                          "Biography",
                          "History",
                          "Romance",
                          "Mystery",
                        ]}
                      />
                      <SelectField
                        label="Condition *"
                        value={formData.Condition}
                        onChange={(e) =>
                          setFormData({ ...formData, Condition: e.target.value })
                        }
                        options={["New", "Used"]}
                      />
                      <InputField
                        label="Published Year *"
                        type="number"
                        icon={<Calendar className="w-4 h-4" />}
                        value={formData.PublishedYear}
                        onChange={(e) =>
                          setFormData({ ...formData, PublishedYear: e.target.value })
                        }
                        placeholder="Enter published year"
                      />
                      <InputField
                        label="Stock Quantity *"
                        type="number"
                        icon={<Package className="w-4 h-4" />}
                        value={formData.StockQuantity}
                        onChange={(e) =>
                          setFormData({ ...formData, StockQuantity: e.target.value })
                        }
                        placeholder="Enter stock quantity"
                      />
                    </div>
                  </div>
        
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.Description}
                      onChange={(e) =>
                        setFormData({ ...formData, Description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief description of the book"
                    />
                  </div>
                </div>
        
                {/* Availability & Pricing */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Availability & Pricing
                  </h2>
        
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Availability Type *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="Availability"
                            value="lend"
                            checked={formData.Availability === "lend"}
                            onChange={(e) =>
                              setFormData({ ...formData, Availability: e.target.value })
                            }
                            className="text-primary-500 focus:ring-primary-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">For Lending</div>
                            <div className="text-sm text-gray-500">
                              Allow others to borrow
                            </div>
                          </div>
                        </label>
                        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="Availability"
                            value="Sell"
                            checked={formData.Availability === "Sell"}
                            onChange={(e) =>
                              setFormData({ ...formData, Availability: e.target.value })
                            }
                            className="text-primary-500 focus:ring-primary-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">For Sale</div>
                            <div className="text-sm text-gray-500">
                              Sell permanently
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
        
                    {(formData.Availability === "Sell" ||
                      formData.Availability === "Lend") && (
                      <div>
                        <InputField
                          label={
                            formData.Availability === "Sell"
                              ? "Selling Price *"
                              : "Landing Fee *"
                          }
                          type="number"
                          icon={<FaMoneyBills className="w-4 h-4" />}
                          value={formData.Price}
                          onChange={(e) =>
                            setFormData({ ...formData, Price: e.target.value })
                          }
                          placeholder={
                            formData.Availability === "Sell"
                              ? "Enter selling Price *"
                              : "Enter landing fee "
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
        
                {/* Pickup Location */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" /> Pickup Location
                  </h2>
        
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Pickup Point *
                    </label>
                    <select
                      value={formData.PickupPoint}
                      onChange={(e) =>
                        setFormData({ ...formData, PickupPoint: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose pickup point</option>
                      {pickupPointsData?.data?.map((point: any) => (
                        <option key={point._id} value={point._id}>
                          {point.Name} - {point.Address}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
        
                {/* Preview */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
        
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-start space-x-4">
                    <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <BookOpen className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {formData.Title || "Book Title"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        by {formData.Author || "Author"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formData.Category || "Category"} •{" "}
                        {formData.Condition || "Condition"} •{" "}
                        {formData.PublishedYear || "Year"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Stock: {formData.StockQuantity || "0"}
                      </p>
                    </div>
                  </div>
        
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">
                        Admin Approval Required
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your book will be reviewed by our admin team before it becomes
                        available.
                      </p>
                    </div>
                  </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}

/* --- helper components --- */
const InputField = ({ label, type = "text", value, onChange, placeholder, icon }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      required
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
