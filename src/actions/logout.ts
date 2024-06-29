'use server'

import { signOut } from '../../auth'
import { NextResponse, NextRequest } from 'next/server';

export const logout = async () => {
  const val = await signOut()
  return NextResponse.redirect(new URL('/'));


}
