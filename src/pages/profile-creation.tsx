import React, { useEffect, useState } from "react";
import { User, Camera, Save, DollarSign, X, Plus } from "lucide-react";
import ImageUploadButton from "../components/form-components/ImageUploadBtn";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProfileRequest, updateProfileRequest } from "../features/profile/profileSlice";
import { getTokenPayload } from "../utils/getTokenPayload";
import { mockProfile, popularSkills } from "../constants/profile.const";
import { useProfileById } from "../hooks/useProfileById";

// Profile Creation Component
export const ProfileCreation = ({ onComplete, userRole = "FREELANCER" }: any) => {
  const methods = useForm({
    defaultValues: {
      bio: mockProfile.bio || "",
      skills: mockProfile.skills || [],
      hourlyRate: mockProfile.hourlyRate || "",
      availability: mockProfile.availability || "Part-time",
      profileImage: mockProfile.profileImage || null,
    },
  });
  const { reset } = methods;
  const { profileData, isLoading, isError }: any = useProfileById();
  console.log(profileData, "profileData in profileCreation");

  const [formData, setFormData] = useState<any>({
    bio: "",
    skills: [],
    hourlyRate: "",
    availability: "Part-time",
    profileImage: null,
  });

  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();

  const availabilityOptions = ["Part-time", "Full-time", "Contract", "Weekends only", "Evenings only"];
  const tokenPayload: any = getTokenPayload(); // Replace with actual user ID from auth context or state

  const handleInputChange: any = (field: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: null }));
    }
  };

  const addSkill = (skill: any) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev: any) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: any) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((skill: any) => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.bio || formData.bio.length < 50) {
      newErrors.bio = "Bio must be at least 50 characters long";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill";
    }

    if (userRole === "FREELANCER" && (!formData.hourlyRate || formData.hourlyRate <= 0)) {
      newErrors.hourlyRate = "Please enter a valid hourly rate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleImageChange = (input: React.ChangeEvent<HTMLInputElement> | FileList | null) => {
    let files: FileList | null = null;

    if (input && "target" in input) {
      // It's an event
      files = input.target.files;
    } else if (input instanceof FileList) {
      // It's directly a FileList
      files = input;
    }

    const file = files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev: any) => ({
        ...prev,
        profileImage: previewUrl,
      }));
    } else {
      // If no file, clear image
      setFormData((prev: any) => ({
        ...prev,
        profileImage: null,
      }));
    }
  };

  useEffect(() => {
    if (profileData) {
      reset({
        bio: profileData.bio || "",
        skills: profileData.skills || [],
        hourlyRate: profileData.hourlyRate || "",
        availability: profileData.availability || "Part-time",
        profileImage: profileData.profileImage || null,
      });
      setFormData({
        bio: profileData.bio || "",
        skills: profileData.skills || [],
        hourlyRate: profileData.hourlyRate || "",
        availability: profileData.availability || "Part-time",
        profileImage: profileData.profileImage || null,
      });
    }
  }, [profileData, reset]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload: any = {
      // userId: tokenPayload.id,
      bio: formData.bio,
      skills: formData.skills,
      hourlyRate: Number(formData.hourlyRate),
      availability: formData.availability,
      profileImage: formData.profileImage,
    };
    console.log(payload, "dddf");

    if (profileData) {
      dispatch(updateProfileRequest(payload));
    } else {
      dispatch(createProfileRequest(payload));
    }
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     dispatch(
  //       createProfileRequest({
  //         userId: tokenPayload.id,
  //         bio: formData.bio,
  //         skills: formData.skills,
  //         hourlyRate: Number(formData.hourlyRate),
  //         availability: formData.availability,
  //         profileImage: formData.profileImage, // Set this after uploading file
  //       })
  //     );
  //   }
  // };

  if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Something went wrong</p>;
  // if (!profileData) return <p>No profile found</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
          <p className="text-gray-600 mt-2">
            {userRole === "FREELANCER"
              ? "Build a compelling profile to attract clients and showcase your expertise"
              : "Create your profile to better connect with freelancers"}
          </p>
        </div>
        <FormProvider {...methods}>
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    {formData.profileImage ? (
                      <img src={formData.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Upload a professional photo to make a great first impression
                  </p>
                  <ImageUploadButton
                    name="profileImage"
                    label="Upload Image"
                    required
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple={false}
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Bio</h2>
              <div>
                <textarea
                  rows={6}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder={`Tell ${
                    userRole === "FREELANCER" ? "clients" : "freelancers"
                  } about your experience, expertise, and what makes you unique...`}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                  <p className="text-sm text-gray-500 ml-auto">{formData.bio.length}/500 characters</p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h2>

              {/* Add Custom Skill */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(newSkill))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill(newSkill)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Popular Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Popular Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      disabled={formData.skills.includes(skill)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        formData.skills.includes(skill)
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Skills */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Your Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill: any) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                    >
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-indigo-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills}</p>}
              </div>
            </div>

            {/* Rate & Availability (for Freelancers) */}
            {userRole === "FREELANCER" && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Rate & Availability</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        placeholder="75"
                        className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.hourlyRate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange("availability", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="w-4 h-4" />
                {profileData ? "Update Profile" : "Create Profile"}
              </button>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
