import { CheckCircle2, Eye, EyeOff, Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, loginThunk, registerThunk } from '../features/auth/authSlice'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const Login = () => {
    const dispatch = useDispatch()
    const { loading, error, token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const query = new URLSearchParams(window.location.search);
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")
    const [showPassword, setShowPassword] = React.useState(false)

    const schema = React.useMemo(
        () =>
            z.object({
                name: state === "register" ? z.string().min(2, "Name must be at least 2 characters") : z.string().optional(),
                email: z.string().email("Enter a valid email"),
                password: z.string().min(8, "Password must be at least 8 characters"),
            }),
        [state]
    );

    const { register, handleSubmit: formHandleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: "", email: "", password: "" }
    })

    const onSubmitForm = async (formData) => {
        dispatch(clearAuthError())
        if (state === "login") {
            await dispatch(loginThunk({ email: formData.email, password: formData.password }))
            return
        }
        await dispatch(registerThunk(formData))

    }

    React.useEffect(() => {
        if (token) navigate('/app')
    }, [token, navigate])

    React.useEffect(() => {
        reset({ name: "", email: "", password: "" });
    }, [state, reset]);

    return (
        <div className='grid min-h-screen lg:grid-cols-2'>
            <div className='hidden lg:flex flex-col justify-center bg-slate-50 p-16 border-r border-slate-100 relative overflow-hidden'>
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-200 rounded-full blur-[120px]" />
                </div>

                <div className='max-w-md space-y-10 relative z-10'>
                    <div className='flex items-center gap-3'>
                        <div className='size-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 shadow-lg shadow-green-200 flex items-center justify-center text-white font-bold text-xl'>R</div>
                        <span className='text-xl font-bold tracking-tight text-slate-800'>
                            <img src="/logo.svg" alt="" />
                        </span>
                    </div>

                    <div className='space-y-4'>
                        <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]'>
                            Build resumes that <br /> <span className="text-green-600">get interviews.</span>
                        </h1>
                        <p className='text-lg text-slate-600 leading-relaxed'>
                            Modern AI-assisted resume workflows with live preview, ATS checks, and polished templates.
                        </p>
                    </div>

                    <ul className='space-y-4'>
                        {["AI-Powered Content Suggestions", "Real-time ATS Score Analysis", "Export to PDF & Markdown", "Custom Designer Templates"].map((feature) => (
                            <Motion.li
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                key={feature}
                                className='flex items-center gap-3 text-slate-700'
                            >
                                <CheckCircle2 className='size-5 text-green-500' />
                                <span className='text-sm font-semibold'>{feature}</span>
                            </Motion.li>
                        ))}
                    </ul>

                    <div className='pt-8 border-t border-slate-200 flex items-center gap-4'>
                        <div className='flex -space-x-2'>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className='size-8 rounded-full border-2 border-white bg-slate-200' />
                            ))}
                        </div>
                        <p className='text-xs text-slate-500 font-medium'>Joined by 10,000+ professionals worldwide</p>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center p-8 bg-white relative overflow-hidden'>
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50" />

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md relative z-10"
                >
                    <Card className="border-slate-100 shadow-2xl shadow-slate-200/60 backdrop-blur-sm bg-white/95">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">{state === "login" ? "Welcome back" : "Create your account"}</CardTitle>
                            <p className="text-sm text-slate-500">{state === "login" ? "Enter your details to access your workspace" : "Join thousands of professionals building better resumes"}</p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={formHandleSubmit(onSubmitForm)} className="space-y-5">
                                <AnimatePresence mode="wait">
                                    {state !== "login" && (
                                        <Motion.div
                                            key="name"
                                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <label className='mb-1.5 block text-xs font-semibold text-slate-700'>Full Name</label>
                                            <div className='relative'>
                                                <User2Icon size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                                                <Input type="text" placeholder="John Doe" className="pl-9 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" {...register("name")} />
                                            </div>
                                            {errors.name && <p className='mt-1.5 text-xs text-red-500 font-medium'>{errors.name.message}</p>}
                                        </Motion.div>
                                    )}
                                </AnimatePresence>

                                <div>
                                    <label className='mb-1.5 block text-xs font-semibold text-slate-700'>Email Address</label>
                                    <div className='relative'>
                                        <Mail size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                                        <Input type="email" placeholder="you@example.com" className="pl-9 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" {...register("email")} />
                                    </div>
                                    {errors.email && <p className='mt-1.5 text-xs text-red-500 font-medium'>{errors.email.message}</p>}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className='block text-xs font-semibold text-slate-700'>Password</label>
                                        {state === "login" && <button type="button" className="text-xs font-semibold text-green-600 hover:text-green-700">Forgot password?</button>}
                                    </div>
                                    <div className='relative'>
                                        <Lock size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" {...register("password")} />
                                        <button type="button" onClick={() => setShowPassword((v) => !v)} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'>
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className='mt-1.5 text-xs text-red-500 font-medium'>{errors.password.message}</p>}
                                </div>

                                <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-semibold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-[0.98]">
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Verifying...
                                        </div>
                                    ) : (state === "login" ? "Sign In" : "Create Account")}
                                </Button>

                                {error && (
                                    <Motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className='text-sm text-center text-red-600 bg-red-50 py-2 rounded-lg border border-red-100 font-medium'>
                                        {error}
                                    </Motion.p>
                                )}

                                <div className="pt-2 text-center text-sm text-slate-600">
                                    {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button type="button" onClick={() => setState((prev) => (prev === "login" ? "register" : "login"))} className='font-bold text-green-600 hover:text-green-700 hover:underline transition-all'>
                                        {state === "login" ? "Sign up for free" : "Sign in here"}
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </Motion.div>
            </div>
        </div>
    )
}

export default Login
