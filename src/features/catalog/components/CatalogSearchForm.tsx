"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  buildCatalogHref,
  type CatalogFilters,
} from "@/features/catalog/utils/catalog-url";
import { cn } from "@/lib/cn";

const DEBOUNCE_MS = 300;

type CatalogSearchFormProps = {
  category: CatalogFilters["category"];
  urlQuery: string;
  resultCount: number;
  isPending: boolean;
  onPendingChange: (pending: boolean) => void;
  onQueryChange?: (query: string) => void;
};

export function CatalogSearchForm({
  category,
  urlQuery,
  resultCount,
  isPending,
  onPendingChange,
  onQueryChange,
}: CatalogSearchFormProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const committedQueryRef = useRef(urlQuery);
  const [inputValue, setInputValue] = useState(urlQuery);

  const updateUrl = useCallback(
    (nextQuery: string) => {
      committedQueryRef.current = nextQuery;
      const href = buildCatalogHref({ category, q: nextQuery });
      startTransition(() => {
        router.replace(href);
      });
    },
    [category, router]
  );

  const setSearchQuery = useCallback(
    (nextQuery: string) => {
      setInputValue(nextQuery);
      onQueryChange?.(nextQuery);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      onPendingChange(true);
      debounceRef.current = setTimeout(() => {
        updateUrl(nextQuery);
        onPendingChange(false);
      }, DEBOUNCE_MS);
    },
    [onPendingChange, onQueryChange, updateUrl]
  );

  const submitSearch = useCallback(
    (nextQuery: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      onPendingChange(false);
      setInputValue(nextQuery);
      onQueryChange?.(nextQuery);
      updateUrl(nextQuery);
    },
    [onPendingChange, onQueryChange, updateUrl]
  );

  const clearSearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onPendingChange(false);
    setInputValue("");
    onQueryChange?.("");
    updateUrl("");
  }, [onPendingChange, onQueryChange, updateUrl]);

  useEffect(() => {
    if (urlQuery !== committedQueryRef.current) {
      committedQueryRef.current = urlQuery;
      setInputValue(urlQuery);
      onQueryChange?.(urlQuery);
    }
  }, [urlQuery, onQueryChange]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitSearch(inputValue);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row sm:items-end">
        <div className="relative flex-1">
          <Input
            label="Search products"
            type="search"
            name="q"
            value={inputValue}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name or description…"
            className="pr-10"
          />
          {inputValue ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-0"
              aria-label="Clear search"
              onClick={clearSearch}
            >
              ×
            </Button>
          ) : null}
        </div>
        <Button type="submit" variant="secondary" className="shrink-0">
          Search
        </Button>
      </div>
      <p
        className={cn(
          "text-sm text-muted-foreground",
          isPending && "opacity-70"
        )}
        aria-live="polite"
      >
        {resultCount} product
        {resultCount === 1 ? "" : "s"}
      </p>
    </form>
  );
}
