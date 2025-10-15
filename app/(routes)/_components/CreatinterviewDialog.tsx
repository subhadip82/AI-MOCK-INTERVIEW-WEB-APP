import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ResumeUpload from "./ResumeUpload";
import JobDescription from "./JobDescription";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"; // ✅ correct import
import { UserDetailsContext } from "@/contex/UserDetailsContext";
import { Id } from "@/convex/_generated/dataModel";
import { saveInterviewQuestion } from "@/convex/interview";
import { useRouter } from "next/navigation"; // ✅



const CreateInterviewDialog = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const { userDetail } = useContext(UserDetailsContext);

  // ✅ Correct Convex mutation (since your file is convex/saveInterviewQuestion.ts)
  const saveInterview = useMutation(api.interview.saveInterviewQuestion);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  setLoading(true);
  const formData_ = new FormData();
  formData_.append("file", file ?? "");
  formData_.append("jobTitle", formValues.jobTitle || "");
  formData_.append("jobDescription", formValues.jobDescription || "");

  try {
    console.log("Sending request with:", {
      file: file?.name,
      jobTitle: formValues.jobTitle,
      jobDescription: formValues.jobDescription
    });

    const res = await axios.post("/api/generate-interview-question", formData_);
    console.log("API Response:", res.data);

    // Handle rate limiting
    if (res?.data.status === 429) {
      alert("⚠️ Rate limit exceeded. Please try again later.");
      return;
    }

    // ✅ Correct extraction
    const questions = res.data.interviewQuestions || [];

    if (!Array.isArray(questions) || questions.length === 0) {
      alert("❌ No interview questions were generated. Please try again.");
      console.error("Invalid questions array:", questions);
      return;
    }

    // Format questions for Convex
    const formattedQuestions = questions.map((q: any) => ({
      question: q.question,
      answer: q.answer || ""
    }));

    console.log("Saving questions to Convex:", formattedQuestions);

    const resp = await saveInterview({
      questions: formattedQuestions,
      resumeUrl: res.data?.resumeUrl || undefined,
      uid: userDetail._id as Id<"userTable">,
      jobTitle: formValues.jobTitle || undefined,
      jobDescription: formValues.jobDescription || undefined,
    });

    console.log("✅ Saved to Convex:", resp);
    alert("🎯 Interview questions saved successfully!");

    router.push(`/interview/${resp}`);

  } catch (err: any) {
    console.error("❌ Error:", err?.response?.data || err);
    alert(err?.response?.data?.message || "Failed to save questions. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Create Interview</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Please submit the following details</DialogTitle>
          <DialogDescription>
            Choose a method to start your interview.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="resume-upload" className="w-full mt-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
            <TabsTrigger value="job-description">Job Description</TabsTrigger>
          </TabsList>

          <TabsContent value="resume-upload">
            <ResumeUpload
              setFiles={(files: File[]) => setFile(files[0])}
              file={file}
            />
          </TabsContent>

          <TabsContent value="job-description">
            <JobDescription onHandleInputChange={handleInputChange} />
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
 export default CreateInterviewDialog