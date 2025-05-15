"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  initialQuery?: string;
}

export default function SearchBar({
  onSearch,
  className,
  initialQuery = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
    // For now, just logs to console if no onSearch prop is provided
    console.log('Search query:', query.trim()); 
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'relative w-full max-w-xl bg-background rounded-lg shadow-lg',
        className
      )}
    >
      <Input
        type="search"
        placeholder="Tìm kiếm địa điểm, quận, thành phố..."
        value={query}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-3 text-base h-12 rounded-md border-transparent focus:border-primary focus:ring-1 focus:ring-primary bg-transparent"
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      {/* Optionally, a search button if not submitting on enter 
      <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-10">Tìm</Button> 
      */}
    </form>
  );
}
