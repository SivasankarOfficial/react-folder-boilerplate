import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, ArrowLeft, Send } from "lucide-react";
import SelectInput from "../components/form-components/SelectInput";
import TextInput from "../components/form-components/TextInput";
import Button from "../components/form-components/SubmitButton";
import TextArea from "../components/form-components/TextArea";
import { createJobRequest } from "../features/jobPosts/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../components/ButtonLoader";

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Content Writing",
  "Digital Marketing",
  "Data Science",
  "Graphic Design",
  "Video Editing",
];

// 1. Zod Schema Definition
const JobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters."),
  category: z.string().nonempty("Category is required"),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Budget must be a positive number",
  }),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

type JobForm = z.infer<typeof JobSchema>;

export const PostNewJob = ({ onBack, onJobPosted }: any) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillsError, setSkillsError] = useState(""); // Track skill validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const IsLoading = useSelector((state: any) => state.jobs.loading);
  console.log("IsLoading:", IsLoading);

  // 2. Setup with zodResolver
  const methods = useForm<JobForm>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      category: "",
    },
  });

  const { handleSubmit, setError, clearErrors } = methods;

  // ----------- Skill logic -----------
  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setNewSkill("");
      setSkillsError(""); // Clear error locally
      // Removed clearErrors("skills");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
    setSkillsError(""); // Clear error locally
    // Removed clearErrors("skills");
  };

  // ----------- Submission -----------
  const onSubmit = (data: JobForm) => {
    if (skills.length === 0) {
      setSkillsError("At least one skill is required");
      // Removed setError("skills", ...)
      return;
    }
    setSkillsError(""); // Clear error if any
    setIsSubmitting(IsLoading);

    const budget = +data.budget; // Ensure budget is a number

    dispatch(createJobRequest({ ...data, budget: budget, requiredSkills: skills })); // Assuming you have a createJobRequest action

    setIsSubmitting(IsLoading);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
                  <p className="text-indigo-100 mt-1">Find the perfect freelancer for your project</p>
                </div>
              </div>
              <Plus className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="p-8 space-y-6">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextInput
                  name="title"
                  label="Job Title"
                  placeholder="e.g., Full Stack Developer for E-commerce Platform"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <SelectInput
                  name="category"
                  label="Category"
                  options={categories.map((cat) => ({ value: cat, label: cat }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <TextInput
                  name="budget"
                  label="Budget (USD)"
                  type="number"
                  placeholder="5000"
                  required
                  className="w-full pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {/* ---------- Skills Section ---------- */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button
                      type="button"
                      label="Add"
                      className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                      onClick={addSkill}
                      variant="secondary"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {skillsError && <p className="text-red-500 text-sm mt-1">{skillsError}</p>}
                </div>

                {/* Description */}
                <TextArea
                  id="description"
                  label="Job Description"
                  placeholder="Describe your project requirements, expectations, and any specific details..."
                  rows={6}
                  required
                />

                <div className="flex justify-end pt-4">
                  <ButtonLoader />

                  <Button
                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    type="submit"
                    label={
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Post Job
                      </span>
                    }
                    isLoading={IsLoading}
                    disabled={IsLoading}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
