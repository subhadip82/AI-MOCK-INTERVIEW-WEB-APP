import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUpload from './ResumeUpload'
import JobDescription from './JobDescription'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from 'axios'

function CreatinterviewDialog() {
  const [formData, setFormData] = useState<any>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const onsubmit = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      // Make sure this matches your API route folder name!
      const res = await axios.post('/api/gentert-interview-qustion', formData);
      console.log(res.data);
      alert("PDF uploaded successfully!");
    } catch (err) {
      console.log(err);
      alert("PDF upload failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Create Interview</Button>
      </DialogTrigger>
      <DialogContent className='min-w-3xl'>
        <DialogHeader>
          <DialogTitle>Please submit following details.</DialogTitle>
          <DialogDescription>
            Choose a method to start your interview.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="resume-upload" className="w-full mt-5">
          <TabsList>
            <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
            <TabsTrigger value="job-description">Job Description</TabsTrigger>
          </TabsList>
        <TabsContent value="resume-upload">
  <ResumeUpload setFiles={(file: File[]) => setFile(file[0])} file={file} />
</TabsContent>
          <TabsContent value="job-description">
            <JobDescription onHandleInputChange={onHandleInputChange} />
          </TabsContent>
        </Tabs>
        <DialogFooter className='flex justify-end gap-4'>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button onClick={onsubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreatinterviewDialog