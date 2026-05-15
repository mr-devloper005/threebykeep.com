'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUp, Bookmark, MessageSquare, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RichContent } from '@/components/shared/rich-content'
import { SharePopup } from '@/components/ui/share-popup'

interface EnhancedSBMDetailCardProps {
  title: string
  description: string
  category: string
  domain: string
  author?: {
    name: string
    avatar?: string
  }
  upvotes: number
  saves: number
  commentsCount: number
  url: string
  tags: string[]
  isUpvoted?: boolean
  isSaved?: boolean
  slug: string
}

export function EnhancedSBMDetailCard({
  title,
  description,
  category,
  domain,
  author,
  upvotes,
  saves,
  commentsCount,
  url,
  tags,
  isUpvoted = false,
  isSaved = false,
  slug,
}: EnhancedSBMDetailCardProps) {
  const [saved, setSaved] = useState(isSaved)
  const [savesCount, setSavesCount] = useState(saves)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = () => {
    // Navigate to login page instead of saving
    router.push('/login')
  }

  const handleShare = async () => {
    // Check if we're on the client side and window is available
    if (typeof window === 'undefined') {
      toast({
        title: 'Cannot copy URL',
        description: 'Please copy the URL from your browser address bar.',
      })
      return
    }

    // Check if clipboard API is available
    if (!navigator.clipboard) {
      toast({
        title: 'Clipboard not available',
        description: 'Your browser does not support clipboard operations. Please copy the URL manually.',
      })
      return
    }

    try {
      const currentUrl = window.location.href
      await navigator.clipboard.writeText(currentUrl)
      
      // Verify the copy was successful by trying to read it back
      const copiedText = await navigator.clipboard.readText()
      if (copiedText === currentUrl) {
        // Show popup instead of toast
        setCopiedUrl(currentUrl)
        setShowSharePopup(true)
      } else {
        throw new Error('Copy verification failed')
      }
    } catch (error) {
      console.error('Failed to copy URL:', error)
      toast({
        title: 'Failed to copy',
        description: 'Could not copy the URL to clipboard. Please copy it manually.',
      })
    }
  }

  const handleComments = () => {
    // Navigate to login page instead of comments
    router.push('/login')
  }

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-rose-200/60 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100/50 p-1 shadow-[0_26px_70px_-32px_rgba(159,18,57,0.45)]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-rose-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />

      <Card className="relative overflow-hidden rounded-[1.6rem] border border-rose-200/70 bg-white/85 backdrop-blur-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-4">
                <Badge className="border-0 bg-rose-100 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-700">
                  {category}
                </Badge>
                <h1 className="max-w-5xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl">
                  {title}
                </h1>
                {author && (
                  <div className="flex items-center gap-3 rounded-full border border-rose-200/70 bg-rose-50 px-2.5 py-1.5 pr-4">
                    <Avatar className="h-8 w-8 ring-2 ring-white">
                      <AvatarImage src={author.avatar} alt={author.name} />
                      <AvatarFallback className="bg-rose-200 text-[11px] font-semibold text-rose-700">
                        {author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-rose-800/90">
                      {author.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="rounded-2xl border border-rose-100 bg-white/70 p-5 text-[1.02rem] leading-8 text-slate-700 shadow-sm [&>*]:inline [&>*]:m-0 [&>*]:p-0 [&_a]:font-semibold [&_a]:text-rose-600 [&_a]:underline [&_a]:underline-offset-4"
              dangerouslySetInnerHTML={{
                __html: (() => {
                  let html = description
                    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
                    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
                    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
                    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
                    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
                    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"')
                    .replace(/style\s*=\s*"[^"]*display\s*:\s*block[^"]*"/gi, '')
                    .replace(/<br\s*\/?>/gi, ' ')
                    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
                    .replace(/<p[^>]*>/gi, '<span>')
                    .replace(/<\/p>/gi, '</span>')
                    .replace(/<div[^>]*>/gi, '<span>')
                    .replace(/<\/div>/gi, '</span>')
                    .replace(/\n+/g, ' ')
                    .trim();
                  return html || "No description available.";
                })()
              }}
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full border-rose-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-700"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-rose-200/80 pt-5">
              <Button
                variant={saved ? 'default' : 'outline'}
                size="sm"
                onClick={handleSave}
                className={cn(
                  "rounded-full border-rose-300 bg-white px-4 font-semibold text-slate-800 hover:bg-rose-50",
                  saved && "border-rose-500 bg-rose-600 text-white hover:bg-rose-700"
                )}
              >
                <Bookmark className={cn('mr-2 h-4 w-4', saved && 'fill-current')} />
                {savesCount}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleComments}
                className="rounded-full border-rose-300 bg-white px-4 font-semibold text-slate-800 hover:bg-rose-50"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {commentsCount}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="rounded-full border-rose-300 bg-white px-4 font-semibold text-slate-800 hover:bg-rose-50"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Popup */}
      <SharePopup
        show={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        message="URL copied!"
        url={copiedUrl}
      />
    </div>
  )
}
