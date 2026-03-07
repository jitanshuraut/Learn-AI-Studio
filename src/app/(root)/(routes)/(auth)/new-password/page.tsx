'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { newPassword } from '@/actions/new-password'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function NewPasswordForm() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      toast.error('No token provided')
      return
    }

    setLoading(true)
    try {
      const data = await newPassword({ password }, token)
      if (data?.error) {
        toast.error(data.error)
      } else if (data?.success) {
        toast.success(data.success)
        router.push('/login')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CardWrapper
      headerTitle="Reset your password"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
            minLength={8}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </CardWrapper>
  )
}
