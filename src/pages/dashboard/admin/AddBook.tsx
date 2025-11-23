import React, { useState } from "react";
import {
  Upload,
  MapPin,
  DollarSign,
  BookOpen,
  Tag,
  Camera,
  AlertCircle,
  Hash,
  Layers,
  Calendar,
  Package,
  Search,
} from "lucide-react";
import { useFullUser } from "../../../redux/hooks/useUserByEmail";
import { useGetSpecificPickupPointQuery } from "../../../redux/features/pickup/pickupApi";
import { FaMoneyBills } from "react-icons/fa6";
import { toast } from "sonner";
import {
  useAddBookMutation,
  useGetAcademicFiltersQuery,
  useGetBookDetailsMutation,
} from "../../../redux/features/books/bookApi";
import useImageUpload from "../../../hooks/useImageUpload";
import LoadingPage from "../../LoadingPage";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function AddBookPage() {
  const { user, isLoading: isUserLoading } = useFullUser();
  const [image, setImage] = useState<File | null>(null);
  const { uploadImage, isUploading } = useImageUpload();
  const { data: pickupPointsData, isLoading: isPickupPointsLoading } =
    useGetSpecificPickupPointQuery(user?._id ?? "", {
      skip: !user?._id,
    });
  const [addBook, { isLoading }] = useAddBookMutation();
  const [getBookDetails] = useGetBookDetailsMutation();
  const { currentData: insub } = useGetAcademicFiltersQuery(null);
  const [manualData, setManualData] = useState({
    Subject: "",
    Institution: "",
  });
  const navigate = useNavigate();

  console.log(insub);

  const [formData, setFormData] = useState({
    Title: "",
    ISBN: "",
    Author: "",
    Category: "Fiction",
    Price: "",
    ActualPrice: "",
    PublishedYear: "",
    Condition: "",
    Availability: "Lend", // Default to lend
    Description: "",
    ImageUrl: "",
    PickupPoint: "",
    BookOwner: user?._id,
    RequireDeposit: false, // New field for security deposit agreement

    // New Academic Fields
    Institution: "",
    Subject: "",
    Semester: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const institutions = insub?.data?.institutions;

  const subjects = insub?.data?.subjects;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);

      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setFormData({ ...formData, ImageUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImageUrl = "";

    console.log(formData);
    if (image) {
      const { url, public_id } = await uploadImage(image);
      uploadedImageUrl = url;
    }

    const finalFormData = {
    ...formData,
    Subject:formData.Subject === "Others (Type Manually)"? manualData.Subject: formData.Subject,
    Institution:formData.Institution === "Others (Type Manually)"? manualData.Institution: formData.Institution,
  };


    

    // Convert numeric fields
    const numericFormData = {
      ...finalFormData,
      Price: parseFloat(formData.Price),
      ImageUrl: uploadedImageUrl,
      PublishedYear: parseInt(formData.PublishedYear, 10),
    };
    toast.loading("Adding book...");
    try {
      console.log(numericFormData);
      const result = await addBook(numericFormData).unwrap();
      toast.dismiss(); // dismiss loading toast
      toast.success("Book added successfully!");
      navigate(`/dashboard/mybooks`);
    } catch (err) {
      toast.dismiss(); // dismiss loading toast
      // Extract and show specific validation error from Zod
      const zodErrors = err?.data?.error?.details;
      if (Array.isArray(zodErrors)) {
        zodErrors.forEach((detail: any) => {
          toast.error(detail?.message || "Validation error");
        });
      } else {
        toast.error(
          err?.data?.message || "Failed to add book. Please try again."
        );
      }

      console.error("Add book error:", err);
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

        if (res.data.ImageUrl) {
          setImagePreview(res.data.ImageUrl);
        }

        toast.success("Book details fetched!");
        toast.warning(
          "It Could be a different book data, please check the details",
          { position: "bottom-right" }
        );
      } else {
        toast.error("No book details found for this ISBN");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to fetch book details");
      console.error(err);
    }
  };



  if (isUserLoading || isPickupPointsLoading || isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Book</h1>
        <p className="text-gray-600">Share your book with the community</p>
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
                  setFormData({ ...formData, Category: e.target.value, Subject: "", Institution: "", Semester: "" })
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
                  "Academic",
                  "Fantasy",
                  "Horror",
                  "Science Fiction",
                  "Thriller",
                  "Children's",
                  "Young Adult",
                  "Comics",
                  "Graphic Novel",
                  "Poetry",
                  "Religion & Spirituality",
                  "Travel",
                  "Health & Wellness",
                  "Cooking",
                  "Others",
                ]}
              />

              {/* Academic Fields */}
              {formData.Category === "Academic" && (
                <div className="space-y-4 mt-4">

                  <SelectField
                label="Institution *"
                value={formData.Institution}
                onChange={(e) =>
                  setFormData({ ...formData, Institution: e.target.value, })
                }
                options={[...(institutions || []),"Others (Type Manually)"]}
                  />
                  
                  {
                    formData.Institution === "Others (Type Manually)" &&<InputField
                
                value={manualData.Institution}
                onChange={(e) =>
                  setManualData({ ...manualData, Institution: e.target.value })
                }
                placeholder="Enter Institution Name"
              />
                  }
                  

                

                     <SelectField
                label="Subject *"
                value={formData.Subject}
                onChange={(e) =>
                  setFormData({ ...formData, Subject: e.target.value, })
                }
                options={[...(subjects || []),"Others (Type Manually)"]}
                  />
                  
                  {
                    formData.Subject === "Others (Type Manually)" &&<InputField
                
                value={manualData.Subject}
                onChange={(e) =>
                  setManualData({ ...manualData, Subject: e.target.value })
                }
                placeholder="Enter Subject Name"
              />
                  }

                  <InputField
                    label="Semester"
                    value={formData.Semester}
                    onChange={(e) =>
                      setFormData({ ...formData, Semester: e.target.value })
                    }
                    placeholder="e.g., Fall 2024"
                    required={false}
                  />
                </div>
              )}

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
                    value="Lend"
                    checked={formData.Availability === "Lend"}
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

            {formData.Availability === "Lend" && (
              <>
                {/* Security Deposit Agreement */}
                <div className="flex items-center gap-2 relative ">
                  <input
                    type="checkbox"
                    id="RequireDeposit"
                    checked={formData.RequireDeposit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        RequireDeposit: e.target.checked,
                        ActualPrice:'',
                      })
                    }
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="RequireDeposit"
                    className="text-sm text-gray-700 flex items-center gap-1"
                  >
                    I require a security deposit
                    {/* Tooltip icon */}
                  </label>
                  <span className="relative group">
                    <FaQuestionCircle className="w-4 h-4 text-gray-500 cursor-pointer" />
                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block w-56 bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                      The security deposit is the amount a borrower must pay
                      when their request is accepted. If the book isn’t
                      returned, the deposit covers the book’s cost. Borrowers
                      without sufficient funds cannot request the book.
                    </span>
                  </span>
                </div>

                {formData.RequireDeposit && (
                  <InputField
                    label={
                      <>
                        <div className=" items-center gap-1 relative inline">
                          Actual Price *
                        </div>
                        <div className="group items-center gap-1 relative inline">
                          <FaQuestionCircle className="ml-2 w-4 h-4 text-gray-500 cursor-pointer inline" />
                          <span className="absolute left-0 top-12 ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 w-52 z-10">
                            This is the original price of the book, used as a
                            security deposit while lending.
                          </span>
                        </div>
                      </>
                    }
                    type="number"
                    icon={<FaMoneyBills className="w-4 h-4" />}
                    value={formData.ActualPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, ActualPrice: e.target.value })
                    }
                    placeholder="Actual Price of the Book"
                  />
                )}
              </>
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

          <div className="flex items-center justify-end space-x-4">
            {/* <button
              type="button"
              className="px-6 py-2 text-gray-600 hover:text-gray-700"
            >
              Save as Draft
            </button> */}
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Publish Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* Helper Components */
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  required=true,
  title,
}: any) => (
  <div>
    <label
      className="block text-sm font-medium text-gray-700 mb-2"
      title={title}
    >
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
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
        placeholder={placeholder}
        required={required}
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
