import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. <Text>
    // h1: ({ children }) => <h1 className="text-xl font-bold">{children}</h1>,
    ...components,
  };
}