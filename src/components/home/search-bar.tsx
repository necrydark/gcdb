'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command"
import { Button } from "@/src/components/ui/button"
import { Search, User, Book, Diamond } from "lucide-react"
import { searchItems, type SearchResult } from '@/src/actions/search'
import { useDebounce } from '@/hooks/debounce'
import Image from 'next/image'

export default function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Fetch search results when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        try {
          const items = await searchItems(debouncedQuery)
          setResults(items)
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        }
      })
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  // This is the critical function - ensure it properly navigates
  const handleSelect = (href: string) => {
    setOpen(false) 
    setTimeout(() => {
      router.push(href)
    }, 5)
  }

  // Group results by type
  const characters = results.filter(item => item.type === 'character')
  const users = results.filter(item => item.type === 'user')

  return (
    <>
      <Button 
        variant="outline" 
        className="relative w-full justify-start text-sm  rounded-[5px] bg-purple-500 text-white dark:bg-purple-700 hover:bg-purple-600 dark:hover:bg-purple-800 sm:pr-12"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex text-white">Search characters, users...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-[10px] hidden h-5 select-none items-center gap-1 rounded-[5px] text-white bg-purple-600 dark:bg-purple-950 px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className='rounded-[5px] text-white bg-purple-500 dark:bg-purple-700' shouldFilter={false}>
          <CommandInput 
            placeholder="Search characters, users..." 
            value={query}
            className='ring-0 focus:ring-0 focus-visible:ring-0 placeholder:text-white rounded-[5px] border-0'
            onValueChange={setQuery}
            autoFocus
          />
          <CommandList>
            
            
            {!isPending && query.length > 0 && results.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            

            
            {/* Characters */}
            {characters.length > 0 && (
              <CommandGroup heading="Characters">
                {characters.map(item => (
                  <CommandItem 
                    key={item.id}
                    value={item.id}
                    disabled={false}
                 className="flex items-center gap-2 px-2 py-2  text-sm cursor-pointer rounded-sm hover:bg-purple-900 hover:text-white aria-selected:bg-purple-900 aria-selected:text-white transition-all duration-300"
                    onSelect={() => handleSelect(item.href)}
                  >
                    <Image
                    width={24}
                    height={24}
                    alt={item.name}
                    src={item.imageUrl as string}
                    />
                    {item.name}
                    <p className='ml-2 text-xs'>{item.tag}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {/* Users */}
            {users.length > 0 && (
              <CommandGroup className='text-white' heading="Users">
                {users.map(item => (
                  <CommandItem 
                    key={item.id}
                    value={item.id}
                    disabled={false}
             className="flex items-center gap-2 px-2 py-2 text-sm cursor-pointer rounded-sm hover:bg-purple-800 hover:text-white aria-selected:bg-purple-900 aria-selected:text-white transition-all duration-300"
                    onSelect={() => handleSelect(item.href)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}