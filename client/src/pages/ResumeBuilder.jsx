import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, GripVertical, Share2Icon, Sparkles, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import PersonalInfoForm from '../components/PersonalInfoForm'
import TemplateSelector from '../components/TemplateSelector.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm.jsx'
import ExperienceForm from '../components/ExperienceForm.jsx'
import EducationForm from '../components/EducationForm.jsx'
import ProjectForm from '../components/ProjectForm.jsx'
import SkillsForm from '../components/SkillsForm.jsx'
import { fetchResumeByIdThunk, setCurrentResume, updateResumeThunk } from '../features/resume/resumeSlice.js'
import { enhanceProfessionalSummary, getAtsScore } from '../api/aiApi.js'
import { useToast } from '../components/toastContext.js'
import SkeletonCard from '../components/SkeletonCard.jsx'
import { motion as Motion } from 'framer-motion'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Input } from '../components/ui/input.jsx'
import { Badge } from '../components/ui/badge.jsx'
import LivePreview from '../components/LivePreview.jsx'
import EditorSection, { EditorSectionGroup } from '../components/EditorSection.jsx'

const ResumeBuilder = () => {

    const { resumeId } = useParams()
    const dispatch = useDispatch()
    const { current: currentResume, loading } = useSelector((state) => state.resume)
    const { showToast } = useToast()

    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: '',
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: 'classic',
        accent_color: '#3B82F6',
        public: false
    })

    const [removeBackground, setRemoveBackground] = useState(false)
    const [autosaveStatus, setAutosaveStatus] = useState('Saved')
    const [isEnhancingSummary, setIsEnhancingSummary] = useState(false)
    const [jobDescription, setJobDescription] = useState('')
    const [atsLoading, setAtsLoading] = useState(false)
    const [atsResult, setAtsResult] = useState(null)
    const [sectionOrder, setSectionOrder] = useState(["personal", "summary", "experience", "education", "projects", "skills"])
    const [draggingSection, setDraggingSection] = useState(null)
    const [mobilePreview, setMobilePreview] = useState(false)

    const sections = useMemo(
        () => ({
            personal: { id: "personal", name: "Personal Info", icon: User },
            summary: { id: "summary", name: "Summary", icon: FileText },
            experience: { id: "experience", name: "Experience", icon: Briefcase },
            education: { id: "education", name: "Education", icon: GraduationCap },
            projects: { id: "projects", name: "Projects", icon: FolderIcon },
            skills: { id: "skills", name: "Skills", icon: Sparkles },
        }),
        []
    );

    useEffect(() => {
        dispatch(fetchResumeByIdThunk(resumeId));
    }, [dispatch, resumeId])

    useEffect(() => {
        if (currentResume && !resumeData._id) {
            setResumeData(currentResume);
        }
    }, [currentResume, resumeData._id])

    useEffect(() => {
        if (resumeData.title) {
            document.title = resumeData.title;
        }
    }, [resumeData.title])

    useEffect(() => {
        if (!resumeData._id) return;

        setAutosaveStatus('Saving...')
        const timer = setTimeout(() => {
            dispatch(updateResumeThunk({ resumeId, body: resumeData }))
                .unwrap()
                .then(() => setAutosaveStatus('Saved'))
                .catch(() => setAutosaveStatus('Save failed'));
        }, 1000);
        return () => clearTimeout(timer);
    }, [dispatch, resumeData, resumeId]);

    const handleEnhanceSummary = async () => {
        if (!resumeData.professional_summary?.trim()) return;
        setIsEnhancingSummary(true);
        try {
            const data = await enhanceProfessionalSummary(resumeData.professional_summary);
            setResumeData((prev) => ({ ...prev, professional_summary: data.enhancedContent }));
            showToast({ message: 'Summary enhanced with AI' });
        } catch (error) {
            showToast({ message: error.message || 'AI enhancement failed', type: 'error' });
        } finally {
            setIsEnhancingSummary(false);
        }
    };

    const handleAnalyzeAts = async () => {
        if (!jobDescription.trim()) return;
        setAtsLoading(true);
        try {
            const data = await getAtsScore({ jobDescription, resumeData });
            setAtsResult(data);
        } catch (error) {
            showToast({ message: error.message || 'ATS analysis failed', type: 'error' });
        } finally {
            setAtsLoading(false);
        }
    };

    const changeResumeVisibility = async () => {
        setResumeData({ ...resumeData, public: !resumeData.public })
    }

    const handleSectionDrop = (target) => {
        if (!draggingSection || draggingSection === target) return;
        const next = [...sectionOrder];
        const from = next.indexOf(draggingSection);
        const to = next.indexOf(target);
        next.splice(from, 1);
        next.splice(to, 0, draggingSection);
        setSectionOrder(next);
        setDraggingSection(null);
    };

    const handleShare = async () => {
        const frontendUrl = window.location.href.split('/app/')[0];
        const resumeUrl = frontendUrl + '/view/' + resumeId;

        if (navigator.share) {
            navigator.share({ url: resumeUrl, text: "My Resume" })
        }
        else {
            alert("Share not supported on this browser.")
        }
    }

    const downloadResume = () => {
        window.print();
    }

    return (
        <div className='space-y-4'>
            <Motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className='flex items-center justify-between'>
                <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
                    <ArrowLeftIcon className='size-4' /> Back to Dashboard
                </Link>
                <div className='flex items-center gap-2 md:hidden'>
                    <Button variant={mobilePreview ? "outline" : "secondary"} size="sm" onClick={() => setMobilePreview(false)}>Editor</Button>
                    <Button variant={mobilePreview ? "secondary" : "outline"} size="sm" onClick={() => setMobilePreview(true)}>Preview</Button>
                </div>
            </Motion.div>

            <div className='grid gap-4 lg:grid-cols-10'>
                <div className={`${mobilePreview ? "hidden" : "block"} lg:block lg:col-span-4`}>
                    <Card className='sticky top-20'>
                        <CardHeader className='space-y-3'>
                            <div className='flex items-center justify-between gap-2'>
                                <Input
                                    value={resumeData.title}
                                    onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
                                    className="h-8 border-none bg-transparent p-0 text-lg font-semibold focus-visible:ring-0"
                                    placeholder="Resume Title"
                                />
                                <Badge className={autosaveStatus === "Save failed" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}>
                                    {autosaveStatus}
                                </Badge>
                            </div>
                            <div className='flex items-center gap-2'>
                                <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData((prev) => ({ ...prev, template }))} />
                                <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData((prev) => ({ ...prev, accent_color: color }))} />
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2'>
                                {sectionOrder.map((sectionId) => {
                                    const section = sections[sectionId];
                                    return (
                                        <button
                                            key={sectionId}
                                            draggable
                                            onDragStart={() => setDraggingSection(sectionId)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={() => handleSectionDrop(sectionId)}
                                            className='inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs text-slate-700 shadow-sm'
                                        >
                                            <GripVertical className='size-3 text-slate-400' />
                                            {section.name}
                                        </button>
                                    );
                                })}
                            </div>

                            {loading && !resumeData._id ? (
                                <div className='space-y-3'>
                                    <SkeletonCard className='h-10 w-full' />
                                    <SkeletonCard className='h-32 w-full' />
                                </div>
                            ) : (
                                <EditorSectionGroup defaultValue="personal">
                                    {sectionOrder.map((sectionId) => {
                                        if (sectionId === "personal") {
                                            return (
                                                <EditorSection key={sectionId} value={sectionId} title="Personal Info">
                                                    <PersonalInfoForm
                                                        data={resumeData.personal_info}
                                                        onChange={(data) => setResumeData((prev) => ({ ...prev, personal_info: data }))}
                                                        removeBackground={removeBackground}
                                                        setRemoveBackground={setRemoveBackground}
                                                    />
                                                </EditorSection>
                                            );
                                        }
                                        if (sectionId === "summary") {
                                            return (
                                                <EditorSection key={sectionId} value={sectionId} title="Professional Summary">
                                                    <ProfessionalSummaryForm
                                                        data={resumeData.professional_summary}
                                                        onChange={(data) => setResumeData((prev) => ({ ...prev, professional_summary: data }))}
                                                        onEnhance={handleEnhanceSummary}
                                                        isEnhancing={isEnhancingSummary}
                                                    />
                                                </EditorSection>
                                            );
                                        }
                                        if (sectionId === "experience") {
                                            return <EditorSection key={sectionId} value={sectionId} title="Experience"><ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData((prev) => ({ ...prev, experience: data }))} /></EditorSection>;
                                        }
                                        if (sectionId === "education") {
                                            return <EditorSection key={sectionId} value={sectionId} title="Education"><EducationForm data={resumeData.education} onChange={(data) => setResumeData((prev) => ({ ...prev, education: data }))} /></EditorSection>;
                                        }
                                        if (sectionId === "projects") {
                                            return <EditorSection key={sectionId} value={sectionId} title="Projects"><ProjectForm data={resumeData.project} onChange={(data) => setResumeData((prev) => ({ ...prev, project: data }))} /></EditorSection>;
                                        }
                                        return <EditorSection key={sectionId} value={sectionId} title="Skills"><SkillsForm data={resumeData.skills} onChange={(data) => setResumeData((prev) => ({ ...prev, skills: data }))} /></EditorSection>;
                                    })}
                                </EditorSectionGroup>
                            )}

                            <Button onClick={() => dispatch(updateResumeThunk({ resumeId, body: resumeData }))} className='w-full'>
                                Save Now
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className={`${mobilePreview ? "block" : "hidden"} lg:block lg:col-span-6 space-y-4`}>
                    <div className='flex flex-wrap items-center justify-end gap-2'>
                        {resumeData.public && (
                            <Button variant="secondary" size="sm" onClick={handleShare}>
                                <Share2Icon className='size-4' /> Share
                            </Button>
                        )}
                        <Button variant="secondary" size="sm" onClick={changeResumeVisibility}>
                            {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                            {resumeData.public ? "Public" : "Private"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadResume}>
                            <DownloadIcon className='size-4' /> Download
                        </Button>
                    </div>

                    <LivePreview data={resumeData} />

                    <Card>
                        <CardHeader>
                            <CardTitle>ATS Score Checker</CardTitle>
                            <p className='text-xs text-slate-500'>Paste a job description to match keywords and optimize relevance.</p>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder='Paste job description here...'
                                rows={5}
                                className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm'
                            />
                            <Button variant="secondary" disabled={atsLoading || !jobDescription.trim()} onClick={handleAnalyzeAts}>
                                {atsLoading ? 'Analyzing...' : 'Analyze ATS Match'}
                            </Button>
                            {atsResult && (
                                <div className='rounded-xl bg-slate-50 p-3 text-sm'>
                                    <p className='font-semibold text-slate-800'>Score: {atsResult.ats_score}/100</p>
                                    <p className='mt-1 text-slate-600'>Matched: {(atsResult.matched_keywords || []).join(', ') || 'None'}</p>
                                    <p className='mt-1 text-slate-600'>Missing: {(atsResult.missing_keywords || []).join(', ') || 'None'}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ResumeBuilder
