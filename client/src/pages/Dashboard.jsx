import { PlusIcon, UploadCloudIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createResumeThunk, deleteResumeThunk, fetchResumesThunk, renameResumeThunk } from '../features/resume/resumeSlice.js'
import SkeletonCard from '../components/SkeletonCard.jsx'
import { useToast } from '../components/toastContext.js'
import { uploadResumeText } from '../api/aiApi.js'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import Modal from '../components/Modal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ResumeCard from '../components/ResumeCard.jsx'
import { motion as Motion } from 'framer-motion'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { list: allResumes, error, loading } = useSelector((state) => state.resume)
    const { showToast } = useToast()
    const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
    const [showCreateResume, setShowCreateResume] = useState(false)
    const [showUploadResume, setShowUploadResume] = useState(false)
    const [title, setTitle] = useState('')
    const [resume, setResume] = useState(null)
    const [deleteResumeId, setDeleteResumeId] = useState('')
    const [renameResume, setRenameResume] = useState(null)
    const [renameTitle, setRenameTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const createResume = async (event) => {
        event.preventDefault();
        const action = await dispatch(createResumeThunk(title || "Untitled Resume"));
        if (createResumeThunk.fulfilled.match(action)) {
            const data = action.payload;
            setShowCreateResume(false)
            setTitle("")
            showToast({ message: "Resume created successfully" })
            navigate(`/app/builder/${data.resume._id}`)
        } else {
            showToast({ message: action.payload || "Failed to create resume", type: "error" })
        }
    }

    const uploadResume = async (event) => {
        event.preventDefault();
        if (!resume) {
            showToast({ message: "Please select a resume file first", type: "error" });
            return;
        }
        setIsLoading(true);
        try {
            let resumeText = "";
            if (resume.type === 'application/pdf') {
                resumeText = await pdfToText(resume);
            } else {
                resumeText = await resume.text();
            }

            const data = await uploadResumeText({ title: title || "Uploaded Resume", resumeText });
            setShowUploadResume(false);
            setResume(null);
            setTitle("");
            showToast({ message: "Resume uploaded and parsed" });
            navigate(`/app/builder/${data.resume._id}`);
        } catch (error) {
            showToast({ message: error.message || "Failed to upload resume", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleRename = async (event) => {
        event.preventDefault();
        if (!renameResume || !renameTitle.trim()) return;
        const action = await dispatch(renameResumeThunk({ resumeId: renameResume._id, title: renameTitle }));
        if (renameResumeThunk.fulfilled.match(action)) {
            showToast({ message: "Resume renamed successfully" })
            setRenameResume(null)
            setRenameTitle("")
        } else {
            showToast({ message: action.payload || "Failed to rename resume", type: "error" })
        }
    }

    const deleteResume = async (resumeId) => {
        const action = await dispatch(deleteResumeThunk(resumeId));
        if (deleteResumeThunk.fulfilled.match(action)) {
            showToast({ message: "Resume deleted successfully" })
        } else {
            showToast({ message: action.payload || "Failed to delete resume", type: "error" })
        }
        setDeleteResumeId('')
    }

    useEffect(() => {
        dispatch(fetchResumesThunk());
    }, [dispatch])


    return (
        <div className='space-y-6'>
            <Motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
                <p className='text-xs uppercase tracking-wider text-slate-500'>Dashboard</p>
                <h1 className='mt-1 text-2xl font-semibold text-slate-900'>Welcome back</h1>
                <p className='mt-1 text-sm text-slate-600'>Manage resumes, upload existing files, and continue editing.</p>
            </Motion.section>

            {error && <p className='rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600'>{error}</p>}

            <section className='grid gap-3 sm:grid-cols-2 lg:max-w-xl'>
                <Button size="lg" className="justify-start gap-3" onClick={() => setShowCreateResume(true)}>
                    <PlusIcon className='size-4' /> Create Resume
                </Button>
                <Button variant="secondary" size="lg" className="justify-start gap-3" onClick={() => setShowUploadResume(true)}>
                    <UploadCloudIcon className='size-4' /> Upload Existing
                </Button>
            </section>

            <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} className='h-48 w-full' />)
                ) : allResumes.length === 0 ? (
                    <div className='sm:col-span-2 lg:col-span-4'>
                        <EmptyState
                            title="No resumes yet"
                            description="Create your first resume or upload an existing one to get started."
                            actionLabel="Create Resume"
                            onAction={() => setShowCreateResume(true)}
                        />
                    </div>
                ) : (
                    allResumes.map((resumeItem, index) => {
                        const baseColor = colors[index % colors.length];
                        return (
                            <ResumeCard
                                key={resumeItem._id}
                                resume={resumeItem}
                                color={baseColor}
                                onOpen={() => navigate(`/app/builder/${resumeItem._id}`)}
                                onDelete={() => setDeleteResumeId(resumeItem._id)}
                                onRename={() => {
                                    setRenameResume(resumeItem);
                                    setRenameTitle(resumeItem.title);
                                }}
                            />
                        );
                    })
                )}
            </section>

            <Modal
                open={showCreateResume}
                onOpenChange={setShowCreateResume}
                title="Create Resume"
                description="Add a title and start building."
            >
                <form onSubmit={createResume} className='space-y-3'>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter resume title' required />
                    <Button className="w-full">Create Resume</Button>
                </form>
            </Modal>

            <Modal
                open={showUploadResume}
                onOpenChange={setShowUploadResume}
                title="Upload Resume"
                description="Upload a text/pdf resume and let AI parse the content."
            >
                <form onSubmit={uploadResume} className='space-y-3'>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter resume title' required />
                    <Input type="file" accept='.pdf,.txt,.md' onChange={(e) => setResume(e.target.files?.[0] || null)} />
                    <Button className="w-full" disabled={isLoading}>
                        {isLoading ? "Uploading & Parsing..." : "Upload Resume"}
                    </Button>
                </form>
            </Modal>

            <ConfirmDialog
                open={Boolean(deleteResumeId)}
                onOpenChange={(v) => !v && setDeleteResumeId('')}
                onConfirm={() => deleteResume(deleteResumeId)}
                title="Delete Resume?"
                description="This action cannot be undone."
                confirmText="Delete"
            />

            <Modal
                open={Boolean(renameResume)}
                onOpenChange={(v) => !v && setRenameResume(null)}
                title="Rename Resume"
                description="Enter a new title for your resume."
            >
                <form onSubmit={handleRename} className='space-y-3'>
                    <Input value={renameTitle} onChange={(e) => setRenameTitle(e.target.value)} placeholder='Enter resume title' required />
                    <Button className="w-full">Rename Resume</Button>
                </form>
            </Modal>
        </div>
    )
}

export default Dashboard
