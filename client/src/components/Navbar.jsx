import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, Menu, UserCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { motion as Motion } from 'framer-motion';

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()

    const logoutUser = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur'>
            <Motion.nav
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-slate-800'
            >
                <Link to='/' className='flex items-center gap-2'>
                    <img src="./logo.svg" alt="logo" className='h-10 w-auto' />
                    {/* <span className='hidden text-sm font-medium text-slate-600 sm:inline'>AI Resume Builder</span> */}
                </Link>

                <div className='flex items-center gap-2'>
                    <p className='hidden text-sm text-slate-600 md:block'>Welcome back, {user?.name || "User"}</p>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Button variant="outline" size="sm" className="rounded-full px-3">
                                <UserCircle2 className='size-4' />
                                <Menu className='size-4 md:hidden' />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                sideOffset={8}
                                align="end"
                                className='z-50 min-w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg'
                            >
                                <DropdownMenu.Item className='rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:bg-slate-100'>
                                    {user?.email || "Signed in"}
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className='my-1 h-px bg-slate-200' />
                                <DropdownMenu.Item
                                    onSelect={logoutUser}
                                    className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 outline-none focus:bg-red-50'
                                >
                                    <LogOut className='size-4' /> Logout
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            </Motion.nav>
        </header>
    )
}

export default Navbar
