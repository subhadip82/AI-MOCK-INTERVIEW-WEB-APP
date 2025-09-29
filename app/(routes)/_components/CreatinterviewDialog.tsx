import React from 'react'
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


function CreatinterviewDialog() {

const [formData, setFormData] = React.useState<any>();

const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
        ...prev,
        [field]: value
    }))
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
             <Tabs defaultValue="resume-upload" className="w-full mt-5">
          <TabsList>
            <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
            <TabsTrigger value="job-description">Job Description</TabsTrigger>
          </TabsList>
          <TabsContent value="resume-upload"> <ResumeUpload /> </TabsContent>
          <TabsContent value="job-description"> <JobDescription onHandleInputChange={onHandleInputChange} /> </TabsContent>
        </Tabs>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-end gap-4'>
            <DialogClose>
            <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
            <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default CreatinterviewDialog